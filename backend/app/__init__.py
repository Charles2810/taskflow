"""
TaskFlow Backend - Aplicación Flask (Sesión 05 - Autenticación y Autorización)
Estructura modular MVC con Blueprints para Usuarios, Tareas y Autenticación.
"""

from flask import Flask, jsonify
from flask_cors import CORS
from app.routes.user_routes import users_bp
from app.routes.task_routes import tasks_bp
from app.routes.auth_routes import auth_bp


def create_app():
    app = Flask(__name__)
    CORS(app)  # Permite conexiones desde el cliente web / frontend

    # Registrar Blueprints de los módulos bajo el prefijo /api
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(users_bp, url_prefix="/api")
    app.register_blueprint(tasks_bp, url_prefix="/api")

    @app.route("/", methods=["GET"])
    def index():
        """Ruta raíz informativa con el mapa de endpoints."""
        return jsonify({
            "service": "TaskFlow API",
            "version": "1.2.0",
            "architecture": "MVC con Autenticación JWT / Supabase",
            "status": "online",
            "endpoints": [
                "GET /api/health",
                "POST /api/auth/register",
                "POST /api/auth/login",
                "GET /api/auth/me",
                "GET /api/users",
                "POST /api/users",
                "GET /api/users/<id>",
                "PUT /api/users/<id>",
                "DELETE /api/users/<id>",
                "GET /api/users/<id>/tasks",
                "GET /api/tasks",
                "POST /api/tasks",
                "GET /api/tasks/<id>",
                "PUT /api/tasks/<id>",
                "DELETE /api/tasks/<id>"
            ]
        }), 200

    @app.route("/api/health", methods=["GET"])
    def health_check():
        """Verificación de estado del servicio."""
        return jsonify({
            "status": "ok",
            "service": "taskflow-backend",
            "architecture": "MVC",
            "auth": "JWT enabled",
            "version": "1.2.0"
        }), 200

    return app
