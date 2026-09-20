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
| **06** | React + Vite Setup | ✅ **COMPLETADO** | Configuración de React 18 con Vite, TailwindCSS, PostCSS, componentes base (`Button`, `Card`, `Input`, `Navbar`, `Badge`) y estado reactivo con `useState`. | Pasar a Sesión 07 |
| **07** | React Router y Navegación | ✅ **COMPLETADO** | `react-router-dom` configurado, rutas públicas (`/`, `/login`, `/register`), ruta protegida (`/dashboard`), `MainLayout`, 404 `NotFound` y enlaces fluidos. | Sesión 07 finalizada |
| **08** | Consumo de API y Estado | ✅ **COMPLETADO** | Conexión Frontend-Backend con `fetch`, `useEffect`, manejo de estados `loading`/`error`, cliente `api.js` y `AuthContext` global con persistencia. | Pasar a Sesión 09 |
| **09** | Dashboard CRUD en React | ⏳ **SIGUIENTE** | Dashboard interactivo completo: creación, edición, filtrado avanzado por estado/prioridad, modal interactivo y contadores en vivo. | Construir CRUD interactivo |
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
  1. Módulo `backend/app/utils/auth.py` (`generate_token`, `decode_token`, `@token_required`, `@admin_required`).
  2. Controlador `backend/app/controllers/auth_controller.py` (`register`, `login`, `me`).
  3. Rutas `backend/app/routes/auth_routes.py` y registro en factoría.
  4. 20 pruebas unitarias aprobadas.

---

### ✅ Sesión 06: React + Vite: Setup y Componentes
- **Objetivo**: Inicializar el entorno del Frontend con React, Vite y TailwindCSS, y construir componentes funcionales minimalistas monocromáticos.
- **Acciones Realizadas**:
  1. Configuración de React 18, Vite 6, TailwindCSS y PostCSS en `frontend/`.
  2. Biblioteca de componentes: `Button.jsx`, `Card.jsx`, `Input.jsx`, `Badge.jsx`, `Navbar.jsx`.
  3. Aplicación de rediseño monocromático sin gradientes según requerimiento del usuario.
  4. Compilación exitosa en 1.13s con `npm.cmd run build`.

---

### ✅ Sesión 07: React Router: Navegación SPA
- **Objetivo**: Configurar navegación Single Page Application con React Router, rutas públicas y privadas, y resguardo mediante componentes de protección.
- **Acciones Realizadas**:
  1. Paquete instalado: `react-router-dom` en `frontend/package.json`.
  2. Layout y Vistas Creadas:
     - `layouts/MainLayout.jsx`: Contenedor principal con Navbar y `<Outlet />` para navegación fluida.
     - `pages/Home.jsx`: Landing page con presentación de la plataforma y llamadas a la acción.
     - `pages/Login.jsx`: Formulario de inicio de sesión con navegación mediante `useNavigate()` y atajos de prueba demo.
     - `pages/Register.jsx`: Formulario de creación de cuenta.
     - `pages/Dashboard.jsx`: Vista privada y modularizada del gestor de tareas.
     - `pages/NotFound.jsx`: Manejo de rutas inexistentes (Error 404).
  3. Protección de Rutas:
     - `components/ProtectedRoute.jsx`: Bloquea el acceso a `/dashboard` si no existe token en `localStorage` y redirige a `/login` preservando la ruta previa.
  4. Integración y Compilación:
     - Configuración central de `<BrowserRouter>` en `frontend/src/App.jsx`.
     - `Navbar.jsx` actualizado con enlaces `<Link>`, detección de ruta activa y botón de cerrar sesión.
     - Compilación limpia con `npm.cmd run build` (**1.36s**).

---

### ✅ Sesión 08: Consumo de API y Estado Global (Context API + useEffect)
- **Objetivo**: Conectar el frontend en React con la API REST de Flask y Supabase, centralizar el estado de sesión y sincronizar tareas asíncronamente con ciclo de vida `useEffect`.
- **Acciones Realizadas**:
  1. **Proxy en Vite (`frontend/vite.config.js`)**:
     - Configurado proxy hacia `http://127.0.0.1:5000` para reenviar peticiones `/api/*` y evitar bloqueos por CORS en desarrollo local.
  2. **Servicio Centralizado HTTP (`frontend/src/services/api.js`)**:
     - `apiRequest()` con inyección automática de cabecera `Authorization: Bearer <token>` obtenida de `localStorage`.
     - `authService`: `login()`, `register()`, `getMe()`.
     - `taskService`: `getAll(params)`, `getById(id)`, `create(data)`, `update(id, data)`, `delete(id)`.
  3. **Estado Global con React Context (`frontend/src/context/AuthContext.jsx`)**:
     - `AuthContext`, `AuthProvider`, and hook personalizado `useAuth()`.
     - Persistencia de sesión (`token` y `user`) en `localStorage`.
     - Funciones de autenticación: `login()`, `register()`, `logout()`.
     - Fallback local de pruebas integrado para resiliencia si el backend está desconectado.
  4. **Envoltura Global en la Aplicación (`frontend/src/App.jsx`)**:
     - `<AuthProvider>` envolviendo todas las rutas para propagar el estado de usuario a toda la jerarquía de componentes.
  5. **Vistas Conectadas en Vivo**:
     - `Dashboard.jsx`: Carga tareas mediante `taskService.getAll()` dentro de `useEffect`, gestiona estados `loading` (con skeletons animados) y `error` con reintento, sincroniza creación con `taskService.create()`, toggle de estado optimista con `taskService.update()` y eliminación con `taskService.delete()`.
     - `Login.jsx` & `Register.jsx`: Integradas con `useAuth().login` y `useAuth().register`, manejando feedback de errores y redirección automática.
     - `Navbar.jsx`: Muestra información de usuario autenticado (`user.nombre`, `user.rol`), avatar monocromático y acción de `logout()`.
     - `ProtectedRoute.jsx`: Valida `isAuthenticated` y espera a `loading` antes de redirigir a `/login`.
  6. **Validación y Compilación**:
     - `npm.cmd run build` exitoso (**1.35s**) generando bundles limpios en `dist/`.
     - 20 pruebas unitarias del backend pasando al 100%.

---

### ⏳ Próxima Sesión: Sesión 09 - Dashboard y CRUD en React
- **Qué haremos**:
  1. Enriquecer el Dashboard con un CRUD interactivo completo para tareas.
  2. Implementar modales o formularios dedicados de edición rápida.
  3. Filtros avanzados por estado (`todas`, `pendiente`, `en_progreso`, `completada`) y prioridad (`baja`, `media`, `alta`).
  4. Contadores y métricas en vivo sincronizadas con la base de datos Supabase.
- **Lo que tú necesitas hacer**:
  - Ninguna acción externa requerida. Todo el desarrollo se realizará y validará localmente.
