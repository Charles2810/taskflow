"""
Pruebas End-to-End (E2E) en Producción para TaskFlow (Sesión 14)
Valida la integración completa entre la API en Render y la base de datos Supabase:
1. Healthcheck (/api/health)
2. Registro de nuevo usuario (/api/auth/register)
3. Login y obtención de JWT (/api/auth/login)
4. Consulta de perfil con token (/api/auth/me)
5. Creación de tarea (/api/tasks)
6. Listado y verificación de tarea creada (/api/tasks)
7. Actualización de estado (/api/tasks/<id>)
8. Eliminación física de tarea (/api/tasks/<id>)
"""

import json
import os
import sys
import time
import urllib.request
import urllib.error

# Configurar encoding seguro para consolas Windows
if sys.stdout.encoding != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

BASE_URL = "https://taskflow-zt2r.onrender.com/api"



def request_json(url, method="GET", data=None, token=None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    body = json.dumps(data).encode("utf-8") if data is not None else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            content = resp.read().decode("utf-8")
            return resp.status, json.loads(content) if content else {}
    except urllib.error.HTTPError as e:
        content = e.read().decode("utf-8")
        try:
            return e.code, json.loads(content)
        except Exception:
            return e.code, {"raw_error": content}


def run_e2e_tests():
    print("=" * 65)
    print("🚀 INICIANDO SUITE DE PRUEBAS END-TO-END (E2E) EN PRODUCCIÓN")
    print(f"🔗 Target: {BASE_URL}")
    print("=" * 65)

    timestamp = int(time.time())
    test_email = f"e2e_test_{timestamp}@taskflow.test"
    test_password = "Password123!"
    test_name = f"Tester E2E {timestamp}"

    # 1. Healthcheck
    print("\n[1/8] Verificando Healthcheck de la API en Render...")
    status, res = request_json(f"{BASE_URL}/health")
    assert status == 200, f"Healthcheck falló con status {status}: {res}"
    print(f"  ✅ Healthcheck OK: status={res.get('status')}, service={res.get('service')}")

    # 2. Registro
    print(f"\n[2/8] Registrando usuario temporal de prueba ({test_email})...")
    reg_payload = {
        "nombre": test_name,
        "email": test_email,
        "password": test_password,
        "rol": "usuario",
    }
    status, res = request_json(f"{BASE_URL}/auth/register", method="POST", data=reg_payload)
    assert status in (201, 200), f"Registro falló con status {status}: {res}"
    user_id = res.get("user", {}).get("id") or res.get("id")
    print(f"  ✅ Registro OK: Usuario creado con ID={user_id}")

    # 3. Login
    print("\n[3/8] Autenticando con credenciales (Login)...")
    login_payload = {"email": test_email, "password": test_password}
    status, res = request_json(f"{BASE_URL}/auth/login", method="POST", data=login_payload)
    assert status == 200, f"Login falló con status {status}: {res}"
    token = res.get("token")
    assert token, "No se recibió token JWT en el login"
    print(f"  ✅ Login exitoso: JWT emitido ({token[:20]}...)")

    # 4. Auth Me
    print("\n[4/8] Verificando identidad mediante token (/auth/me)...")
    status, res = request_json(f"{BASE_URL}/auth/me", token=token)
    assert status == 200, f"Verificación /auth/me falló: {res}"
    verified_email = res.get("user", {}).get("email") or res.get("email")
    print(f"  ✅ Token válido: Usuario identificado como {verified_email}")

    # 5. Crear Tarea
    print("\n[5/8] Creando nueva tarea en Supabase vía API...")
    task_payload = {
        "titulo": f"Tarea E2E {timestamp}",
        "descripcion": "Verificación automatizada de flujo completo en la nube",
        "prioridad": "alta",
        "estado": "pendiente",
        "user_id": user_id,
    }
    status, res = request_json(f"{BASE_URL}/tasks", method="POST", data=task_payload, token=token)
    assert status in (201, 200), f"Creación de tarea falló: {res}"
    task = res.get("task") or res
    task_id = task.get("id")
    assert task_id, f"No se obtuvo ID de tarea: {res}"
    print(f"  ✅ Tarea creada exitosamente con ID={task_id}, Titulo='{task.get('titulo')}'")

    # 6. Listar Tareas
    print("\n[6/8] Consultando listado de tareas...")
    status, res = request_json(f"{BASE_URL}/tasks?user_id={user_id}", token=token)
    assert status == 200, f"Listado de tareas falló: {res}"
    tasks_list = res.get("tasks") if isinstance(res, dict) and "tasks" in res else res
    matching = [t for t in tasks_list if t.get("id") == task_id]
    assert len(matching) > 0, f"La tarea creada no se encontró en el listado"
    print(f"  ✅ Tarea confirmada en base de datos: estado='{matching[0].get('estado')}'")

    # 7. Actualizar Tarea
    print(f"\n[7/8] Actualizando estado de la tarea {task_id} a 'completada'...")
    update_payload = {"estado": "completada"}
    status, res = request_json(f"{BASE_URL}/tasks/{task_id}", method="PUT", data=update_payload, token=token)
    assert status == 200, f"Actualización falló: {res}"
    print("  ✅ Estado actualizado con éxito a 'completada'")

    # 8. Eliminar Tarea
    print(f"\n[8/8] Eliminando tarea de prueba {task_id}...")
    status, res = request_json(f"{BASE_URL}/tasks/{task_id}", method="DELETE", token=token)
    assert status == 200, f"Eliminación falló: {res}"
    print("  ✅ Tarea eliminada correctamente de Supabase")

    print("\n" + "=" * 65)
    print("🎉 TODAS LAS PRUEBAS END-TO-END (8/8) PASARON EXITOSAMENTE EN VIVO")
    print("=" * 65)


if __name__ == "__main__":
    run_e2e_tests()
