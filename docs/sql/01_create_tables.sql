-- =====================================================================
-- TaskFlow - Script de Creación de Base de Datos en Supabase (Sesión 04)
-- =====================================================================

-- 1. Extensión para generación de UUIDs (generalmente activa en Supabase)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    rol VARCHAR(20) DEFAULT 'usuario' CHECK (rol IN ('usuario', 'administrador')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabla de Tareas
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT DEFAULT '',
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_progreso', 'completada')),
    prioridad VARCHAR(20) DEFAULT 'media' CHECK (prioridad IN ('baja', 'media', 'alta')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Índices para optimizar búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_estado ON public.tasks(estado);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- 5. Habilitar Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- 6. Políticas de acceso RLS
-- Permitir acceso público / anon / authenticated para la API de TaskFlow
DROP POLICY IF EXISTS "Permitir select usuarios" ON public.users;
CREATE POLICY "Permitir select usuarios" ON public.users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir insert usuarios" ON public.users;
CREATE POLICY "Permitir insert usuarios" ON public.users FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir update usuarios" ON public.users;
CREATE POLICY "Permitir update usuarios" ON public.users FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir delete usuarios" ON public.users;
CREATE POLICY "Permitir delete usuarios" ON public.users FOR DELETE USING (true);

DROP POLICY IF EXISTS "Permitir select tareas" ON public.tasks;
CREATE POLICY "Permitir select tareas" ON public.tasks FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir insert tareas" ON public.tasks;
CREATE POLICY "Permitir insert tareas" ON public.tasks FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir update tareas" ON public.tasks;
CREATE POLICY "Permitir update tareas" ON public.tasks FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir delete tareas" ON public.tasks;
CREATE POLICY "Permitir delete tareas" ON public.tasks FOR DELETE USING (true);

-- 7. Datos de prueba iniciales (Seeds)
INSERT INTO public.users (id, nombre, email, rol)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'Administrador TaskFlow', 'admin@taskflow.com', 'administrador'),
    ('b0000000-0000-0000-0000-000000000002', 'Juan Pérez', 'juan@email.com', 'usuario')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.tasks (titulo, descripcion, estado, prioridad, user_id)
VALUES 
    ('Configurar entorno y Git', 'Instalar herramientas e inicializar repositorio TaskFlow', 'completada', 'alta', 'a0000000-0000-0000-0000-000000000001'),
    ('Implementar arquitectura MVC', 'Separar backend en modelos, controladores y rutas con Blueprints', 'completada', 'alta', 'a0000000-0000-0000-0000-000000000001'),
    ('Conectar Supabase PostgreSQL', 'Crear tablas en la nube y conectar con Flask', 'en_progreso', 'alta', 'a0000000-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;
