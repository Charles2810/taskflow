# 🎤 Guion de Presentación y Defensa Académica: TaskFlow
> **Materia**: Programación Web II | UPDS  
> **Docente**: Ing. Jim Requena  
> **Proyecto**: TaskFlow - Plataforma Full Stack de Gestión de Tareas  
> **Autor**: Charles2810  

---

## ⏱️ Pitch de 3 Minutos (Feria de Proyectos / Defensa)

### Minuto 0:00 - 0:45 | Introducción y Problema
> *"Buenos días estimado docente y compañeros. Hoy les presento **TaskFlow**, una solución web full stack diseñada para resolver la fragmentación y la sobrecarga visual en la gestión colaborativa de tareas cotidianas.  
> Muchas herramientas actuales sufren de interfaces saturadas con tiempos de carga lentos y arquitecturas monolíticas difíciles de escalar. En TaskFlow implementamos una arquitectura desacoplada moderna de grado profesional, con un frontend Single Page Application alojado en la red perimetral de Cloudflare Pages y un backend RESTful en Render conectado a una base de datos relacional PostgreSQL en Supabase."*

---

### Minuto 0:45 - 1:45 | Arquitectura y Stack Tecnológico
> *"El proyecto está construido bajo los más estrictos estándares de la industria y las 14 sesiones de la materia:
> 1. **Frontend**: Desarrollado con **React y Vite**, estilizado con **Tailwind CSS** bajo un diseño estrictamente **minimalista y monocromático** que elimina distracciones. Cuenta con enrutamiento dinámico mediante React Router, gestión de estado con React Context API, validaciones en tiempo real y notificaciones Toast interactivas.
> 2. **Backend**: Desarrollado en **Python con Flask** siguiendo el patrón de arquitectura **MVC (Modelo-Vista-Controlador)** con Blueprints modulares (`users_bp`, `tasks_bp`, `auth_bp`).
> 3. **Seguridad**: Autenticación sin estado basada en **JSON Web Tokens (JWT)** con contraseñas encriptadas con `Werkzeug/Bcrypt` y control de acceso basado en roles (`@token_required`, `@admin_required`).
> 4. **Base de Datos**: PostgreSQL en **Supabase** con políticas de seguridad a nivel de fila (**RLS - Row Level Security**), índices optimizados y constraints relacionales.
> 5. **Producción**: Frontend en CDN global con **Cloudflare Pages** con reglas de reescritura SPA y Backend desplegado en **Render** servido por **Gunicorn**."*

---

### Minuto 1:45 - 2:45 | Demostración en Vivo (Demo Interactiva)
> *(Dirigirse a la pantalla mostrando `https://taskflow-bco.pages.dev`)*:
> 1. **Acceso Seguro**: *"Iniciamos sesión con una cuenta protegida por JWT. Noten cómo el formulario valida en tiempo real la sintaxis del correo y los requisitos de seguridad."*
> 2. **Dashboard y Métricas**: *"Al autenticarnos, el panel de control calcula en tiempo real métricas de productividad: total de tareas, pendientes, en progreso y completadas, junto con una barra de progreso porcentual."*
> 3. **Operaciones CRUD**: *"Creamos una nueva tarea con prioridad alta. Observen la notificación toast inmediata. Podemos alternar entre la vista de tabla responsiva o la vista en tarjetas, filtrar por estado o buscar por texto sin recargar la página."*
> 4. **Eliminación Controlada**: *"Al eliminar una tarea, el modal de confirmación evita pérdidas accidentales de información."*

---

### Minuto 2:45 - 3:00 | Conclusión y Cierre
> *"TaskFlow demuestra cómo una separación limpia entre cliente y servidor, combinada con servicios cloud modernos y buenas prácticas de código limpio, permite construir aplicaciones web de alto rendimiento, seguras y listas para producción en el mundo real. Quedo atento a sus consultas. ¡Muchas gracias!"*

---

## 🧭 Guion Paso a Paso para la Demo en Vivo

| Paso | Acción en la Demo | Qué Resaltar al Jurado |
|---|---|---|
| **1** | Abrir [`https://taskflow-bco.pages.dev`](https://taskflow-bco.pages.dev) | Certificado SSL automático de Cloudflare y carga ultrarrápida desde el CDN. |
| **2** | Mostrar Landing Page y Navbar | Diseño monocromático minimalista, modo oscuro y navegación fluida. |
| **3** | Clic en "Crear Cuenta" (`/register`) | Medidor de seguridad de contraseña y validación en tiempo real de campos. |
| **4** | Iniciar Sesión (`/login`) | Token JWT generado por Render y persistido de forma segura en `localStorage`. |
| **5** | Explorar el Dashboard (`/dashboard`) | 4 tarjetas de métricas reactivas y barra de progreso calculada en el cliente. |
| **6** | Crear nueva tarea | Selector interactivo de prioridad, validación de caracteres (100/300) y Toast. |
| **7** | Alternar vista Tabla / Tarjetas | Adaptabilidad de la interfaz en modo responsivo (pruébalo redimensionando la ventana). |
| **8** | Filtrar por estado y buscar | Filtrado instantáneo en memoria sin latencia. |
| **9** | Cerrar Sesión | Destrucción del token JWT y redirección automática protegida. |

---

## ❓ Preguntas Frecuentes del Jurado Docente y Respuestas Justificadas

### P1: ¿Por qué eligieron una arquitectura desacoplada en lugar de renderizar HTML con Jinja2 en Flask?
> **Respuesta**: *"Porque separar el frontend del backend proporciona una clara separación de responsabilidades (SoC). Permite que la API de Flask sea consumida no solo por la aplicación web en React, sino potencialmente por aplicaciones móviles o servicios de terceros. Además, alojar el frontend en Cloudflare Pages aprovecha la red CDN mundial para servir activos estáticos en milisegundos, reduciendo el consumo de recursos en el servidor backend."*

### P2: ¿Cómo protegen las rutas en el backend y cómo evitan que un usuario modifique datos ajenos?
> **Respuesta**: *"Utilizamos el decorador `@token_required` en Flask que intercepta las peticiones HTTP, extrae el Bearer token de la cabecera `Authorization`, y decodifica el JWT validando su firma y expiración. Adicionalmente, en la base de datos PostgreSQL de Supabase habilitamos **Row Level Security (RLS)** para garantizar que a nivel de base de datos cada usuario solo tenga acceso a sus propios registros."*

### P3: ¿Por qué es necesario el archivo `_redirects` en Cloudflare Pages?
> **Respuesta**: *"React Router maneja las rutas en el lado del cliente (Client-Side Routing). Cuando un usuario entra directamente a `https://taskflow-bco.pages.dev/dashboard` o recarga la página con F5, el servidor de Cloudflare busca un archivo físico llamado `dashboard/index.html`. Al no existir, devolvería un error 404. La regla `/* /index.html 200` le indica a Cloudflare que reenvíe internamente toda petición al `index.html` principal con estado HTTP 200, permitiendo que React Router lea la URL y monte el componente correspondiente sin interrupciones."*

### P4: ¿Cómo manejan el problema de los arranques en frío (cold starts) de Render en el plan gratuito?
> **Respuesta**: *"Render suspende los servicios gratuitos tras 15 minutos de inactividad. En el frontend de TaskFlow implementamos manejo explícito de estados de carga (`loading skeletons`), spinners interactivos con avisos de conexión y reintentos automáticos en caso de que la primera petición tome unos segundos en despertar al servidor."*

---

## 🛡️ Plan B (Plan de Contingencia para la Feria)

Si durante la presentación en la universidad hay problemas de internet o el Wi-Fi falla:
1. **Entorno Local**: Tener siempre corriendo el backend local en `http://127.0.0.1:5000` (`python run.py`) y el frontend en `http://localhost:5173` (`npm run dev`). El frontend tiene un proxy listo hacia el localhost.
2. **Cuentas Demo Preconfiguradas**:
   - `admin@taskflow.com` / `Admin123!`
   - `demo@taskflow.com` / `Demo123!`
3. **Respaldo Multimedia**: Guardar una grabación de pantalla en video de 2 minutos mostrando todo el flujo funcional en un pendrive o en el escritorio.
