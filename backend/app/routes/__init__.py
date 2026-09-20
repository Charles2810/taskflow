"""
Capa de Rutas (Blueprints de Flask) - TaskFlow
"""
from .user_routes import users_bp
from .task_routes import tasks_bp
from .auth_routes import auth_bp

__all__ = ["users_bp", "tasks_bp", "auth_bp"]
