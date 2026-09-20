import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle, RefreshCw, Flag } from 'lucide-react';
import Button from './Button';
import Input from './Input';

/**
 * Modal controlado para Creación y Edición de Tareas con Validación Avanzada (Sesión 11)
 * Estilo minimalista y monocromático con validación en tiempo real y campos complejos.
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
  const [touched, setTouched] = useState({ titulo: false, descripcion: false });
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
    setTouched({ titulo: false, descripcion: false });
    setErrors({});
  }, [initialTask, isOpen]);

  if (!isOpen) return null;

  // Validación de campos
  const validate = () => {
    const errs = {};
    const trimmedTitle = titulo.trim();

    if (!trimmedTitle) {
      errs.titulo = 'El título de la tarea es obligatorio.';
    } else if (trimmedTitle.length < 3) {
      errs.titulo = 'El título debe tener al menos 3 caracteres.';
    } else if (trimmedTitle.length > 100) {
      errs.titulo = 'El título no puede superar los 100 caracteres.';
    }

    if (descripcion.length > 300) {
      errs.descripcion = 'La descripción no puede exceder los 300 caracteres.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ titulo: true, descripcion: true });

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
        className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl relative"
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
                ? 'Actualiza los campos de la tarea y guarda los cambios.'
                : 'Completa la información con validación en tiempo real.'}
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
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4" noValidate>
          {/* Campo: Título con Contador de Caracteres */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label htmlFor="task-title" className="text-xs font-medium text-zinc-400">
                Título de la tarea <span className="text-zinc-500">*</span>
              </label>
              <span className="text-[10px] font-mono text-zinc-500">
                {titulo.length}/100
              </span>
            </div>
            <Input
              id="task-title"
              placeholder="Ej. Desarrollar módulo de autenticación"
              value={titulo}
              onChange={(e) => {
                setTitulo(e.target.value.slice(0, 100));
                if (errors.titulo) validate();
              }}
              onBlur={() => handleBlur('titulo')}
              error={touched.titulo ? errors.titulo : ''}
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Campo: Descripción con Contador de Caracteres */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="task-desc" className="text-xs font-medium text-zinc-400">
                Descripción
              </label>
              <span className="text-[10px] font-mono text-zinc-500">
                {descripcion.length}/300
              </span>
            </div>
            <textarea
              id="task-desc"
              rows={3}
              placeholder="Describe los pasos o requerimientos técnicos..."
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value.slice(0, 300));
                if (errors.descripcion) validate();
              }}
              onBlur={() => handleBlur('descripcion')}
              disabled={isSubmitting}
              className={`w-full px-3 py-2 bg-zinc-950 border rounded-md text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none transition-colors resize-none disabled:opacity-50 ${
                touched.descripcion && errors.descripcion
                  ? 'border-zinc-400 focus:border-white'
                  : 'border-zinc-800 focus:border-zinc-500'
              }`}
            />
            {touched.descripcion && errors.descripcion && (
              <p className="text-[11px] text-zinc-300 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                {errors.descripcion}
              </p>
            )}
          </div>

          {/* Campo Complejo: Selector Interactivo de Prioridad */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Prioridad</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'baja', label: 'Baja', desc: 'No urgente' },
                { id: 'media', label: 'Media', desc: 'Normal' },
                { id: 'alta', label: 'Alta', desc: 'Crítica' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPrioridad(p.id)}
                  disabled={isSubmitting}
                  className={`p-2.5 rounded-md border text-left transition-all cursor-pointer ${
                    prioridad === p.id
                      ? 'border-white bg-zinc-900 text-white shadow-sm'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-semibold capitalize">{p.label}</span>
                    <Flag className={`w-3 h-3 ${prioridad === p.id ? 'text-white' : 'text-zinc-600'}`} />
                  </div>
                  <span className="text-[10px] text-zinc-500 block">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Campo: Selector de Estado */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-status" className="text-xs font-medium text-zinc-400">
              Estado de la Tarea
            </label>
            <select
              id="task-status"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 text-sm focus:outline-none focus:border-zinc-500 transition-colors cursor-pointer"
            >
              <option value="pendiente">Pendiente — En cola de espera</option>
              <option value="en_progreso">En progreso — En desarrollo activo</option>
              <option value="completada">Completada — Finalizada con éxito</option>
            </select>
          </div>

          {/* Botones de Acción con estado de carga */}
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
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Guardando...
                </>
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

