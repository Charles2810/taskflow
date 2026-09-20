"""
Modelo de Usuario (Sesión 03 - Arquitectura MVC)
Gestiona la persistencia en memoria y consultas sobre usuarios.
"""

from datetime import datetime, timezone


class UserModel:
    _users = [
        {
            "id": 1,
            "nombre": "Admin",
            "email": "admin@taskflow.com",
            "rol": "administrador",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": 2,
            "nombre": "Juan Pérez",
            "email": "juan@email.com",
            "rol": "usuario",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    _next_id = 3

    @classmethod
    def get_all(cls):
        """Retorna todos los usuarios."""
        return cls._users.copy()

    @classmethod
    def get_by_id(cls, user_id):
        """Busca un usuario por su ID numérico."""
        return next((u for u in cls._users if u["id"] == user_id), None)

    @classmethod
    def get_by_email(cls, email):
        """Busca un usuario por su correo electrónico."""
        return next((u for u in cls._users if u["email"].lower() == email.lower()), None)

    @classmethod
    def create(cls, data):
        """Crea un nuevo usuario asignándole un ID autoincremental."""
        nuevo = {
            "id": cls._next_id,
            "nombre": data["nombre"].strip(),
            "email": data.get("email", "").strip(),
            "rol": data.get("rol", "usuario"),
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        cls._users.append(nuevo)
        cls._next_id += 1
        return nuevo

    @classmethod
    def update(cls, user_id, data):
        """Actualiza los campos de un usuario existente."""
        user = cls.get_by_id(user_id)
        if not user:
            return None

        if "nombre" in data:
            user["nombre"] = data["nombre"].strip()
        if "email" in data:
            user["email"] = data["email"].strip()
        if "rol" in data:
            user["rol"] = data["rol"]

        return user

    @classmethod
    def delete(cls, user_id):
        """Elimina un usuario por su ID."""
        user = cls.get_by_id(user_id)
        if not user:
            return False
        cls._users.remove(user)
        return True

    @classmethod
    def reset(cls):
        """Restablece los datos a su estado inicial (útil para pruebas)."""
        cls._users = [
            {
                "id": 1,
                "nombre": "Admin",
                "email": "admin@taskflow.com",
                "rol": "administrador",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": 2,
                "nombre": "Juan Pérez",
                "email": "juan@email.com",
                "rol": "usuario",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        cls._next_id = 3
