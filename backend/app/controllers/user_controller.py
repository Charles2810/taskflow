"""
Controlador de Usuarios (Sesión 03 - Arquitectura MVC)
Gestiona la lógica de negocio, validaciones y respuestas HTTP para Usuarios.
"""

from flask import jsonify, request
from app.models.user_model import UserModel
from app.models.task_model import TaskModel


class UserController:
    @staticmethod
    def list_users():
        users = UserModel.get_all()
        return jsonify(users), 200

    @staticmethod
    def get_user(user_id):
        user = UserModel.get_by_id(user_id)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        return jsonify(user), 200

    @staticmethod
    def create_user():
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"error": "Cuerpo de petición JSON requerido"}), 400

        nombre = data.get("nombre")
        if not nombre or not str(nombre).strip():
            return jsonify({"error": "El campo 'nombre' es obligatorio"}), 400

        email = data.get("email", "").strip()
        if email:
            existente = UserModel.get_by_email(email)
            if existente:
                return jsonify({"error": f"Ya existe un usuario con el correo '{email}'"}), 400

        rol = data.get("rol", "usuario")
        if rol not in ["usuario", "administrador"]:
            return jsonify({"error": "El rol debe ser 'usuario' o 'administrador'"}), 400

        nuevo = UserModel.create({
            "nombre": nombre,
            "email": email,
            "rol": rol
        })
        return jsonify(nuevo), 201

    @staticmethod
    def update_user(user_id):
        user = UserModel.get_by_id(user_id)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        data = request.get_json(silent=True)
        if not data:
            return jsonify({"error": "Cuerpo de petición JSON inválido"}), 400

        update_data = {}
        if "nombre" in data:
            if not str(data["nombre"]).strip():
                return jsonify({"error": "El campo 'nombre' no puede estar vacío"}), 400
            update_data["nombre"] = data["nombre"]

        if "email" in data:
            email = str(data["email"]).strip()
            existente = UserModel.get_by_email(email)
            if existente and existente["id"] != user_id:
                return jsonify({"error": f"El correo '{email}' ya está en uso por otro usuario"}), 400
            update_data["email"] = email

        if "rol" in data:
            if data["rol"] not in ["usuario", "administrador"]:
                return jsonify({"error": "El rol debe ser 'usuario' o 'administrador'"}), 400
            update_data["rol"] = data["rol"]

        updated = UserModel.update(user_id, update_data)
        return jsonify(updated), 200

    @staticmethod
    def delete_user(user_id):
        user = UserModel.get_by_id(user_id)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        # Eliminar tareas asociadas al usuario (cascada lógica en memoria)
        tareas_usuario = TaskModel.get_by_user(user_id)
        for t in tareas_usuario:
            TaskModel.delete(t["id"])

        UserModel.delete(user_id)
        return jsonify({
            "status": "ok",
            "message": f"Usuario con ID {user_id} y sus tareas asociadas fueron eliminados exitosamente"
        }), 200

    @staticmethod
    def get_user_tasks(user_id):
        """Retorna las tareas asociadas a un usuario en específico."""
        user = UserModel.get_by_id(user_id)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        tasks = TaskModel.get_by_user(user_id)
        return jsonify({
            "user": {
                "id": user["id"],
                "nombre": user["nombre"]
            },
            "tasks": tasks,
            "total": len(tasks)
        }), 200
