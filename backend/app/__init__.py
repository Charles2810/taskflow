"""
TaskFlow Backend - Aplicación Flask (Sesión 03 - Arquitectura MVC)
Estructura modular con separación de Modelos, Controladores y Rutas (Blueprints).
"""

from flask import Flask, jsonify
from flask_cors import CORS
from app.routes.user_routes import users_bp
from app.routes.task_routes import tasks_bp


def create_app():
    app = Flask(__name__)
    CORS(app)  # Permite conexiones desde el cliente web / frontend

    # Registrar Blueprints de los módulos bajo el prefijo /api
    app.register_blueprint(users_bp, url_prefix="/api")
    app.register_blueprint(tasks_bp, url_prefix="/api")

    @app.route("/", methods=["GET"])
    def index():
        """Ruta raíz informativa con el mapa de endpoints."""
        return jsonify({
            "service": "TaskFlow API",
            "version": "1.1.0",
            "architecture": "MVC (Model-View-Controller)",
            "status": "online",
            "endpoints": [
                "GET /api/health",
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
            "version": "1.1.0"
        }), 200

    return app
