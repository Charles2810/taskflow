"""
Modelo de Usuario (Sesión 04 - Supabase PostgreSQL)
Gestiona la persistencia en Supabase con fallback inteligente a memoria.
"""

from datetime import datetime, timezone
import uuid
from app.config import get_supabase_client


class UserModel:
    _users = [
        {
            "id": 1,
            "uuid": "a0000000-0000-0000-0000-000000000001",
            "nombre": "Admin",
            "email": "admin@taskflow.com",
            "rol": "administrador",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": 2,
            "uuid": "b0000000-0000-0000-0000-000000000002",
            "nombre": "Juan Pérez",
            "email": "juan@email.com",
            "rol": "usuario",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    _next_id = 3

    @classmethod
    def get_all(cls):
        """Retorna todos los usuarios desde Supabase o memoria."""
        client = get_supabase_client()
        if client:
            try:
                res = client.table("users").select("*").order("created_at").execute()
                return res.data
            except Exception:
                pass
        return cls._users.copy()

    @classmethod
    def get_by_id(cls, user_id):
        """Busca un usuario por su ID (soporta enteros o UUIDs)."""
        client = get_supabase_client()
        if client:
            try:
                res = client.table("users").select("*").eq("id", str(user_id)).execute()
                if res.data:
                    return res.data[0]
                return None
            except Exception:
                pass
        return next((u for u in cls._users if str(u.get("id")) == str(user_id) or str(u.get("uuid")) == str(user_id)), None)

    @classmethod
    def get_by_email(cls, email):
        """Busca un usuario por su correo electrónico."""
        client = get_supabase_client()
        if client:
            try:
                res = client.table("users").select("*").eq("email", email.strip().lower()).execute()
                if res.data:
                    return res.data[0]
                return None
            except Exception:
                pass
        return next((u for u in cls._users if u["email"].lower() == email.strip().lower()), None)

    @classmethod
    def create(cls, data):
        """Crea un nuevo usuario en Supabase o memoria."""
        nombre = data["nombre"].strip()
        email = data.get("email", "").strip().lower()
        rol = data.get("rol", "usuario")
        now = datetime.now(timezone.utc).isoformat()

        client = get_supabase_client()
        if client:
            try:
                payload = {
                    "nombre": nombre,
                    "email": email,
                    "rol": rol
                }
                res = client.table("users").insert(payload).execute()
                if res.data:
                    return res.data[0]
            except Exception:
                pass

        # Memoria fallback
        nuevo = {
            "id": cls._next_id,
            "uuid": str(uuid.uuid4()),
            "nombre": nombre,
            "email": email,
            "rol": rol,
            "created_at": now
        }
        cls._users.append(nuevo)
        cls._next_id += 1
        return nuevo

    @classmethod
    def update(cls, user_id, data):
        """Actualiza los campos de un usuario existente."""
        client = get_supabase_client()
        if client:
            try:
                update_payload = {}
                if "nombre" in data:
                    update_payload["nombre"] = data["nombre"].strip()
                if "email" in data:
                    update_payload["email"] = data["email"].strip().lower()
                if "rol" in data:
                    update_payload["rol"] = data["rol"]

                res = client.table("users").update(update_payload).eq("id", str(user_id)).execute()
                if res.data:
                    return res.data[0]
                return None
            except Exception:
                pass

        user = cls.get_by_id(user_id)
        if not user:
            return None

        if "nombre" in data:
            user["nombre"] = data["nombre"].strip()
        if "email" in data:
            user["email"] = data["email"].strip().lower()
        if "rol" in data:
            user["rol"] = data["rol"]

        return user

    @classmethod
    def delete(cls, user_id):
        """Elimina un usuario por su ID."""
        client = get_supabase_client()
        if client:
            try:
                res = client.table("users").delete().eq("id", str(user_id)).execute()
                if res.data:
                    return True
                return False
            except Exception:
                pass

        user = cls.get_by_id(user_id)
        if not user:
            return False
        cls._users.remove(user)
        return True

    @classmethod
    def reset(cls):
        """Restablece los datos a su estado inicial para pruebas."""
        now = datetime.now(timezone.utc).isoformat()
        cls._users = [
            {
                "id": 1,
                "uuid": "a0000000-0000-0000-0000-000000000001",
                "nombre": "Admin",
                "email": "admin@taskflow.com",
                "rol": "administrador",
                "created_at": now
            },
            {
                "id": 2,
                "uuid": "b0000000-0000-0000-0000-000000000002",
                "nombre": "Juan Pérez",
                "email": "juan@email.com",
                "rol": "usuario",
                "created_at": now
            }
        ]
        cls._next_id = 3
