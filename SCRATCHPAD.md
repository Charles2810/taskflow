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
| **01** | Entorno + Git + GitHub | ✅ **COMPLETADO** | Entorno configurado (Python 3.12, Node 24, Git), Repo GitHub creado, Estructura base, `.gitignore`, `README.md`, `SCRATCHPAD.md`. | Pasar a Sesión 02 |
| **02** | Python + Flask: Primera API | ⏳ **SIGUIENTE** | Entorno virtual (`.venv`), `requirements.txt`, primera API Flask funcional con rutas de prueba y JSON. | Crear venv e instalar Flask |
| **03** | CRUD y Estructura MVC | 🔜 Pendiente | Controladores, Modelos, Servicios y rutas REST completas (GET, POST, PUT, DELETE). | Esperar Sesión 02 |
| **04** | Supabase & Base de Datos | 🔜 Pendiente | Tablas SQL en Supabase (`users`, `tasks`), migración e integración con SDK Supabase en Flask. | Requiere cuenta Supabase |
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

### ⏳ Próxima Sesión: Sesión 02 - Python + Flask: Creación de la Primera API REST
- **Qué haremos**:
  1. Crear el entorno virtual de Python (`python -m venv .venv`).
  2. Instalar dependencias base (`Flask`, `python-dotenv`, `flask-cors`) y generar `requirements.txt`.
  3. Crear la aplicación inicial en `backend/run.py` y `backend/app/__init__.py`.
  4. Implementar las primeras rutas de prueba (`/`, `/api/health`, `/api/tasks` mock) y probarlas localmente.
- **Lo que tú necesitas hacer**:
  - Ninguna acción externa requerida para la Sesión 02. Todo se ejecutará y validará en tu entorno local.
