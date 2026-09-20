# 🚀 TaskFlow - Plataforma de Gestión de Tareas Full Stack

[![E2E Tests](https://img.shields.io/badge/E2E%20Tests-8%2F8%20Passed-success?style=flat-square)](backend/test_e2e_live.py)
[![Unit Tests](https://img.shields.io/badge/Unit%20Tests-20%2F20%20Passed-success?style=flat-square)](backend/test_api.py)
[![Frontend](https://img.shields.io/badge/Frontend-Cloudflare%20Pages-f38020?style=flat-square&logo=cloudflare)](https://taskflow-bco.pages.dev)
[![Backend](https://img.shields.io/badge/Backend-Render-46e3b7?style=flat-square&logo=render)](https://taskflow-zt2r.onrender.com)
[![Database](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ecf8e?style=flat-square&logo=supabase)](https://supabase.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

**TaskFlow** es una plataforma web full-stack profesional para la gestión moderna, eficiente y colaborativa de tareas cotidianas. Desarrollada como proyecto formativo integral para la materia **Programación Web II** en la **Universidad Privada Domingo Savio (UPDS)**, bajo la dirección del docente **Ing. Jim Requena**.

El proyecto implementa una **arquitectura desacoplada** con estilo de diseño **minimalista y monocromático**, autenticación segura mediante **JWT**, persistencia en **PostgreSQL con RLS** y despliegue automatizado en la nube (**Cloudflare Pages + Render**).

---

## 🌐 Despliegues en Vivo (Producción)

| Servicio | Plataforma | URL Pública Oficial | Estado |
|---|---|---|:---:|
| **Frontend (SPA)** | Cloudflare Pages | [**https://taskflow-bco.pages.dev**](https://taskflow-bco.pages.dev) | 🟢 **Activo** |
| **Backend API** | Render | [**https://taskflow-zt2r.onrender.com**](https://taskflow-zt2r.onrender.com) | 🟢 **Activo** |
| **Healthcheck API** | Render | [**https://taskflow-zt2r.onrender.com/api/health**](https://taskflow-zt2r.onrender.com/api/health) | 🟢 **Activo** |
| **Base de Datos** | Supabase | PostgreSQL en la Nube con RLS y Triggers | 🟢 **Activo** |

---

## 🏗️ Arquitectura del Sistema

TaskFlow separa estrictamente la capa de presentación de la capa lógica de negocio y persistencia:

```text
                                  +---------------------------------------+
                                  |            USUARIO FINAL              |
                                  |     (Móvil, Tablet o Escritorio)      |
                                  +-------------------+-------------------+
                                                      |
                                                      | HTTPS (CDN Global)
                                                      v
                                  +---------------------------------------+
                                  |       FRONTEND: CLOUDFLARE PAGES      |
                                  |  - React 18 + Vite (SPA)              |
                                  |  - TailwindCSS (Monocromático)       |
                                  |  - React Router + Context API         |
                                  |  - Regla SPA: /* -> /index.html 200   |
                                  +-------------------+-------------------+
                                                      |
                                                      | JSON REST API (CORS / JWT)
                                                      v
                                  +---------------------------------------+
                                  |          BACKEND: RENDER              |
                                  |  - Python 3.12 + Flask                |
                                  |  - Servidor WSGI: Gunicorn            |
                                  |  - Arquitectura MVC + Blueprints      |
                                  |  - Seguridad: @token_required (JWT)   |
                                  +-------------------+-------------------+
                                                      |
                                                      | TLS / PostgreSQL SDK
                                                      v
                                  +---------------------------------------+
                                  |       BASE DE DATOS: SUPABASE         |
                                  |  - PostgreSQL en la Nube              |
                                  |  - Row Level Security (RLS)           |
                                  |  - Tablas: users, tasks               |
                                  +---------------------------------------+
```

---

## ✨ Características Principales

- **Diseño Minimalista & Monocromático**: Paleta de colores sobria (zinc/blanco/negro), sin gradientes distractores, tipografía limpia y modo oscuro por defecto.
- **Autenticación Robusta**:
  - Registro de usuarios con medidor interactivo de fortaleza de contraseña.
  - Inicio de sesión con generación de JSON Web Tokens (JWT) seguros.
  - Rutas protegidas en React Router y decoradores `@token_required` / `@admin_required` en Flask.
- **Dashboard CRUD Completo**:
  - 4 Tarjetas de métricas en tiempo real (Total, Pendientes, En Progreso, Completadas).
  - Barra de progreso porcentual dinámica.
  - Selector de vista dual: **Vista de Tabla** responsiva o **Vista de Tarjetas**.
  - Búsqueda en vivo por texto y filtrado por estado y prioridad.
  - Modales controlados de creación/edición con contadores de caracteres (100/300) y selección de prioridad mediante tarjetas.
  - Diálogo de confirmación segura antes de eliminar tareas.
  - Sistema de notificaciones flotantes (Toasts) con micro-animaciones.
- **Totalmente Responsivo (Mobile-First)**: Menú hamburguesa interactivo para dispositivos móviles, tablas desplazables y cuadrícula adaptable.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías Empleadas |
|---|---|
| **Frontend** | React 18, Vite 6, Tailwind CSS 3.4, React Router DOM 7, Lucide React |
| **Backend** | Python 3.12, Flask 3.1, Flask-CORS, PyJWT, Werkzeug, Gunicorn 21 |
| **Base de Datos** | PostgreSQL 15 (Supabase Cloud), Row Level Security (RLS) |
| **Infraestructura Cloud** | Cloudflare Pages (CDN / Hosting Frontend), Render (Web Service WSGI) |
| **Pruebas y Calidad** | Unittest (20 pruebas unitarias), Script E2E automatizado en vivo |

---

## 📡 Catálogo de Endpoints de la API REST

Base URL en Producción: `https://taskflow-zt2r.onrender.com/api`

| Método | Endpoint | Autenticación | Descripción |
|:---:|---|:---:|---|
| `GET` | `/` | Pública | Estado general de la API y versión instalada. |
| `GET` | `/api/health` | Pública | Healthcheck para monitorización de Render. |
| `POST` | `/api/auth/register` | Pública | Registro de nuevos usuarios (`nombre`, `email`, `password`, `rol`). |
| `POST` | `/api/auth/login` | Pública | Autenticación de credenciales y emisión de token JWT. |
| `GET` | `/api/auth/me` | Bearer Token | Retorna los datos del usuario autenticado. |
| `GET` | `/api/tasks` | Pública / Token | Lista de tareas (soporta query params `?user_id=...&estado=...`). |
| `GET` | `/api/tasks/<id>` | Pública / Token | Detalle de una tarea específica por UUID. |
| `POST` | `/api/tasks` | Bearer Token | Crea una nueva tarea (`titulo`, `descripcion`, `prioridad`, `estado`). |
| `PUT` | `/api/tasks/<id>` | Bearer Token | Actualiza los datos o estado de una tarea existente. |
| `DELETE`| `/api/tasks/<id>` | Bearer Token | Elimina físicamente una tarea de la base de datos. |

---

## 💻 Instalación y Ejecución Local

### Prerrequisitos
- **Python 3.12+** instalado.
- **Node.js 18+** y **npm** instalados.
- **Git** instalado.

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Charles2810/taskflow.git
cd taskflow
```

### 2. Configurar y Ejecutar el Backend (Flask)
```bash
cd backend

# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
# En Windows:
.venv\Scripts\activate
# En Linux/macOS:
source .venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno (crear .env a partir de .env.example)
cp .env.example .env

# Ejecutar pruebas unitarias
python test_api.py

# Iniciar servidor de desarrollo
python run.py
# El backend estará disponible en: http://127.0.0.1:5000
```

### 3. Configurar y Ejecutar el Frontend (React + Vite)
En una nueva terminal:
```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
# La aplicación abrirá en: http://localhost:5173
```

---

## 🧪 Pruebas Automatizadas

El proyecto incluye dos suites de pruebas para garantizar confiabilidad:

1. **Pruebas Unitarias de Backend (In-Memory)**:
   ```bash
   cd backend
   python test_api.py
   # 20 pruebas ejecutadas en 0.058s (Modelos, Auth, CRUD, Seguridad).
   ```
2. **Pruebas de Integración End-to-End en Vivo (Render + Supabase)**:
   ```bash
   cd backend
   python test_e2e_live.py
   # Valida en vivo: Registro -> Login -> Token Me -> Crear Tarea -> Listar -> Actualizar -> Eliminar.
   ```

---

## 🎓 Material para la Presentación Académica (Feria)

En el directorio `docs/entrega/` se encuentran los recursos preparados para la defensa del proyecto:
- **[Guion de Presentación y Pitch de 3 Minutos](docs/entrega/guion_presentacion.md)**: Estructura del discurso, demo paso a paso, respuestas a preguntas difíciles del jurado y plan B.
- **[Matriz de Cumplimiento de la Rúbrica](docs/entrega/checklist_rubrica.md)**: Mapeo de los requisitos de las 14 sesiones contra las evidencias técnicas del repositorio.
- **[Guía de Despliegue en Render](docs/deploy/render.md)**: Configuración del Web Service y Gunicorn.
- **[Guía de Despliegue en Cloudflare Pages](docs/deploy/cloudflare.md)**: Configuración del CDN y reglas SPA.

---

## 👥 Autor y Agradecimientos

- **Desarrollador**: Charles2810 ([GitHub](https://github.com/Charles2810))
- **Materia**: Programación Web II
- **Universidad**: Universidad Privada Domingo Savio (UPDS)
- **Docente**: Ing. Jim Requena
