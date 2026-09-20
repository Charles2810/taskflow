# 🚀 TaskFlow

TaskFlow es una aplicación web full-stack profesional para la gestión moderna y colaborativa de tareas, desarrollada como proyecto formativo para la materia **Programación Web II (UPDS)** bajo la guía del **Ing. Jim Requena**.

---

## 📌 Arquitectura del Proyecto

TaskFlow utiliza una arquitectura desacoplada y moderna:

```text
taskflow/
├── backend/          # API REST con Python, Flask y Supabase
│   ├── app/          # Módulos MVC (Modelos, Controladores, Rutas)
│   ├── requirements.txt
│   └── run.py
├── frontend/         # SPA interactiva con React, Vite y TailwindCSS
│   ├── src/
│   └── package.json
├── docs/             # Documentación y guías del curso
│   └── guias/        # Guías en PDF de las 14 sesiones
├── .gitignore
├── README.md
└── SCRATCHPAD.md     # Bitácora viva de avance y checklists por sesión
```

---

## 🛠️ Stack Tecnológico

- **Backend**: Python 3.12, Flask, Flask-CORS, PyJWT, Supabase-py
- **Base de Datos & Auth**: PostgreSQL en [Supabase](https://supabase.com)
- **Frontend**: React 18 / 19, Vite, TailwindCSS, React Router, Lucide Icons
- **Despliegue Backend**: [Render](https://render.com)
- **Despliegue Frontend**: [Cloudflare Pages](https://pages.cloudflare.com)
- **Control de Versiones**: Git & GitHub

## 🌐 Despliegues en Vivo (Producción)

- **Backend API (Render)**: [`https://taskflow-zt2r.onrender.com`](https://taskflow-zt2r.onrender.com)
- **Base de Datos (Supabase)**: PostgreSQL alojado en la nube
- **Frontend (Cloudflare Pages)**: Listo para despliegue continuo desde rama `main`

---

## 🚦 Roadmap de Sesiones

| Sesión | Tema | Estado |
|---|---|:---:|
| **01** | Entorno de Desarrollo, Git, GitHub y Estructura Base | ✅ Completado |
| **02** | Python + Flask: Creación de la Primera API REST | ✅ Completado |
| **03** | Estructura MVC y Operaciones CRUD | ✅ Completado |
| **04** | Base de Datos PostgreSQL con Supabase | ✅ Completado |
| **05** | Autenticación y Autorización (JWT) | ✅ Completado |
| **06** | Setup de Frontend con React + Vite | ✅ Completado |
| **07** | React Router y Navegación SPA | ✅ Completado |
| **08** | Consumo de API y Manejo de Estado | ✅ Completado |
| **09** | Dashboard y Operaciones CRUD en React | ✅ Completado |
| **10** | Diseño Responsivo con TailwindCSS | ✅ Completado |
| **11** | Formularios y Validación en el Frontend | ✅ Completado |
| **12** | Despliegue del Backend en Render | ✅ Completado |
| **13** | Despliegue del Frontend en Cloudflare Pages | ✅ Completado |
| **14** | Integración Final, Pruebas End-to-End y Entrega | ⏳ Siguiente sesión |

---

## 📖 Instrucciones de Uso

Para ver el progreso detallado, instrucciones paso a paso y las tareas pendientes que debes realizar en cada sesión, consulta el archivo [SCRATCHPAD.md](SCRATCHPAD.md).

