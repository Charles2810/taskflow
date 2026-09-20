"""
Rutas del recurso Autenticación (Flask Blueprint)
"""

from flask import Blueprint
from app.controllers.auth_controller import AuthController
from app.utils.auth import token_required

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/auth/register", methods=["POST"])
def register():
    return AuthController.register()


@auth_bp.route("/auth/login", methods=["POST"])
def login():
    return AuthController.login()


@auth_bp.route("/auth/me", methods=["GET"])
@token_required
def me():
    return AuthController.me()
