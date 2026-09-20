"""
Módulo principal de la aplicación Flask TaskFlow
"""

from flask import Flask, jsonify
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route("/", methods=["GET"])
    def index():
        return jsonify({
            "message": "Bienvenido a la API de TaskFlow",
            "version": "1.0.0",
            "status": "online"
        })

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "ok",
            "service": "taskflow-backend",
            "version": "1.0.0"
        })

    return app
