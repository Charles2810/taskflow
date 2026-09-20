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

    # --- Pruebas de Autenticación y JWT (Sesión 05) ---
    def test_auth_register_success(self):
        payload = {
            "nombre": "Estudiante UPDS",
            "email": "estudiante@upds.edu.bo",
            "password": "passwordSeguro123",
            "rol": "usuario"
        }
        res = self.client.post("/api/auth/register", json=payload)
        self.assertEqual(res.status_code, 201)
        data = res.get_json()
        self.assertIn("token", data)
        self.assertIn("user", data)
        self.assertEqual(data["user"]["email"], "estudiante@upds.edu.bo")

    def test_auth_register_validations(self):
        # Contraseña corta (< 6 caracteres)
        res1 = self.client.post("/api/auth/register", json={
            "nombre": "Test",
            "email": "test@email.com",
            "password": "123"
        })
        self.assertEqual(res1.status_code, 400)

        # Correo ya existente
        res2 = self.client.post("/api/auth/register", json={
            "nombre": "Otro Admin",
            "email": "admin@taskflow.com",
            "password": "password123"
        })
        self.assertEqual(res2.status_code, 400)

    def test_auth_login_success(self):
        # Iniciar sesión con un usuario existente
        res = self.client.post("/api/auth/login", json={
            "email": "admin@taskflow.com",
            "password": "cualquierPasswordParaTest"
        })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn("token", data)
        self.assertEqual(data["user"]["email"], "admin@taskflow.com")

    def test_auth_login_invalid_credentials(self):
        res = self.client.post("/api/auth/login", json={
            "email": "noexiste@taskflow.com",
            "password": "wrongpassword"
        })
        self.assertEqual(res.status_code, 401)

    def test_auth_me_protected(self):
        # 1. Petición sin token -> 401
        res_no_token = self.client.get("/api/auth/me")
        self.assertEqual(res_no_token.status_code, 401)

        # 2. Petición con token inválido -> 401
        res_bad_token = self.client.get("/api/auth/me", headers={"Authorization": "Bearer tokenInvalido123"})
        self.assertEqual(res_bad_token.status_code, 401)

        # 3. Obtener token válido mediante login
        login_res = self.client.post("/api/auth/login", json={
            "email": "admin@taskflow.com",
            "password": "password123"
        })
        token = login_res.get_json()["token"]

        # 4. Petición con Bearer token válido -> 200
        res_me = self.client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
        self.assertEqual(res_me.status_code, 200)
        data = res_me.get_json()
        self.assertEqual(data["user"]["email"], "admin@taskflow.com")
        self.assertEqual(data["user"]["rol"], "administrador")


if __name__ == "__main__":
    unittest.main()
