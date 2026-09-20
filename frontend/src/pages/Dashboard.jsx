import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { taskService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, Check, Trash2, ListTodo, RefreshCw, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  // Estados de datos y ciclo de vida asíncrono (Sesión 08: fetch con useEffect)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  // Estados del formulario y filtros
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('media');
  const [filtro, setFiltro] = useState('todas');
  const [submitting, setSubmitting] = useState(false);

  // 1. Cargar tareas desde la API con useEffect (Sesión 08)
  const fetchTasks = async () => {
    setError('');
    setIsSyncing(true);

    try {
      const data = await taskService.getAll();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn('Backend API no disponible, activando modo local/demo:', err.message);
      setError('No se pudo conectar con el backend (usando datos locales de demostración).');

      // Semillas locales si el backend no está corriendo
      setTasks((prev) =>
        prev.length > 0
          ? prev
          : [
              {
                id: '1',
                titulo: 'Configurar entorno y Git',
                descripcion: 'Sesión 01: Repositorio e instalaciones iniciales.',
                estado: 'completada',
                prioridad: 'alta',
              },
              {
                id: '2',
                titulo: 'Construir API REST con Flask',
                descripcion: 'Sesión 02 y 03: Arquitectura MVC con Blueprints.',
                estado: 'completada',
                prioridad: 'alta',
              },
              {
                id: '3',
                titulo: 'Conectar Supabase PostgreSQL en la nube',
                descripcion: 'Sesión 04: Base de datos real con tablas y RLS.',
                estado: 'completada',
                prioridad: 'alta',
              },
              {
                id: '4',
                titulo: 'Consumir API REST desde React con useEffect',
                descripcion: 'Sesión 08: Llamadas HTTP y AuthContext global.',
                estado: 'en_progreso',
                prioridad: 'alta',
              },
            ]
      );
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Crear Tarea (POST /api/tasks)
  const handleCrearTarea = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    setSubmitting(true);
    const payload = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim() || 'Sin descripción detallada.',
      prioridad: prioridad,
      estado: 'pendiente',
      user_id: user?.id || 'a0000000-0000-0000-0000-000000000001',
    };

    try {
      const nueva = await taskService.create(payload);
      setTasks((prev) => [nueva, ...prev]);
      setTitulo('');
      setDescripcion('');
      setPrioridad('media');
    } catch (err) {
      // Fallback local
      const localTask = {
        ...payload,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      setTasks((prev) => [localTask, ...prev]);
      setTitulo('');
      setDescripcion('');
      setPrioridad('media');
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Alternar estado (PUT /api/tasks/:id)
  const toggleEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 'completada' ? 'pendiente' : 'completada';

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t))
    );

    try {
      await taskService.update(id, { estado: nuevoEstado });
    } catch (err) {
      console.warn('Error al sincronizar actualización con backend:', err.message);
    }
  };

  // 4. Eliminar Tarea (DELETE /api/tasks/:id)
  const eliminarTarea = async (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await taskService.delete(id);
    } catch (err) {
      console.warn('Error al sincronizar eliminación con backend:', err.message);
    }
  };

  // Filtros y Métricas derivadas
  const tareasFiltradas = tasks.filter((t) => {
    if (filtro === 'pendientes') return t.estado === 'pendiente' || t.estado === 'en_progreso';
    if (filtro === 'completadas') return t.estado === 'completada';
    return true;
  });

  const completadasCount = tasks.filter((t) => t.estado === 'completada').length;
  const pendientesCount = tasks.filter((t) => t.estado === 'pendiente' || t.estado === 'en_progreso').length;

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Alerta si está en modo offline/fallback */}
      {error && (
        <div className="mb-6 p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-zinc-300 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={fetchTasks}
            className="text-white hover:underline flex items-center gap-1 font-mono text-[11px] cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            Reintentar
          </button>
        </div>
      )}

      {/* Cabecera del Dashboard */}
      <div className="mb-8 pb-6 border-b border-zinc-800/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1 flex items-center gap-2">
            <span>Sesión 08 / Conexión API REST</span>
            {isSyncing && (
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                sincronizando...
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Dashboard — {user?.nombre || 'Usuario'}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Datos sincronizados en tiempo real mediante fetch y AuthContext.
          </p>
        </div>

        {/* Métricas Monocromáticas */}
        <div className="flex items-center gap-2">
          <div className="bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-md min-w-28 text-left">
            <span className="text-[11px] text-zinc-500 font-mono block">Pendientes</span>
            <span className="text-lg font-mono font-semibold text-zinc-100">{pendientesCount}</span>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-md min-w-28 text-left">
            <span className="text-[11px] text-zinc-500 font-mono block">Completadas</span>
            <span className="text-lg font-mono font-semibold text-zinc-100">{completadasCount}</span>
          </div>
        </div>
      </div>

      {/* Layout Principal: Formulario + Lista */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario de Creación */}
        <div className="lg:col-span-1">
          <Card
            title="Nueva Tarea"
            subtitle="Enviar POST a la API de Flask"
            className="sticky top-20"
          >
            <form onSubmit={handleCrearTarea} className="flex flex-col gap-4">
              <Input
                label="Título"
                placeholder="Ej. Integrar servicios HTTP"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-400">Descripción</label>
                <textarea
                  rows={3}
                  placeholder="Detalles sobre lo que se debe hacer..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-400">Prioridad</label>
                <select
                  value={prioridad}
                  onChange={(e) => setPrioridad(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              <Button type="submit" variant="primary" disabled={submitting} className="w-full mt-2">
                <Plus className="w-4 h-4" />
                {submitting ? 'Guardando...' : 'Crear Tarea'}
              </Button>
            </form>
          </Card>
        </div>

        {/* Listado con useEffect y Loading */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Barra de Filtros */}
          <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFiltro('todas')}
                className={`px-3 py-1.5 rounded text-xs transition-colors font-medium ${
                  filtro === 'todas'
                    ? 'bg-white text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Todas ({tasks.length})
              </button>
              <button
                type="button"
                onClick={() => setFiltro('pendientes')}
                className={`px-3 py-1.5 rounded text-xs transition-colors font-medium ${
                  filtro === 'pendientes'
                    ? 'bg-white text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Pendientes ({pendientesCount})
              </button>
              <button
                type="button"
                onClick={() => setFiltro('completadas')}
                className={`px-3 py-1.5 rounded text-xs transition-colors font-medium ${
                  filtro === 'completadas'
                    ? 'bg-white text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                Completadas ({completadasCount})
              </button>
            </div>

            <span className="text-xs text-zinc-500 font-mono hidden sm:block">
              {tareasFiltradas.length} item(s)
            </span>
          </div>

          {/* Estado de Carga (Loading) */}
          {loading ? (
            <div className="space-y-3 py-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-zinc-800/60 bg-zinc-900/40 animate-pulse flex items-start gap-4"
                >
                  <div className="w-5 h-5 rounded bg-zinc-800 mt-0.5"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-zinc-800 rounded w-1/3"></div>
                    <div className="h-3 bg-zinc-800/60 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : tareasFiltradas.length === 0 ? (
            <div className="border border-zinc-800 border-dashed rounded-lg p-12 text-center">
              <ListTodo className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-zinc-400">Sin tareas registradas</p>
              <p className="text-xs text-zinc-600 mt-0.5">Crea tu primera tarea para sincronizarla.</p>
            </div>
          ) : (
            tareasFiltradas.map((tarea) => {
              const isCompleted = tarea.estado === 'completada';

              return (
                <div
                  key={tarea.id}
                  className={`p-4 rounded-lg border transition-colors bg-zinc-900/60 flex items-start justify-between gap-4 ${
                    isCompleted
                      ? 'border-zinc-800/60 opacity-60'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleEstado(tarea.id, tarea.estado)}
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ${
                      isCompleted
                        ? 'bg-white border-white text-zinc-950'
                        : 'border-zinc-700 hover:border-zinc-400 bg-zinc-950 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`text-sm font-medium ${
                          isCompleted ? 'line-through text-zinc-500' : 'text-zinc-100'
                        }`}
                      >
                        {tarea.titulo}
                      </span>
                      <Badge text={tarea.estado} type="status" />
                      <Badge text={tarea.prioridad} type="priority" />
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{tarea.descripcion}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => eliminarTarea(tarea.id)}
                    className="text-zinc-500 hover:text-zinc-200 p-1.5 rounded hover:bg-zinc-800 transition-colors cursor-pointer flex-shrink-0"
                    title="Eliminar tarea"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
