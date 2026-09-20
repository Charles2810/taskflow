import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import Button from './Button';
import Input from './Input';

/**
 * Modal controlado para Creación y Edición de Tareas (Sesión 09)
 * Estilo minimalista y monocromático con validación en tiempo real.
 */
export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialTask = null,
  isSubmitting = false,
}) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('media');
  const [estado, setEstado] = useState('pendiente');
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(initialTask);

  // Inicializar campos al abrir o cambiar la tarea seleccionada
  useEffect(() => {
    if (initialTask) {
      setTitulo(initialTask.titulo || '');
      setDescripcion(initialTask.descripcion || '');
      setPrioridad(initialTask.prioridad || 'media');
      setEstado(initialTask.estado || 'pendiente');
    } else {
      setTitulo('');
      setDescripcion('');
      setPrioridad('media');
      setEstado('pendiente');
    }
    setErrors({});
  }, [initialTask, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!titulo.trim()) {
      errs.titulo = 'El título es obligatorio.';
    } else if (titulo.trim().length < 3) {
      errs.titulo = 'El título debe tener al menos 3 caracteres.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      prioridad,
      estado,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-lg w-full p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              {isEditMode ? 'Editar Tarea' : 'Nueva Tarea'}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isEditMode
                ? 'Modifica los campos y guarda los cambios en el servidor.'
                : 'Completa la información para agregar una nueva tarea a la lista.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 p-1.5 rounded transition-colors cursor-pointer"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario Controlado */}
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <div>
            <Input
              label="Título de la tarea"
              placeholder="Ej. Desarrollar módulo de autenticación"
              value={titulo}
              onChange={(e) => {
                setTitulo(e.target.value);
                if (errors.titulo) setErrors((prev) => ({ ...prev, titulo: null }));
              }}
              required
            />
            {errors.titulo && (
              <p className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-zinc-300" />
                {errors.titulo}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Descripción</label>
            <textarea
              rows={3}
              placeholder="Describe los pasos o requerimientos..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-400">Estado</label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_progreso">En progreso</option>
                <option value="completada">Completada</option>
              </select>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Guardando...'
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {isEditMode ? 'Guardar Cambios' : 'Crear Tarea'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
