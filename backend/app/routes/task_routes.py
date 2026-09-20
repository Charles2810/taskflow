"""
Rutas del recurso Tareas (Flask Blueprint)
Soporta IDs numéricos y UUIDs de Supabase
"""

from flask import Blueprint
from app.controllers.task_controller import TaskController

tasks_bp = Blueprint("tasks", __name__)


@tasks_bp.route("/tasks", methods=["GET"])
def list_tasks():
    return TaskController.list_tasks()


@tasks_bp.route("/tasks/<task_id>", methods=["GET"])
def get_task(task_id):
    return TaskController.get_task(task_id)


@tasks_bp.route("/tasks", methods=["POST"])
def create_task():
    return TaskController.create_task()


@tasks_bp.route("/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):
    return TaskController.update_task(task_id)


@tasks_bp.route("/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    return TaskController.delete_task(task_id)
