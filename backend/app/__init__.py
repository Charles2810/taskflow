"""
TaskFlow Backend - Aplicación Flask (Sesión 02)
API REST completa de usuarios con métodos GET, POST, PUT y DELETE.
"""

from flask import Flask, jsonify, request
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)  # Permite conexiones desde el cliente web / frontend

    # Estado en memoria (temporal para Sesión 02)
    users = [
        {"id": 1, "nombre": "Admin", "email": "admin@taskflow.com", "rol": "administrador"},
        {"id": 2, "nombre": "Juan Pérez", "email": "juan@email.com", "rol": "usuario"}
    ]
    # Usamos un contenedor mutable para mantener el contador de IDs
    state = {"next_id": 3}

    @app.route("/", methods=["GET"])
    def index():
        """Ruta principal con información de la API."""
        return jsonify({
            "service": "TaskFlow API",
            "version": "1.0.0",
            "status": "online",
            "endpoints": [
                "GET /api/health",
                "GET /api/users",
                "GET /api/users/<id>",
                "POST /api/users",
                "PUT /api/users/<id>",
                "DELETE /api/users/<id>"
            ]
        }), 200

    @app.route("/api/health", methods=["GET"])
    def health_check():
        """Verificación de estado del servicio."""
        return jsonify({
            "status": "ok",
            "message": "TaskFlow API v1.0"
        }), 200

    @app.route("/api/users", methods=["GET"])
    def listar_usuarios():
        """Listar todos los usuarios registrados."""
        return jsonify(users), 200

    @app.route("/api/users/<int:user_id>", methods=["GET"])
    def obtener_usuario(user_id):
        """Obtener un usuario específico por su ID."""
        user = next((u for u in users if u["id"] == user_id), None)
        if user:
            return jsonify(user), 200
        return jsonify({"error": "Usuario no encontrado"}), 404

    @app.route("/api/users", methods=["POST"])
    def crear_usuario():
        """Crear un nuevo usuario con validación."""
        data = request.get_json(silent=True)
        if not data or not data.get("nombre"):
            return jsonify({"error": "El campo 'nombre' es requerido"}), 400

        nuevo = {
            "id": state["next_id"],
            "nombre": data["nombre"].strip(),
            "email": data.get("email", "").strip(),
            "rol": data.get("rol", "usuario")
        }
        users.append(nuevo)
        state["next_id"] += 1
        return jsonify(nuevo), 201

    @app.route("/api/users/<int:user_id>", methods=["PUT"])
    def actualizar_usuario(user_id):
        """Actualizar los datos de un usuario existente."""
        user = next((u for u in users if u["id"] == user_id), None)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        data = request.get_json(silent=True)
        if not data:
            return jsonify({"error": "Cuerpo de petición JSON inválido"}), 400

        if "nombre" in data:
            if not data["nombre"].strip():
                return jsonify({"error": "El campo 'nombre' no puede estar vacío"}), 400
            user["nombre"] = data["nombre"].strip()

        if "email" in data:
            user["email"] = data["email"].strip()

        if "rol" in data:
            user["rol"] = data["rol"]

        return jsonify(user), 200

    @app.route("/api/users/<int:user_id>", methods=["DELETE"])
    def eliminar_usuario(user_id):
        """Eliminar un usuario del sistema."""
        user = next((u for u in users if u["id"] == user_id), None)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        users.remove(user)
        return jsonify({
            "status": "ok",
            "message": f"Usuario con ID {user_id} eliminado exitosamente"
        }), 200

    return app
