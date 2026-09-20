"""
Rutas del recurso Usuarios (Flask Blueprint)
Soporta IDs numéricos y UUIDs de Supabase
"""

from flask import Blueprint
from app.controllers.user_controller import UserController

users_bp = Blueprint("users", __name__)


@users_bp.route("/users", methods=["GET"])
def list_users():
    return UserController.list_users()


@users_bp.route("/users/<user_id>", methods=["GET"])
def get_user(user_id):
    return UserController.get_user(user_id)


@users_bp.route("/users", methods=["POST"])
def create_user():
    return UserController.create_user()


@users_bp.route("/users/<user_id>", methods=["PUT"])
def update_user(user_id):
    return UserController.update_user(user_id)


@users_bp.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    return UserController.delete_user(user_id)


@users_bp.route("/users/<user_id>/tasks", methods=["GET"])
def get_user_tasks(user_id):
    return UserController.get_user_tasks(user_id)
