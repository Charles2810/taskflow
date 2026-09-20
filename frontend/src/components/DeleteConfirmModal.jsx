import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import Button from './Button';

/**
 * Modal de confirmación para eliminación de tareas (Sesión 09)
 * Previene borrados accidentales con estilo monocromático sobrio.
 */
export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  taskTitle = '',
  isDeleting = false,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-md w-full p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100 flex-shrink-0">
            <AlertTriangle className="w-5 h-5 stroke-[2]" />
          </div>

          <div className="flex-1">
            <h3 className="text-base font-semibold text-white tracking-tight">
              ¿Eliminar esta tarea?
            </h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Estás a punto de eliminar la tarea{' '}
              <span className="font-semibold text-zinc-200">"{taskTitle}"</span>. Esta acción no se puede deshacer.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 p-1 rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-zinc-100 text-zinc-950 hover:bg-white"
          >
            {isDeleting ? (
              'Eliminando...'
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Confirmar Eliminación
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
