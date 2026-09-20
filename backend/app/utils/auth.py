"""
Módulo de Autenticación y Autorización (Sesión 05)
Implementa generación de JWT, middleware @token_required y control de roles @admin_required.
Soporta tanto JWTs de aplicación como verificación con Supabase Auth.
"""

from functools import wraps
import os
from datetime import datetime, timedelta, timezone
from flask import request, jsonify, g
import jwt
from app.config import get_supabase_client

JWT_SECRET = os.getenv("JWT_SECRET") or os.getenv("SUPABASE_SECRET_KEY") or "taskflow-jwt-super-secret-key-2026"
JWT_ALGORITHM = "HS256"


def generate_token(user_data: dict, expires_in_hours: int = 24) -> str:
    """Genera un token JWT firmado con los datos esenciales del usuario y expiración."""
    now = datetime.now(timezone.utc)
    payload = {
        "id": str(user_data["id"]),
        "email": user_data.get("email", "").lower(),
        "nombre": user_data.get("nombre", ""),
        "rol": user_data.get("rol", "usuario"),
        "iat": now,
        "exp": now + timedelta(hours=expires_in_hours)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token: str) -> dict | None:
    """Decodifica y valida un token JWT local o mediante Supabase Auth."""
    # 1. Intentar decodificación con PyJWT local
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.PyJWTError:
        pass

    # 2. Intentar validación remota con Supabase Auth (según diapositiva 4)
    client = get_supabase_client()
    if client:
        try:
            user_response = client.auth.get_user(token)
            if user_response and user_response.user:
                u = user_response.user
                return {
                    "id": u.id,
                    "email": u.email,
                    "nombre": (u.user_metadata or {}).get("nombre", u.email),
                    "rol": (u.user_metadata or {}).get("rol", "usuario")
                }
        except Exception:
            pass

    return None


def token_required(f):
    """
    Middleware/Decorador para proteger rutas requiriendo un Bearer Token válido.
    Inyecta el usuario autenticado en `g.current_user`.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error": "Token requerido"}), 401

        parts = auth_header.split(" ")
        if len(parts) != 2 or parts[0].lower() != "bearer":
            return jsonify({"error": "Formato de token inválido. Use 'Bearer <token>'"}), 401

        token = parts[1]
        user = decode_token(token)
        if not user:
            return jsonify({"error": "Token inválido o expirado"}), 401

        g.current_user = user
        return f(*args, **kwargs)

    return decorated


def admin_required(f):
    """
    Middleware/Decorador para restringir acceso exclusivo a Administradores.
    Debe utilizarse en conjunto con @token_required.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        if not hasattr(g, "current_user") or not g.current_user:
            return jsonify({"error": "No autenticado"}), 401

        rol = g.current_user.get("rol", "usuario")
        if rol != "administrador":
            return jsonify({
                "error": "Acceso denegado: se requieren permisos de administrador"
            }), 403

        return f(*args, **kwargs)

    return decorated
