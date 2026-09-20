"""
Controlador de Tareas (Sesión 04 - Supabase PostgreSQL)
Gestiona la lógica de negocio, validación de relaciones y transiciones de estado para Tareas.
"""

from flask import jsonify, request
from app.models.task_model import TaskModel
from app.models.user_model import UserModel


class TaskController:
    @staticmethod
    def list_tasks():
        """Lista tareas permitiendo filtrar por user_id y por estado."""
        user_id_param = request.args.get("user_id", type=str)
        estado_param = request.args.get("estado", type=str)

        tasks = TaskModel.get_all(user_id=user_id_param, estado=estado_param)
        return jsonify(tasks), 200

    @staticmethod
    def get_task(task_id):
        """Obtiene el detalle de una tarea por su ID."""
        task = TaskModel.get_by_id(task_id)
        if not task:
            return jsonify({"error": "Tarea no encontrada"}), 404

        user = UserModel.get_by_id(task["user_id"])
        respuesta = task.copy()
        respuesta["usuario"] = {
            "id": user["id"],
            "nombre": user["nombre"],
            "email": user["email"]
        } if user else None

        return jsonify(respuesta), 200

    @staticmethod
    def create_task():
        """Crea una nueva tarea validando existencia del usuario y campos."""
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"error": "Cuerpo de petición JSON requerido"}), 400

        titulo = data.get("titulo")
        if not titulo or not str(titulo).strip():
            return jsonify({"error": "El campo 'titulo' es obligatorio"}), 400

        user_id = data.get("user_id")
        if user_id is None:
            return jsonify({"error": "El campo 'user_id' es obligatorio para asignar la tarea"}), 400

        usuario = UserModel.get_by_id(user_id)
        if not usuario:
            return jsonify({"error": f"No existe un usuario con el ID {user_id}"}), 404

        estado = data.get("estado", "pendiente")
        if estado not in TaskModel.ESTADOS_VALIDOS:
            return jsonify({
                "error": f"Estado '{estado}' no válido. Opciones permitidas: {TaskModel.ESTADOS_VALIDOS}"
            }), 400

        prioridad = data.get("prioridad", "media")
        if prioridad not in TaskModel.PRIORIDADES_VALIDAS:
            return jsonify({
                "error": f"Prioridad '{prioridad}' no válida. Opciones permitidas: {TaskModel.PRIORIDADES_VALIDAS}"
            }), 400

        nueva_tarea = TaskModel.create({
            "user_id": str(user_id),
            "titulo": titulo,
            "descripcion": data.get("descripcion", ""),
            "estado": estado,
            "prioridad": prioridad
        })

        return jsonify(nueva_tarea), 201

    @staticmethod
    def update_task(task_id):
        """Actualiza una tarea y valida transiciones de estado permitidas."""
        tarea = TaskModel.get_by_id(task_id)
        if not tarea:
            return jsonify({"error": "Tarea no encontrada"}), 404

        data = request.get_json(silent=True)
        if not data:
            return jsonify({"error": "Cuerpo de petición JSON inválido"}), 400

        update_data = {}

        if "titulo" in data:
            if not str(data["titulo"]).strip():
                return jsonify({"error": "El campo 'titulo' no puede estar vacío"}), 400
            update_data["titulo"] = data["titulo"]

        if "descripcion" in data:
            update_data["descripcion"] = data["descripcion"]

        if "prioridad" in data:
            if data["prioridad"] not in TaskModel.PRIORIDADES_VALIDAS:
                return jsonify({
                    "error": f"Prioridad inválida. Debe ser una de: {TaskModel.PRIORIDADES_VALIDAS}"
                }), 400
            update_data["prioridad"] = data["prioridad"]

        if "user_id" in data:
            nuevo_user = UserModel.get_by_id(data["user_id"])
            if not nuevo_user:
                return jsonify({"error": f"El usuario asignado con ID {data['user_id']} no existe"}), 404
            update_data["user_id"] = str(data["user_id"])

        if "estado" in data:
            nuevo_estado = data["estado"]
            estado_actual = tarea["estado"]

            if nuevo_estado not in TaskModel.ESTADOS_VALIDOS:
                return jsonify({
                    "error": f"Estado '{nuevo_estado}' no válido. Opciones: {TaskModel.ESTADOS_VALIDOS}"
                }), 400

            if nuevo_estado != estado_actual:
                transiciones_validas = TaskModel.TRANSICIONES_PERMITIDAS.get(estado_actual, [])
                if nuevo_estado not in transiciones_validas:
                    return jsonify({
                        "error": f"Transición de estado no permitida de '{estado_actual}' a '{nuevo_estado}'. Transiciones válidas: {transiciones_validas}"
                    }), 400

            update_data["estado"] = nuevo_estado

        actualizada = TaskModel.update(task_id, update_data)
        return jsonify(actualizada), 200

    @staticmethod
    def delete_task(task_id):
        """Elimina una tarea por su ID."""
        tarea = TaskModel.get_by_id(task_id)
        if not tarea:
            return jsonify({"error": "Tarea no encontrada"}), 404

        TaskModel.delete(task_id)
        return jsonify({
            "status": "ok",
            "message": f"Tarea con ID {task_id} eliminada exitosamente"
        }), 200
