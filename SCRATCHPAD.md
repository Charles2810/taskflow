# 📋 SCRATCHPAD DE SEGUIMIENTO - TASKFLOW

> **Proyecto**: TaskFlow - Gestión de Tareas Full Stack  
> **Materia**: Programación Web II | UPDS | Ing. Jim Requena  
> **Autor**: Charles2810  
> **Última Actualización**: 2026-09-19  

---

## 🎯 ¿Qué es este Scratchpad?
Este documento es la **bitácora viva de desarrollo**. Aquí registramos:
1. El estado actual de cada una de las 14 sesiones del proyecto.
2. Los entregables y código generado en cada etapa.
3. **Las tareas manuales que tú (el usuario) debes realizar** (creación de cuentas, configuración de credenciales, etc.).
4. Pruebas y validaciones ejecutadas.

---

## 🔔 CHECKLIST DE TAREAS QUE DEBES HACER TÚ (USUARIO)

A medida que avancemos, necesitarás tener listas ciertas cuentas y accesos. Este checklist te avisa con anticipación:

- [x] **Sesión 01**: Tener Git instalado y cuenta de GitHub configurada (`Charles2810`).
- [x] **Sesión 04**: Crear proyecto en [Supabase](https://supabase.com), configurar `.env` y ejecutar script SQL (✅ Completado y verificado en vivo).
- [ ] **Sesión 12**: Crear cuenta en [Render](https://render.com) para alojar la API Flask de backend.
  - *Se requerirá*: Conectar tu cuenta de GitHub a Render.
- [ ] **Sesión 13**: Crear cuenta en [Cloudflare Pages](https://pages.cloudflare.com) para alojar el frontend React.
  - *Se requerirá*: Conectar tu repositorio de GitHub a Cloudflare Pages.

---

## 📊 MATRIZ DE PROGRESO POR SESIÓN

| # | Sesión | Estado | Entregables Clave | Próxima Acción |
|---|---|:---:|---|---|
| **01** | Entorno + Git + GitHub | ✅ **COMPLETADO** | Entorno configurado (Python 3.12, Node 24, Git), Repo GitHub creado, Estructura base, `.gitignore`, `README.md`, `SCRATCHPAD.md`. | Sesión 01 finalizada |
| **02** | Python + Flask: Primera API | ✅ **COMPLETADO** | Entorno virtual `.venv`, `requirements.txt`, API Flask con endpoints REST completos (`GET`, `POST`, `PUT`, `DELETE`), CORS y suite de pruebas unitarias (`test_api.py`). | Sesión 02 finalizada |
| **03** | CRUD y Estructura MVC | ✅ **COMPLETADO** | Refactorización a MVC: `models/`, `controllers/`, `routes/`, Blueprints modulares (`users_bp`, `tasks_bp`), CRUD completo de Tareas y 15 pruebas unitarias. | Sesión 03 finalizada |
| **04** | Supabase & Base de Datos | ✅ **COMPLETADO** | Conexión activa a PostgreSQL en la nube, tablas `users` y `tasks` creadas con RLS, SDK `supabase-py` integrado y verificado con consultas en vivo. | Sesión 04 finalizada |
| **05** | Autenticación y Autorización | ✅ **COMPLETADO** | Módulo de Auth JWT / Supabase, endpoints `/auth/register`, `/auth/login`, `/auth/me`, decoradores `@token_required` y `@admin_required`, 20 pruebas unitarias aprobadas. | Pasar a Sesión 06 |
| **06** | React + Vite Setup | ⏳ **SIGUIENTE** | Inicialización del frontend con React 18/19, Vite y TailwindCSS en `frontend/`, estructura de componentes funcionales y estado con `useState`. | Configurar React + Vite |
| **07** | React Router y Navegación | 🔜 Pendiente | Configuración de rutas (`/`, `/login`, `/register`, `/dashboard`), layouts y páginas protegidas. | - |
| **08** | Consumo de API y Estado | 🔜 Pendiente | Servicios Axios/Fetch, Custom Hooks, Context API para autenticación global y sesión persistente. | - |
| **09** | Dashboard CRUD en React | 🔜 Pendiente | Listado interactivo de tareas, modal de creación/edición, cambio de estado (pendiente/completada), eliminación. | - |
| **10** | Diseño Responsive + Tailwind | 🔜 Pendiente | Estilos modernos, diseño móvil/tablet/desktop, temas y feedback visual enriquecido. | - |
| **11** | Formularios y Validación | 🔜 Pendiente | Validación de formularios, manejo de errores de backend y notificaciones toast de éxito/alerta. | - |
| **12** | Deploy Backend en Render | 🔜 Pendiente | Archivo `Procfile` / `render.yaml`, variables de entorno en Render, API pública en producción. | Requiere cuenta Render |
| **13** | Deploy Frontend en Cloudflare | 🔜 Pendiente | Build de producción (`npm run build`), configuración en Cloudflare Pages, conexión con API de Render. | Requiere cuenta Cloudflare |
| **14** | Integración Final & Pruebas | 🔜 Pendiente | Pruebas de integración E2E, documentación final, revisión de rúbrica y entrega académica. | - |

---

## 📝 REGISTRO DETALLADO DE SESIONES

### ✅ Sesión 01: Entorno de Desarrollo + Git + GitHub
- **Objetivo**: Establecer el ambiente completo, instalar herramientas, estructurar el repositorio y subirlo a GitHub.
- **Acciones Realizadas**:
  1. Verificación e instalación de herramientas (Git, Node, Python 3.12, gh CLI).
  2. Organización de archivos (PDFs en `docs/guias/`).
  3. Creación de `.gitignore`, `README.md`, `SCRATCHPAD.md`.
  4. Repositorio público en GitHub enlazado.

---

### ✅ Sesión 02: Python + Flask: Creación de la Primera API REST
- **Objetivo**: Crear entorno virtual `.venv`, endpoints CRUD en memoria y pruebas unitarias.
- **Acciones Realizadas**:
  1. Entorno `.venv` con Flask y Flask-CORS.
  2. Endpoints `/api/health` y `/api/users`.
  3. Suite de pruebas unitarias.

---

### ✅ Sesión 03: CRUD Completo + Estructura MVC
- **Objetivo**: Organizar backend en MVC profesional y crear CRUD de Tareas con Blueprints.
- **Acciones Realizadas**:
  1. Carpetas `models/`, `controllers/`, `routes/`.
  2. Blueprints `users_bp` y `tasks_bp`.
  3. Relaciones usuario-tarea y máquina de estados para tareas.
  4. 15 pruebas unitarias aprobadas.

---

### ✅ Sesión 04: Supabase: Base de Datos en la Nube
- **Objetivo**: Migrar de memoria a PostgreSQL en la nube con Supabase.
- **Acciones Realizadas**:
  1. SDK `supabase-py` integrado en `backend/app/config.py`.
  2. Credenciales configuradas de forma segura en `backend/.env`.
  3. Script de migración SQL `docs/sql/01_create_tables.sql` ejecutado en Supabase con RLS, tablas `users` y `tasks`, índices y seeds.
  4. Verificación en vivo: consultas directas de usuarios y tareas desde la base de datos en la nube.

---

### ✅ Sesión 05: Autenticación y Autorización
- **Objetivo**: Proteger la aplicación con tokens JWT y control de acceso por roles.
- **Acciones Realizadas**:
  1. Módulo de utilidad `backend/app/utils/auth.py`:
     - Función `generate_token(user)` con firma HS256 y expiración a 24 horas.
     - Función `decode_token(token)` con soporte para JWT local y verificación con `supabase.auth.get_user(token)`.
     - Middleware `@token_required`: valida header `Authorization: Bearer <token>` e inyecta el usuario en `g.current_user` (401 si falta o es inválido).
     - Middleware `@admin_required`: valida rol de administrador (403 si denegado).
  2. Controlador `backend/app/controllers/auth_controller.py`:
     - `POST /api/auth/register`: Registro validando longitud de contraseña, correo único y emisión de token JWT inicial (201).
     - `POST /api/auth/login`: Autenticación contra Supabase Auth y base de datos con generación de JWT (200).
     - `GET /api/auth/me`: Perfil del usuario autenticado actual protegido con `@token_required`.
  3. Rutas `backend/app/routes/auth_routes.py`:
     - Blueprint `auth_bp` registrado con prefijo `/api` en la factoría `create_app()`.
  4. Pruebas Automatizadas:
     - **20/20 pruebas unitarias aprobadas** en 0.059s en `backend/test_api.py`.

---

### ⏳ Próxima Sesión: Sesión 06 - React + Vite: Setup y Componentes
- **Qué haremos**:
  1. Inicializar la aplicación cliente SPA en la carpeta `frontend/` usando Vite y React (`npm create vite@latest . -- --template react`).
  2. Instalar dependencias de frontend y configurar **TailwindCSS** con sus directivas de estilos.
  3. Crear componentes funcionales base reutilizables (Botón, Card, Input, Navbar).
  4. Manejar estado interactivo con `useState` y pasar datos mediante `props`.
- **Lo que tú necesitas hacer**:
  - Ninguna acción externa requerida. Se desarrollará y probará en el entorno local.
