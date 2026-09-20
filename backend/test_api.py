"""
Suite de Pruebas Automatizadas - TaskFlow API (Sesión 03 - Arquitectura MVC)
Valida:
- Endpoints de salud y catálogo
- CRUD de Usuarios y validaciones
- CRUD de Tareas y relación con Usuarios
- Validaciones de negocio y transiciones de estado
- Consulta de tareas por usuario
"""

import os
import unittest

os.environ["TESTING"] = "true"

from app import create_app
from app.models.user_model import UserModel
from app.models.task_model import TaskModel


class TaskFlowMVCTestCase(unittest.TestCase):
    def setUp(self):
        os.environ["TESTING"] = "true"
        # Resetear datos en memoria antes de cada test para aislamiento total
        UserModel.reset()
        TaskModel.reset()
        self.app = create_app()
        self.client = self.app.test_client()

    # --- Pruebas Generales ---
    def test_health_check(self):
        res = self.client.get("/api/health")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "ok")
        self.assertEqual(data["architecture"], "MVC")

    def test_index_catalogo(self):
        res = self.client.get("/")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn("endpoints", data)
        self.assertIn("GET /api/tasks", data["endpoints"])

    # --- Pruebas CRUD de Usuarios ---
    def test_get_users(self):
        res = self.client.get("/api/users")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(len(data), 2)

    def test_get_user_by_id(self):
        res = self.client.get("/api/users/1")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.get_json()["nombre"], "Admin")

        res_404 = self.client.get("/api/users/999")
        self.assertEqual(res_404.status_code, 404)

    def test_create_user(self):
        payload = {"nombre": "Ana Gómez", "email": "ana@taskflow.com", "rol": "usuario"}
        res = self.client.post("/api/users", json=payload)
        self.assertEqual(res.status_code, 201)
        data = res.get_json()
        self.assertEqual(data["nombre"], "Ana Gómez")
        self.assertEqual(data["id"], 3)

        # Validación campo obligatorio
        res_err = self.client.post("/api/users", json={"email": "sin_nombre@test.com"})
        self.assertEqual(res_err.status_code, 400)

        # Validación email duplicado
        res_dup = self.client.post("/api/users", json=payload)
        self.assertEqual(res_dup.status_code, 400)

    def test_update_user(self):
        res = self.client.put("/api/users/1", json={"nombre": "Super Administrador"})
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.get_json()["nombre"], "Super Administrador")

        res_404 = self.client.put("/api/users/999", json={"nombre": "Nadie"})
        self.assertEqual(res_404.status_code, 404)

    def test_delete_user(self):
        res = self.client.delete("/api/users/2")
        self.assertEqual(res.status_code, 200)

        # Verificar 404 tras eliminación
        res_verif = self.client.get("/api/users/2")
        self.assertEqual(res_verif.status_code, 404)

    # --- Pruebas CRUD de Tareas ---
    def test_list_tasks(self):
        res = self.client.get("/api/tasks")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(len(data), 3)

    def test_filter_tasks_by_user_and_status(self):
        # Filtrar por user_id
        res_user = self.client.get("/api/tasks?user_id=1")
        self.assertEqual(res_user.status_code, 200)
        self.assertEqual(len(res_user.get_json()), 2)

        # Filtrar por estado
        res_estado = self.client.get("/api/tasks?estado=completada")
        self.assertEqual(res_estado.status_code, 200)
        self.assertEqual(len(res_estado.get_json()), 1)

    def test_get_task_by_id(self):
        res = self.client.get("/api/tasks/1")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["titulo"], "Configurar entorno y Git")
        self.assertIn("usuario", data)
        self.assertEqual(data["usuario"]["nombre"], "Admin")

        res_404 = self.client.get("/api/tasks/999")
        self.assertEqual(res_404.status_code, 404)

    def test_create_task_success(self):
        payload = {
            "user_id": 1,
            "titulo": "Crear tests unitarios para MVC",
            "descripcion": "Verificar cobertura de Blueprints y modelos",
            "prioridad": "alta",
            "estado": "pendiente"
        }
        res = self.client.post("/api/tasks", json=payload)
        self.assertEqual(res.status_code, 201)
        data = res.get_json()
        self.assertEqual(data["titulo"], payload["titulo"])
        self.assertEqual(str(data["user_id"]), "1")
        self.assertEqual(data["id"], 4)

    def test_create_task_validations(self):
        # Título faltante
        res1 = self.client.post("/api/tasks", json={"user_id": 1})
        self.assertEqual(res1.status_code, 400)

        # Usuario inexistente
        res2 = self.client.post("/api/tasks", json={"user_id": 999, "titulo": "Tarea huerfana"})
        self.assertEqual(res2.status_code, 404)

        # Estado inválido
        res3 = self.client.post("/api/tasks", json={
            "user_id": 1,
            "titulo": "Estado raro",
            "estado": "invalido"
        })
        self.assertEqual(res3.status_code, 400)

    def test_update_task_and_state_transition(self):
        # Tarea 3 está en 'pendiente' -> transicionar a 'en_progreso' es válido
        res = self.client.put("/api/tasks/3", json={"estado": "en_progreso", "titulo": "Diseñar esquema Supabase V2"})
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.get_json()["estado"], "en_progreso")

        # Intentar reasignar a un usuario inexistente debe fallar
        res_bad_user = self.client.put("/api/tasks/3", json={"user_id": 999})
        self.assertEqual(res_bad_user.status_code, 404)

    def test_delete_task(self):
        res = self.client.delete("/api/tasks/1")
        self.assertEqual(res.status_code, 200)

        res_check = self.client.get("/api/tasks/1")
        self.assertEqual(res_check.status_code, 404)

    # --- Relación Usuario -> Tareas ---
    def test_get_user_tasks(self):
        res = self.client.get("/api/users/1/tasks")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["user"]["nombre"], "Admin")
        self.assertEqual(len(data["tasks"]), 2)

        res_404 = self.client.get("/api/users/999/tasks")
        self.assertEqual(res_404.status_code, 404)


if __name__ == "__main__":
    unittest.main()
