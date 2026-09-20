import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { Plus, Check, Trash2, ListTodo } from 'lucide-react';

export default function Dashboard() {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : { nombre: 'Usuario', rol: 'usuario' };

  // Lista reactiva de tareas
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
      estado: 'completada',
      prioridad: 'alta',
    },
    {
      id: 5,
      titulo: 'Configurar React Router para navegación SPA',
      descripcion: 'Sesión 07: Rutas públicas, privadas y páginas protegidas.',
      estado: 'en_progreso',
      prioridad: 'alta',
    },
    {
      id: 6,
      titulo: 'Consumo de API y Manejo de Estado Global',
      descripcion: 'Sesión 08: Integrar servicios HTTP y sincronizar con backend.',
      estado: 'pendiente',
      prioridad: 'media',
    },
  ]);

  // Formulario
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('media');
  const [filtro, setFiltro] = useState('todas');

  const handleCrearTarea = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    const nuevaTarea = {
      id: Date.now(),
      titulo: titulo.trim(),
      descripcion: descripcion.trim() || 'Sin descripción adicional.',
      estado: 'pendiente',
      prioridad: prioridad,
    };

    setTasks([nuevaTarea, ...tasks]);
    setTitulo('');
    setDescripcion('');
    setPrioridad('media');
  };

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

  const eliminarTarea = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const tareasFiltradas = tasks.filter((t) => {
    if (filtro === 'pendientes') return t.estado === 'pendiente' || t.estado === 'en_progreso';
    if (filtro === 'completadas') return t.estado === 'completada';
    return true;
  });

  const completadasCount = tasks.filter((t) => t.estado === 'completada').length;
  const pendientesCount = tasks.filter((t) => t.estado === 'pendiente' || t.estado === 'en_progreso').length;

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabecera del Dashboard */}
      <div className="mb-8 pb-6 border-b border-zinc-800/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
            Dashboard Privado / {user.rol}
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Bienvenido, {user.nombre}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Gestiona tus tareas con persistencia y filtrado reactivo.
          </p>
        </div>

        {/* Métricas */}
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

      {/* Formulario + Listado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card
            title="Nueva Tarea"
            subtitle="Agrega una tarea al sistema"
            className="sticky top-20"
          >
            <form onSubmit={handleCrearTarea} className="flex flex-col gap-4">
              <Input
                label="Título"
                placeholder="Ej. Integrar Axios en React"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-400">Descripción</label>
                <textarea
                  rows={3}
                  placeholder="Detalles de la tarea..."
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

              <Button type="submit" variant="primary" className="w-full mt-2">
                <Plus className="w-4 h-4" />
                Guardar Tarea
              </Button>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
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

          {tareasFiltradas.length === 0 ? (
            <div className="border border-zinc-800 border-dashed rounded-lg p-12 text-center">
              <ListTodo className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-zinc-400">No hay tareas que mostrar</p>
              <p className="text-xs text-zinc-600 mt-0.5">Usa el formulario para crear una.</p>
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
                    onClick={() => toggleEstado(tarea.id)}
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
