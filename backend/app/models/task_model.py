"""
Modelo de Tarea (Sesión 03 - Arquitectura MVC)
Gestiona la persistencia en memoria, relaciones con usuarios y transiciones de estado.
"""

from datetime import datetime, timezone


class TaskModel:
    ESTADOS_VALIDOS = ["pendiente", "en_progreso", "completada"]
    PRIORIDADES_VALIDAS = ["baja", "media", "alta"]

    # Transiciones válidas de estado:
    # pendiente -> en_progreso, completada
    # en_progreso -> pendiente, completada
    # completada -> pendiente, en_progreso (reabrir)
    TRANSICIONES_PERMITIDAS = {
        "pendiente": ["en_progreso", "completada"],
        "en_progreso": ["pendiente", "completada"],
        "completada": ["pendiente", "en_progreso"]
    }

    _tasks = [
        {
            "id": 1,
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
        """Retorna todas las tareas con filtros opcionales."""
        res = cls._tasks.copy()
        if user_id is not None:
            res = [t for t in res if t["user_id"] == user_id]
        if estado is not None:
            res = [t for t in res if t["estado"] == estado]
        return res

    @classmethod
    def get_by_id(cls, task_id):
        """Busca una tarea por su ID."""
        return next((t for t in cls._tasks if t["id"] == task_id), None)

    @classmethod
    def get_by_user(cls, user_id):
        """Retorna todas las tareas pertenecientes a un usuario."""
        return [t for t in cls._tasks if t["user_id"] == user_id]

    @classmethod
    def create(cls, data):
        """Crea una nueva tarea vinculada a un usuario."""
        now = datetime.now(timezone.utc).isoformat()
        nueva = {
            "id": cls._next_id,
            "user_id": data["user_id"],
            "titulo": data["titulo"].strip(),
            "descripcion": data.get("descripcion", "").strip(),
            "estado": data.get("estado", "pendiente"),
            "prioridad": data.get("prioridad", "media"),
            "created_at": now,
            "updated_at": now
        }
        cls._tasks.append(nueva)
        cls._next_id += 1
        return nueva

    @classmethod
    def update(cls, task_id, data):
        """Actualiza campos de una tarea existente."""
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
