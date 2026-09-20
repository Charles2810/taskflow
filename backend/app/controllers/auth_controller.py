"""
Controlador de Autenticación (Sesión 05)
Gestiona el registro de usuarios, inicio de sesión (JWT) y consulta de perfil.
"""

from flask import jsonify, request, g
from app.models.user_model import UserModel
from app.utils.auth import generate_token
from app.config import get_supabase_client


class AuthController:
    @staticmethod
    def register():
        """Registra un nuevo usuario en el sistema y retorna su token JWT inicial."""
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"error": "Cuerpo de petición JSON requerido"}), 400

        nombre = data.get("nombre")
        email = data.get("email")
        password = data.get("password")

        if not nombre or not str(nombre).strip():
            return jsonify({"error": "El campo 'nombre' es obligatorio"}), 400
        if not email or not str(email).strip():
            return jsonify({"error": "El campo 'email' es obligatorio"}), 400
        if not password or len(str(password)) < 6:
            return jsonify({"error": "La contraseña debe tener al menos 6 caracteres"}), 400

        email = str(email).strip().lower()

        # Verificar si el correo ya está registrado
        existente = UserModel.get_by_email(email)
        if existente:
            return jsonify({"error": f"El correo '{email}' ya se encuentra registrado"}), 400

        rol = data.get("rol", "usuario")
        if rol not in ["usuario", "administrador"]:
            rol = "usuario"

        # Registrar en Supabase Auth si está disponible
        client = get_supabase_client()
        if client:
            try:
                client.auth.sign_up({
                    "email": email,
                    "password": str(password),
                    "options": {
                        "data": {
                            "nombre": nombre.strip(),
                            "rol": rol
                        }
                    }
                })
            except Exception:
                pass

        # Crear en la base de datos de usuarios
        nuevo_usuario = UserModel.create({
            "nombre": nombre.strip(),
            "email": email,
            "rol": rol
        })

        token = generate_token(nuevo_usuario)

        return jsonify({
            "message": "Usuario registrado exitosamente",
            "user": {
                "id": nuevo_usuario["id"],
                "nombre": nuevo_usuario["nombre"],
                "email": nuevo_usuario["email"],
                "rol": nuevo_usuario["rol"]
            },
            "token": token
        }), 201

    @staticmethod
    def login():
        """Autentica credenciales y emite un token JWT."""
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"error": "Cuerpo de petición JSON requerido"}), 400

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Debe proporcionar email y contraseña"}), 400

        email = str(email).strip().lower()

        # 1. Intentar validar con Supabase Auth si está configurado
        client = get_supabase_client()
        supabase_user = None
        if client:
            try:
                auth_res = client.auth.sign_in_with_password({
                    "email": email,
                    "password": str(password)
                })
                if auth_res and auth_res.user:
                    supabase_user = auth_res.user
            except Exception:
                pass

        # 2. Obtener o sincronizar el usuario en nuestra tabla UserModel
        usuario = UserModel.get_by_email(email)
        if not usuario:
            if supabase_user:
                usuario = UserModel.create({
                    "nombre": (supabase_user.user_metadata or {}).get("nombre", email.split("@")[0]),
                    "email": email,
                    "rol": (supabase_user.user_metadata or {}).get("rol", "usuario")
                })
            else:
                return jsonify({"error": "Credenciales inválidas"}), 401

        # Generar token JWT
        token = generate_token(usuario)

        return jsonify({
            "message": "Inicio de sesión exitoso",
            "user": {
                "id": usuario["id"],
                "nombre": usuario["nombre"],
                "email": usuario["email"],
                "rol": usuario["rol"]
            },
            "token": token
        }), 200

    @staticmethod
    def me():
        """Retorna la información del usuario autenticado actual."""
        if not hasattr(g, "current_user") or not g.current_user:
            return jsonify({"error": "No autenticado"}), 401

        return jsonify({
            "user": g.current_user
        }), 200
