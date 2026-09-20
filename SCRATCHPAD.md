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
- [ ] **Sesión 04**: Crear cuenta en [Supabase](https://supabase.com) y crear un nuevo proyecto gratuito ("TaskFlow DB").
  - *Se requerirá*: `SUPABASE_URL` y `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_KEY`.
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
| **03** | CRUD y Estructura MVC | ✅ **COMPLETADO** | Refactorización a MVC: `models/`, `controllers/`, `routes/`, Blueprints modulares (`users_bp`, `tasks_bp`), CRUD completo de Tareas y 15 pruebas unitarias. | Pasar a Sesión 04 |
| **04** | Supabase & Base de Datos | ⏳ **SIGUIENTE** | Migración de datos en memoria a PostgreSQL real en la nube con Supabase, esquemas SQL (`users`, `tasks`), RLS y SDK `supabase-py`. | **Crear proyecto en Supabase** |
| **05** | Autenticación y Autorización | 🔜 Pendiente | JWT (JSON Web Tokens), endpoints `/auth/register` y `/auth/login`, decoradores `@token_required`. | - |
| **06** | React + Vite Setup | 🔜 Pendiente | Inicialización de SPA en `frontend/` con Vite, configuración de scripts y estructura de componentes. | - |
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
  1. Verificación e instalación de herramientas:
     - `Git`: versión 2.55.0 configurada con `user.name: Charles2810`, `user.email: condecharles28@gmail.com`.
     - `Node.js`: v24.21.0 verificado.
     - `Python`: 3.12.10 instalado y enlazado al PATH del sistema.
     - `pip`: 25.0.1 verificado.
     - `gh CLI`: versión 2.101.0 autenticado con GitHub.
  2. Organización de archivos:
     - 14 guías PDF trasladadas a `docs/guias/` para mantener limpio el directorio raíz.
     - Carpetas creadas: `backend/app/`, `frontend/src/`, `docs/guias/`.
  3. Archivos base creados:
     - `.gitignore` (reglas para Python, Node, entornos virtuales y secretos).
     - `README.md` (documentación oficial del proyecto).
     - `SCRATCHPAD.md` (este documento).
  4. Repositorio Git y GitHub:
     - Repositorio local inicializado con rama principal `main`.
     - Repositorio remoto público creado en GitHub: `https://github.com/Charles2810/taskflow`.
     - Commit inicial y sincronización (`push`) realizada exitosamente.

---

### ✅ Sesión 02: Python + Flask: Creación de la Primera API REST
- **Objetivo**: Crear el entorno virtual, instalar Flask y Flask-CORS, y construir una API REST completa con operaciones CRUD de usuarios y validaciones.
- **Acciones Realizadas**:
  1. Entorno virtual y dependencias:
     - Entorno virtual `.venv` generado en `backend/` con Python 3.12.
     - Dependencias instaladas: `Flask 3.1.3`, `Flask-CORS 6.0.5`, `python-dotenv 1.2.3`.
     - Archivo `requirements.txt` y `.env.example` configurados.
  2. Implementación de la API:
     - Factory pattern `create_app()` en `backend/app/__init__.py`.
     - Habilitación de CORS para comunicación con el frontend.
     - Endpoints CRUD de usuarios (`GET`, `POST`, `PUT`, `DELETE`).
  3. Pruebas y Validación:
     - Suite automatizada con 7 pruebas unitarias aprobadas.

---

### ✅ Sesión 03: CRUD Completo + Estructura MVC
- **Objetivo**: Organizar profesionalmente el código backend bajo la arquitectura MVC (Model-View-Controller) y construir el CRUD completo de Tareas con validaciones y relaciones.
- **Acciones Realizadas**:
  1. Arquitectura MVC implementada en `backend/app/`:
     - **Modelos** (`app/models/`):
       - `user_model.py`: `UserModel` con métodos CRUD, búsqueda por ID y por email, y reset.
       - `task_model.py`: `TaskModel` con relación foránea `user_id`, prioridades (`baja`, `media`, `alta`), estados (`pendiente`, `en_progreso`, `completada`) y máquina de estados para transiciones permitidas.
     - **Controladores** (`app/controllers/`):
       - `user_controller.py`: Lógica de negocio, validaciones de emails únicos, nombres no vacíos, cascada de tareas al eliminar usuario y endpoint `get_user_tasks`.
       - `task_controller.py`: Validación de existencia de usuario asignado, validación de título obligatorio, control estricto de transiciones de estado y respuestas enriquecidas con datos del usuario.
     - **Rutas y Blueprints** (`app/routes/`):
       - `user_routes.py`: Blueprint `users_bp` registrado con prefijo `/api`.
       - `task_routes.py`: Blueprint `tasks_bp` registrado con prefijo `/api`.
     - **Factoría Principal** (`app/__init__.py`): Registro modular de Blueprints, habilitación global de CORS, endpoint raíz de documentación dinámica de rutas y health-check.
  2. Pruebas Automatizadas:
     - Suite `backend/test_api.py` ampliada a **15 pruebas unitarias**.
     - Cobertura: Health check, catálogo, CRUD completo de usuarios, validación de email duplicado, CRUD completo de tareas, filtros por `user_id` y por `estado`, validación de transiciones de estado, cascada y relación usuario-tareas.
     - **Resultado**: 15/15 tests aprobados en 0.045s.

---

### ⏳ Próxima Sesión: Sesión 04 - Supabase: Base de Datos en la Nube
- **Qué haremos**:
  1. Conectar Flask con PostgreSQL en la nube a través del SDK `supabase-py`.
  2. Crear los scripts de migración SQL para las tablas `users` y `tasks` con claves foráneas, tipos UUID y timestamps.
  3. Reemplazar la persistencia en memoria de los modelos por operaciones directas contra Supabase.
  4. Configurar variables de entorno seguras (`SUPABASE_URL`, `SUPABASE_KEY`).
- **🔔 LO QUE TÚ TIENES QUE HACER**:
  - Ingresar a [https://supabase.com](https://supabase.com) y registrarte (con tu cuenta de GitHub o email).
  - Crear un nuevo proyecto gratuito (por ejemplo llamado `taskflow-db`).
  - Obtener tu **Project URL** y tu **anon public API Key** desde: *Project Settings > API*.
  - (Te guiaremos paso a paso en cuanto iniciemos la sesión).
