# Guía de Despliegue del Frontend en Cloudflare Pages (Sesión 13)

Esta guía detalla el procedimiento paso a paso para publicar el frontend React + Vite en la red CDN global de **Cloudflare Pages**.

---

## 📋 Parámetros de Configuración en Cloudflare Pages

Al crear un nuevo proyecto en **Cloudflare Pages** (**Dashboard > Workers & Pages > Create application > Pages > Connect to Git**):

| Parámetro | Valor a Configurar |
|---|---|
| **Project name** | `taskflow` (o el nombre que elijas) |
| **Production branch** | `main` |
| **Framework preset** | `Vite` (o `None`) |
| **Root directory** | `frontend` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

---

## 🔑 Variables de Entorno (Environment Variables)

En la sección **Environment variables (advanced)**, agrega la variable que conecta el frontend con la API de Render:

| Variable | Valor |
|---|---|
| `VITE_API_URL` | `https://taskflow-zt2r.onrender.com/api` |

> [!NOTE]
> Esta variable asegura que el frontend en la nube haga todas sus peticiones HTTP directamente a tu API Flask en Render (`https://taskflow-zt2r.onrender.com`).

---

## 🧭 Enrutamiento SPA sin Errores 404 (`_redirects`)

TaskFlow ya incluye el archivo `frontend/public/_redirects` con la regla:
```text
/*    /index.html   200
```
Esto garantiza que al recargar páginas como `/dashboard` o `/login`, Cloudflare Pages redirija internamente a `index.html` sin mostrar errores 404.

---

## 🚀 Pasos para Desplegar

1. Ingresa a [https://pages.cloudflare.com](https://pages.cloudflare.com) (o tu panel de Cloudflare).
2. Ve a **Workers & Pages** → **Create application** → pestaña **Pages** → **Connect to Git**.
3. Selecciona tu repositorio de GitHub `Charles2810/taskflow`.
4. Configura los campos:
   - **Root directory**: `frontend`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Expande **Environment variables** y añade:
   - `VITE_API_URL` = `https://taskflow-zt2r.onrender.com/api`
6. Haz clic en **Save and Deploy**.
7. Cloudflare Pages compilará la aplicación y en menos de 1 minuto te dará tu URL global con certificado SSL automático (`https://taskflow-xxx.pages.dev`).
