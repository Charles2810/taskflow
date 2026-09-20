# Guía de Despliegue del Backend en Render (Sesión 12)

Esta guía detalla el procedimiento paso a paso para publicar la API REST de Flask en **Render** (servicio gratuito en la nube).

---

## 📋 Parámetros de Configuración en Render

Si creas el servicio manualmente en Render (**Dashboard > New + > Web Service**):

| Parámetro | Valor a Configurar |
|---|---|
| **Repository** | `https://github.com/Charles2810/taskflow` |
| **Name** | `taskflow-backend` (o el nombre que elijas) |
| **Region** | Oregon (US West) u Ohio (US East) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn run:app` |
| **Instance Type** | `Free` |

---

## 🔑 Variables de Entorno (Environment Variables)

En la sección **Environment** de tu Web Service en Render, agrega las siguientes variables:

1. `PYTHON_VERSION`: `3.12.0`
2. `SUPABASE_URL`: `https://zwezwzpmtoghiwiebmjh.supabase.co`
3. `SUPABASE_SECRET_KEY`: *(Tu clave secreta de Supabase que está configurada en `backend/.env`)*
4. `JWT_SECRET`: *(Cadena secreta para firmar los tokens JWT, ej: `taskflow-jwt-super-secret-key-2026`)*

---

## 🚀 Pasos para Desplegar

1. Ingresa a [https://render.com](https://render.com) e inicia sesión con tu cuenta de GitHub (`Charles2810`).
2. En el Dashboard, presiona **New +** y selecciona **Web Service**.
3. Selecciona tu repositorio `Charles2810/taskflow` (si no aparece, haz clic en *Configure account* y dale permisos al repositorio).
4. Completa los campos con los valores de la tabla superior (**Root Directory: `backend`**, **Build Command: `pip install -r requirements.txt`**, **Start Command: `gunicorn run:app`**).
5. En la sección **Environment Variables**, agrega las 4 variables indicadas arriba.
6. Haz clic en **Create Web Service**.
7. Render descargará el código, instalará las dependencias y levantará la API con Gunicorn.

---

## 🧪 Verificación de la URL Pública

Una vez finalizado el build (aparecerá en verde con el estado `Live`), Render te otorgará una URL pública gratuita, por ejemplo:
`https://taskflow-backend-xxxx.onrender.com`

Puedes verificar el servicio abriendo en tu navegador:
1. `https://tu-servicio.onrender.com/` → Respuesta JSON informativa con mapa de endpoints.
2. `https://tu-servicio.onrender.com/api/health` → `{"status": "ok", "service": "taskflow-backend"}`.
3. `https://tu-servicio.onrender.com/api/tasks` → Lista de tareas sincronizadas desde Supabase.
