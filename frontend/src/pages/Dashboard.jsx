import React, { useState, useEffect, useMemo } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import TaskModal from '../components/TaskModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { taskService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Plus,
  Check,
  Trash2,
  Edit3,
  Search,
  RefreshCw,
  AlertCircle,
  Clock,
  CheckCircle,
  Layers,
  LayoutGrid,
  Table as TableIcon,
  ChevronDown,
} from 'lucide-react';

/**
 * Dashboard y Panel de Administración CRUD Completo (Sesión 09)
 * Estilo minimalista y monocromático sin gradientes.
 */
export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Estados de datos
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState('');

  // Filtros y Búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todas');
  const [filtroPrioridad, setFiltroPrioridad] = useState('todas');
  const [vista, setVista] = useState('tabla'); // 'tabla' | 'tarjetas'

  // Estados para Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTask, setModalTask] = useState(null); // null para nueva tarea, objeto para edición
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Cargar tareas desde la API
  const fetchTasks = async () => {
    setError('');
    setIsSyncing(true);

    try {
      const data = await taskService.getAll();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn('Backend API no disponible, activando modo local/demo:', err.message);
      setError('Conexión con backend inactiva. Mostrando datos de demostración local.');

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
                estado: 'completada',
                prioridad: 'alta',
              },
              {
                id: '5',
                titulo: 'Panel de Administración y CRUD Completo',
                descripcion: 'Sesión 09: Métricas, tabla de tareas, modales y toasts.',
                estado: 'en_progreso',
                prioridad: 'alta',
              },
              {
                id: '6',
                titulo: 'Diseño Responsivo con Tailwind',
                descripcion: 'Sesión 10: Adaptabilidad móvil, tablet y escritorio.',
                estado: 'pendiente',
                prioridad: 'media',
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

  // 2. Crear o Editar Tarea
  const handleSaveTask = async (taskFormData) => {
    setIsSubmitting(true);

    try {
      if (modalTask) {
        // Modo Edición
        const updated = await taskService.update(modalTask.id, taskFormData);
        setTasks((prev) =>
          prev.map((t) => (t.id === modalTask.id ? { ...t, ...taskFormData } : t))
        );
        toast.success(`Tarea "${taskFormData.titulo}" actualizada.`);
      } else {
        // Modo Creación
        const payload = {
          ...taskFormData,
          user_id: user?.id || 'a0000000-0000-0000-0000-000000000001',
        };
        let created;
        try {
          created = await taskService.create(payload);
        } catch {
          // Fallback local
          created = {
            ...payload,
            id: Date.now().toString(),
            created_at: new Date().toISOString(),
          };
        }
        setTasks((prev) => [created, ...prev]);
        toast.success(`Tarea "${taskFormData.titulo}" creada con éxito.`);
      }
      setIsModalOpen(false);
      setModalTask(null);
    } catch (err) {
      toast.error(err.message || 'Error al guardar la tarea.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Cambiar estado rápido de tarea
  const handleCambiarEstado = async (id, nuevoEstado) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t))
    );

    try {
      await taskService.update(id, { estado: nuevoEstado });
      toast.info(`Estado actualizado a ${nuevoEstado}.`);
    } catch (err) {
      console.warn('Error al actualizar estado en backend:', err.message);
    }
  };

  // 4. Alternar completada/pendiente
  const handleToggleEstado = async (id, estadoActual) => {
    const nuevo = estadoActual === 'completada' ? 'pendiente' : 'completada';
    await handleCambiarEstado(id, nuevo);
  };

  // 5. Eliminar tarea
  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    setIsDeleting(true);

    try {
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      await taskService.delete(taskToDelete.id);
      toast.success(`Tarea "${taskToDelete.titulo}" eliminada.`);
    } catch (err) {
      console.warn('Error al eliminar en backend:', err.message);
      toast.success(`Tarea eliminada localmente.`);
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  // 6. Métricas y estadísticas
  const metrics = useMemo(() => {
    const total = tasks.length;
    const completadas = tasks.filter((t) => t.estado === 'completada').length;
    const enProgreso = tasks.filter((t) => t.estado === 'en_progreso').length;
    const pendientes = tasks.filter((t) => t.estado === 'pendiente').length;
    const porcentaje = total > 0 ? Math.round((completadas / total) * 100) : 0;

    return { total, completadas, enProgreso, pendientes, porcentaje };
  }, [tasks]);

  // 7. Filtrado dinámico
  const tareasFiltradas = useMemo(() => {
    return tasks.filter((t) => {
      // Búsqueda por texto
      const matchSearch =
        !searchTerm.trim() ||
        t.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por estado
      const matchEstado =
        filtroEstado === 'todas' || t.estado === filtroEstado;

      // Filtro por prioridad
      const matchPrioridad =
        filtroPrioridad === 'todas' || t.prioridad === filtroPrioridad;

      return matchSearch && matchEstado && matchPrioridad;
    });
  }, [tasks, searchTerm, filtroEstado, filtroPrioridad]);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Alerta si el backend está desconectado */}
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

      {/* Cabecera Principal */}
      <div className="mb-8 pb-6 border-b border-zinc-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1 flex items-center gap-2">
            <span>Sesión 09 / CRUD en React</span>
            {isSyncing && (
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                sincronizando...
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Panel de Tareas
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Gestión completa de tareas con persistencia en Supabase y feedback reactivo.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchTasks}
            disabled={isSyncing}
            className="px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Recargar tareas"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sincronizar</span>
          </button>

          <Button
            variant="primary"
            onClick={() => {
              setModalTask(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Nueva Tarea
          </Button>
        </div>
      </div>

      {/* 📊 Métricas y Estadísticas Monocromáticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Total Tareas</span>
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{metrics.total}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Registradas en sistema</div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Pendientes</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-200">{metrics.pendientes}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Por iniciar</div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">En Progreso</span>
            <RefreshCw className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-200">{metrics.enProgreso}</div>
          <div className="text-[11px] text-zinc-500 mt-1">En ejecución actual</div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Completadas</span>
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-100">{metrics.completadas}</div>
          <div className="text-[11px] text-zinc-500 mt-1 flex items-center justify-between">
            <span>Tasa de avance</span>
            <span className="font-mono text-zinc-300 font-semibold">{metrics.porcentaje}%</span>
          </div>
        </div>
      </div>

      {/* Barra de Progreso Monocromática */}
      <div className="mb-8 bg-zinc-950 border border-zinc-800 p-3.5 rounded-lg">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-medium text-zinc-300">Progreso General del Proyecto</span>
          <span className="font-mono text-zinc-400">
            {metrics.completadas} de {metrics.total} tareas ({metrics.porcentaje}%)
          </span>
        </div>
        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${metrics.porcentaje}%` }}
          />
        </div>
      </div>

      {/* 🔍 Barra de Búsqueda, Filtros y Vistas */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Buscador */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por título o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          {/* Filtro por Estado */}
          <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 p-1 rounded-md">
            {[
              { id: 'todas', label: 'Todas' },
              { id: 'pendiente', label: 'Pendientes' },
              { id: 'en_progreso', label: 'En Progreso' },
              { id: 'completada', label: 'Completadas' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFiltroEstado(tab.id)}
                className={`px-2.5 py-1 text-[11px] rounded transition-colors font-medium cursor-pointer ${
                  filtroEstado === tab.id
                    ? 'bg-white text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filtro por Prioridad */}
          <select
            value={filtroPrioridad}
            onChange={(e) => setFiltroPrioridad(e.target.value)}
            className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-zinc-300 focus:outline-none focus:border-zinc-500 transition-colors"
          >
            <option value="todas">Todas las prioridades</option>
            <option value="alta">Prioridad Alta</option>
            <option value="media">Prioridad Media</option>
            <option value="baja">Prioridad Baja</option>
          </select>
        </div>

        {/* Selector de Vista: Tabla / Tarjetas */}
        <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 p-1 rounded-md self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setVista('tabla')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              vista === 'tabla'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="Vista de Tabla"
          >
            <TableIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setVista('tarjetas')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              vista === 'tarjetas'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="Vista de Tarjetas"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 📋 Contenido de Tareas (Carga, Vacío o Listado) */}
      {loading ? (
        <div className="space-y-3 py-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-zinc-800/80 bg-zinc-900/30 animate-pulse flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-5 h-5 rounded bg-zinc-800"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
                  <div className="h-3 bg-zinc-800/50 rounded w-1/2"></div>
                </div>
              </div>
              <div className="w-20 h-6 bg-zinc-800 rounded"></div>
            </div>
          ))}
        </div>
      ) : tareasFiltradas.length === 0 ? (
        <div className="border border-zinc-800 border-dashed rounded-lg p-16 text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-3 text-zinc-500">
            <Search className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-zinc-300">No se encontraron tareas</p>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            {searchTerm || filtroEstado !== 'todas' || filtroPrioridad !== 'todas'
              ? 'Intenta ajustar los filtros de búsqueda para ver más resultados.'
              : 'Empieza agregando tu primera tarea con el botón "Nueva Tarea".'}
          </p>
          {(searchTerm || filtroEstado !== 'todas' || filtroPrioridad !== 'todas') && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setFiltroEstado('todas');
                setFiltroPrioridad('todas');
              }}
              className="mt-4 px-3 py-1.5 text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded transition-colors cursor-pointer"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      ) : vista === 'tabla' ? (
        /* VISTA DE TABLA (Sesión 09) */
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400 font-mono uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4 w-12 text-center">Check</th>
                  <th className="py-3 px-4">Tarea & Descripción</th>
                  <th className="py-3 px-4 w-32">Prioridad</th>
                  <th className="py-3 px-4 w-40">Estado</th>
                  <th className="py-3 px-4 w-28 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {tareasFiltradas.map((tarea) => {
                  const isCompleted = tarea.estado === 'completada';

                  return (
                    <tr
                      key={tarea.id}
                      className={`hover:bg-zinc-900/40 transition-colors ${
                        isCompleted ? 'opacity-65' : ''
                      }`}
                    >
                      {/* Checkbox de toggle rápido */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleEstado(tarea.id, tarea.estado)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer mx-auto ${
                            isCompleted
                              ? 'bg-white border-white text-zinc-950'
                              : 'border-zinc-700 hover:border-zinc-400 bg-zinc-900 text-transparent'
                          }`}
                          title={isCompleted ? 'Marcar pendiente' : 'Marcar completada'}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </button>
                      </td>

                      {/* Tarea y Descripción */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span
                            className={`text-sm font-medium ${
                              isCompleted ? 'line-through text-zinc-400' : 'text-zinc-100'
                            }`}
                          >
                            {tarea.titulo}
                          </span>
                          {tarea.descripcion && (
                            <span className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                              {tarea.descripcion}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Prioridad */}
                      <td className="py-3.5 px-4">
                        <Badge text={tarea.prioridad} type="priority" />
                      </td>

                      {/* Estado con Selector Rápido */}
                      <td className="py-3.5 px-4">
                        <select
                          value={tarea.estado}
                          onChange={(e) => handleCambiarEstado(tarea.id, e.target.value)}
                          className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[11px] text-zinc-300 focus:outline-none focus:border-zinc-500 transition-colors cursor-pointer"
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="en_progreso">En progreso</option>
                          <option value="completada">Completada</option>
                        </select>
                      </td>

                      {/* Acciones: Editar y Eliminar */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setModalTask(tarea);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                            title="Editar tarea"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setTaskToDelete(tarea);
                              setDeleteModalOpen(true);
                            }}
                            className="p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                            title="Eliminar tarea"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VISTA DE TARJETAS (Sesión 09) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tareasFiltradas.map((tarea) => {
            const isCompleted = tarea.estado === 'completada';

            return (
              <div
                key={tarea.id}
                className={`p-4 rounded-lg border bg-zinc-950 flex flex-col justify-between transition-colors ${
                  isCompleted
                    ? 'border-zinc-800/60 opacity-65'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => handleToggleEstado(tarea.id, tarea.estado)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer mt-0.5 ${
                        isCompleted
                          ? 'bg-white border-white text-zinc-950'
                          : 'border-zinc-700 hover:border-zinc-400 bg-zinc-900 text-transparent'
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </button>
                    <div className="flex items-center gap-1.5">
                      <Badge text={tarea.estado} type="status" />
                      <Badge text={tarea.prioridad} type="priority" />
                    </div>
                  </div>

                  <h3
                    className={`text-sm font-semibold mb-1 ${
                      isCompleted ? 'line-through text-zinc-400' : 'text-zinc-100'
                    }`}
                  >
                    {tarea.titulo}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {tarea.descripcion || 'Sin descripción.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <select
                    value={tarea.estado}
                    onChange={(e) => handleCambiarEstado(tarea.id, e.target.value)}
                    className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[11px] text-zinc-300 focus:outline-none"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en_progreso">En progreso</option>
                    <option value="completada">Completada</option>
                  </select>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setModalTask(tarea);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                      title="Editar"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTaskToDelete(tarea);
                        setDeleteModalOpen(true);
                      }}
                      className="p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal para Crear / Editar Tarea */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setModalTask(null);
        }}
        onSubmit={handleSaveTask}
        initialTask={modalTask}
        isSubmitting={isSubmitting}
      />

      {/* Modal para Confirmar Eliminación */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.titulo || ''}
        isDeleting={isDeleting}
      />
    </div>
  );
}

