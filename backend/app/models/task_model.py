"""
Modelo de Tarea (Sesión 04 - Supabase PostgreSQL)
Gestiona la persistencia en Supabase con relaciones y control de transiciones de estado.
"""

from datetime import datetime, timezone
import uuid
from app.config import get_supabase_client


class TaskModel:
    ESTADOS_VALIDOS = ["pendiente", "en_progreso", "completada"]
    PRIORIDADES_VALIDAS = ["baja", "media", "alta"]

    TRANSICIONES_PERMITIDAS = {
        "pendiente": ["en_progreso", "completada"],
        "en_progreso": ["pendiente", "completada"],
        "completada": ["pendiente", "en_progreso"]
    }

    _tasks = [
        {
            "id": 1,
            "uuid": "c0000000-0000-0000-0000-000000000001",
            "user_id": 1,
            "titulo": "Configurar entorno y Git",
            "descripcion": "Instalar herramientas e inicializar repositorio TaskFlow",
            "estado": "completada",
            "prioridad": "alta",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": 2,
            "uuid": "c0000000-0000-0000-0000-000000000002",
            "user_id": 1,
            "titulo": "Implementar arquitectura MVC",
            "descripcion": "Separar backend en modelos, controladores y rutas con Blueprints",
            "estado": "en_progreso",
            "prioridad": "alta",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": 3,
            "uuid": "c0000000-0000-0000-0000-000000000003",
            "user_id": 2,
            "titulo": "Diseñar esquema en Supabase",
            "descripcion": "Preparar tablas SQL para usuarios y tareas en PostgreSQL",
            "estado": "pendiente",
            "prioridad": "media",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    _next_id = 4

    @classmethod
    def get_all(cls, user_id=None, estado=None):
        """Retorna tareas filtradas desde Supabase o memoria."""
        client = get_supabase_client()
        if client:
            try:
                q = client.table("tasks").select("*")
                if user_id is not None:
                    q = q.eq("user_id", str(user_id))
                if estado is not None:
                    q = q.eq("estado", estado)
                res = q.order("created_at").execute()
                return res.data
            except Exception:
                pass

        res = cls._tasks.copy()
        if user_id is not None:
            res = [t for t in res if str(t["user_id"]) == str(user_id)]
        if estado is not None:
            res = [t for t in res if t["estado"] == estado]
        return res

    @classmethod
    def get_by_id(cls, task_id):
        """Busca una tarea por su ID."""
        client = get_supabase_client()
        if client:
            try:
                res = client.table("tasks").select("*").eq("id", str(task_id)).execute()
                if res.data:
                    return res.data[0]
                return None
            except Exception:
                pass

        return next((t for t in cls._tasks if str(t.get("id")) == str(task_id) or str(t.get("uuid")) == str(task_id)), None)

    @classmethod
    def get_by_user(cls, user_id):
        """Retorna todas las tareas pertenecientes a un usuario."""
        return cls.get_all(user_id=user_id)

    @classmethod
    def create(cls, data):
        """Crea una nueva tarea en Supabase o memoria."""
        now = datetime.now(timezone.utc).isoformat()
        payload = {
            "user_id": data["user_id"],
            "titulo": data["titulo"].strip(),
            "descripcion": data.get("descripcion", "").strip(),
            "estado": data.get("estado", "pendiente"),
            "prioridad": data.get("prioridad", "media"),
            "created_at": now,
            "updated_at": now
        }

        client = get_supabase_client()
        if client:
            try:
                res = client.table("tasks").insert(payload).execute()
                if res.data:
                    return res.data[0]
            except Exception:
                pass

        nueva = payload.copy()
        nueva["id"] = cls._next_id
        nueva["uuid"] = str(uuid.uuid4())
        cls._tasks.append(nueva)
        cls._next_id += 1
        return nueva

    @classmethod
    def update(cls, task_id, data):
        """Actualiza campos de una tarea existente."""
        client = get_supabase_client()
        if client:
            try:
                update_payload = {}
                if "titulo" in data:
                    update_payload["titulo"] = data["titulo"].strip()
                if "descripcion" in data:
                    update_payload["descripcion"] = data["descripcion"].strip()
                if "estado" in data:
                    update_payload["estado"] = data["estado"]
                if "prioridad" in data:
                    update_payload["prioridad"] = data["prioridad"]
                if "user_id" in data:
                    update_payload["user_id"] = str(data["user_id"])
                update_payload["updated_at"] = datetime.now(timezone.utc).isoformat()

                res = client.table("tasks").update(update_payload).eq("id", str(task_id)).execute()
                if res.data:
                    return res.data[0]
                return None
            except Exception:
                pass

        tarea = cls.get_by_id(task_id)
        if not tarea:
            return None

        if "titulo" in data:
            tarea["titulo"] = data["titulo"].strip()
        if "descripcion" in data:
            tarea["descripcion"] = data["descripcion"].strip()
        if "estado" in data:
            tarea["estado"] = data["estado"]
        if "prioridad" in data:
            tarea["prioridad"] = data["prioridad"]
        if "user_id" in data:
            tarea["user_id"] = data["user_id"]

        tarea["updated_at"] = datetime.now(timezone.utc).isoformat()
        return tarea

    @classmethod
    def delete(cls, task_id):
        """Elimina una tarea por su ID."""
        client = get_supabase_client()
        if client:
            try:
                res = client.table("tasks").delete().eq("id", str(task_id)).execute()
                if res.data:
                    return True
                return False
            except Exception:
                pass

        tarea = cls.get_by_id(task_id)
        if not tarea:
            return False
        cls._tasks.remove(tarea)
        return True

    @classmethod
    def reset(cls):
        """Restablece tareas al estado inicial."""
        now = datetime.now(timezone.utc).isoformat()
        cls._tasks = [
            {
                "id": 1,
                "uuid": "c0000000-0000-0000-0000-000000000001",
                "user_id": 1,
                "titulo": "Configurar entorno y Git",
                "descripcion": "Instalar herramientas e inicializar repositorio TaskFlow",
                "estado": "completada",
                "prioridad": "alta",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": 2,
                "uuid": "c0000000-0000-0000-0000-000000000002",
                "user_id": 1,
                "titulo": "Implementar arquitectura MVC",
                "descripcion": "Separar backend en modelos, controladores y rutas con Blueprints",
                "estado": "en_progreso",
                "prioridad": "alta",
                "created_at": now,
                "updated_at": now
            },
            {
                "id": 3,
                "uuid": "c0000000-0000-0000-0000-000000000003",
                "user_id": 2,
                "titulo": "Diseñar esquema en Supabase",
                "descripcion": "Preparar tablas SQL para usuarios y tareas en PostgreSQL",
                "estado": "pendiente",
                "prioridad": "media",
                "created_at": now,
                "updated_at": now
            }
        ]
        cls._next_id = 4
