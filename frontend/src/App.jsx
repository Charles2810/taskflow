import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Button from './components/Button';
import Input from './components/Input';
import Badge from './components/Badge';
import { Plus, Check, Trash2, ListTodo, CheckCircle, Clock, Sparkles } from 'lucide-react';

export default function App() {
  // Estado para la lista interactiva de tareas (Sesión 06: useState)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      titulo: 'Configurar entorno de desarrollo y Git',
      descripcion: 'Sesión 01: Repositorio en GitHub y herramientas instaladas.',
      estado: 'completada',
      prioridad: 'alta',
    },
    {
      id: 2,
      titulo: 'Crear primera API con Flask y MVC',
      descripcion: 'Sesión 02 y 03: Endpoints REST y Blueprints modulares.',
      estado: 'completada',
      prioridad: 'alta',
    },
    {
      id: 3,
      titulo: 'Conectar Supabase PostgreSQL y Auth JWT',
      descripcion: 'Sesión 04 y 05: Base de datos en la nube y tokens seguros.',
      estado: 'completada',
      prioridad: 'alta',
    },
    {
      id: 4,
      titulo: 'Construir interfaz en React + Vite + TailwindCSS',
      descripcion: 'Sesión 06: Componentes funcionales, props y useState.',
      estado: 'en_progreso',
      prioridad: 'alta',
    },
    {
      id: 5,
      titulo: 'Configurar React Router para navegación SPA',
      descripcion: 'Sesión 07: Rutas públicas, privadas y páginas protegidas.',
      estado: 'pendiente',
      prioridad: 'media',
    },
  ]);

  // Estados locales para el formulario de nueva tarea
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('media');
  const [filtro, setFiltro] = useState('todas');

  // Manejo de eventos: Crear tarea
  const handleCrearTarea = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    const nuevaTarea = {
      id: Date.now(),
      titulo: titulo.trim(),
      descripcion: descripcion.trim() || 'Sin descripción detallada',
      estado: 'pendiente',
      prioridad: prioridad,
    };

    setTasks([nuevaTarea, ...tasks]);
    setTitulo('');
    setDescripcion('');
    setPrioridad('media');
  };

  // Manejo de eventos: Alternar estado completada / pendiente
  const toggleEstado = (id) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const nuevoEstado = t.estado === 'completada' ? 'pendiente' : 'completada';
          return { ...t, estado: nuevoEstado };
        }
        return t;
      })
    );
  };

  // Manejo de eventos: Eliminar tarea
  const eliminarTarea = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Filtros derivados
  const tareasFiltradas = tasks.filter((t) => {
    if (filtro === 'pendientes') return t.estado === 'pendiente' || t.estado === 'en_progreso';
    if (filtro === 'completadas') return t.estado === 'completada';
    return true;
  });

  const completadasCount = tasks.filter((t) => t.estado === 'completada').length;
  const pendientesCount = tasks.filter((t) => t.estado === 'pendiente' || t.estado === 'en_progreso').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navbar con Props */}
      <Navbar
        appName="TaskFlow"
        taskCount={tasks.length}
        user={{ nombre: 'Charles Mendoza', rol: 'Desarrollador' }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner de Bienvenida / Sesión 06 */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-900/40 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Sesión 06: React + Vite + TailwindCSS
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Panel de Tareas y Componentes Funcionales
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Demostración interactiva de gestión de estado con <code className="text-indigo-400 font-mono">useState</code>, paso de propiedades mediante <code className="text-indigo-400 font-mono">props</code> y diseño responsivo con TailwindCSS.
              </p>
            </div>
            {/* Contadores rápidos */}
            <div className="flex items-center gap-3">
              <div className="bg-slate-900/80 px-4 py-3 rounded-xl border border-slate-800 text-center min-w-24">
                <p className="text-xs text-slate-400 font-medium">Pendientes</p>
                <p className="text-2xl font-extrabold text-amber-400 mt-0.5">{pendientesCount}</p>
              </div>
              <div className="bg-slate-900/80 px-4 py-3 rounded-xl border border-slate-800 text-center min-w-24">
                <p className="text-xs text-slate-400 font-medium">Completadas</p>
                <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">{completadasCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid: Formulario (Izquierda) + Listado (Derecha) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de Creación con Componentes */}
          <div className="lg:col-span-1">
            <Card
              title="Nueva Tarea"
              subtitle="Crea una tarea para actualizar el estado"
              className="sticky top-24"
            >
              <form onSubmit={handleCrearTarea} className="flex flex-col gap-4">
                <Input
                  label="Título de la Tarea"
                  placeholder="Ej. Crear vista de login en React"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Descripción
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detalles sobre lo que se debe hacer..."
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Prioridad
                  </label>
                  <select
                    value={prioridad}
                    onChange={(e) => setPrioridad(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>

                <Button type="submit" variant="primary" className="w-full mt-2">
                  <Plus className="w-4 h-4" />
                  Agregar Tarea
                </Button>
              </form>
            </Card>
          </div>

          {/* Listado de Tareas */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Barra de Filtros */}
            <div className="flex items-center justify-between gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setFiltro('todas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filtro === 'todas'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Todas ({tasks.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFiltro('pendientes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filtro === 'pendientes'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Pendientes ({pendientesCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFiltro('completadas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filtro === 'completadas'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Completadas ({completadasCount})
                </button>
              </div>

              <div className="text-xs text-slate-400 px-3 hidden sm:block">
                Mostrando {tareasFiltradas.length} tarea(s)
              </div>
            </div>

            {/* Tarjetas de Tareas */}
            {tareasFiltradas.length === 0 ? (
              <Card className="text-center py-12">
                <ListTodo className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h4 className="text-base font-semibold text-slate-300">No hay tareas en esta categoría</h4>
                <p className="text-xs text-slate-500 mt-1">Crea una nueva tarea para comenzar a organizarte.</p>
              </Card>
            ) : (
              tareasFiltradas.map((tarea) => {
                const isCompleted = tarea.estado === 'completada';

                return (
                  <div
                    key={tarea.id}
                    className={`p-4 rounded-xl border transition-all duration-200 bg-slate-900/60 backdrop-blur flex items-start justify-between gap-4 ${
                      isCompleted
                        ? 'border-emerald-500/20 bg-emerald-950/10 opacity-75'
                        : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    {/* Botón Checkbox */}
                    <button
                      type="button"
                      onClick={() => toggleEstado(tarea.id)}
                      className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'border-slate-700 hover:border-indigo-500 bg-slate-800/80 text-transparent'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <h4
                          className={`font-semibold text-sm ${
                            isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
                          }`}
                        >
                          {tarea.titulo}
                        </h4>
                        <Badge text={tarea.estado} type="status" />
                        <Badge text={tarea.prioridad} type="priority" />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{tarea.descripcion}</p>
                    </div>

                    {/* Botón Eliminar */}
                    <button
                      type="button"
                      onClick={() => eliminarTarea(tarea.id)}
                      className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all cursor-pointer flex-shrink-0"
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
      </main>
    </div>
  );
}
