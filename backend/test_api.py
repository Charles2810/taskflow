"""
Pruebas automatizadas para la API REST de TaskFlow (Sesión 02)
Verifica los endpoints:
- GET /api/health
- GET /api/users
- GET /api/users/<id> (200 y 404)
- POST /api/users (201 y 400 por validación)
- PUT /api/users/<id> (200 y 404)
- DELETE /api/users/<id> (200 y 404)
"""

import unittest
from app import create_app


class TaskFlowAPITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_health_check(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["status"], "ok")
        self.assertIn("TaskFlow", data["message"])

    def test_get_users(self):
        response = self.client.get("/api/users")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)
        self.assertGreaterEqual(len(data), 2)

    def test_get_user_by_id(self):
        # Usuario existente
        response = self.client.get("/api/users/1")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["id"], 1)
        self.assertEqual(data["nombre"], "Admin")

        # Usuario inexistente
        response_404 = self.client.get("/api/users/999")
        self.assertEqual(response_404.status_code, 404)

    def test_create_user_success(self):
        payload = {
            "nombre": "Carlos Mendoza",
            "email": "carlos@taskflow.com",
            "rol": "desarrollador"
        }
        response = self.client.post("/api/users", json=payload)
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data["nombre"], "Carlos Mendoza")
        self.assertEqual(data["email"], "carlos@taskflow.com")
        self.assertIn("id", data)

    def test_create_user_validation_error(self):
        # Falta campo obligatorio 'nombre'
        response = self.client.post("/api/users", json={"email": "noname@taskflow.com"})
        self.assertEqual(response.status_code, 400)
        data = response.get_json()
        self.assertIn("error", data)

    def test_update_user(self):
        # Actualizar usuario existente
        payload = {"nombre": "Admin Actualizado", "rol": "superadmin"}
        response = self.client.put("/api/users/1", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["nombre"], "Admin Actualizado")

        # Actualizar usuario inexistente
        response_404 = self.client.put("/api/users/999", json=payload)
        self.assertEqual(response_404.status_code, 404)

    def test_delete_user(self):
        # Eliminar usuario existente
        response = self.client.delete("/api/users/2")
        self.assertEqual(response.status_code, 200)

        # Verificar que ya no existe
        get_deleted = self.client.get("/api/users/2")
        self.assertEqual(get_deleted.status_code, 404)

        # Eliminar usuario inexistente
        response_404 = self.client.delete("/api/users/999")
        self.assertEqual(response_404.status_code, 404)


if __name__ == "__main__":
    unittest.main()
