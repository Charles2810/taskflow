import React from 'react';

/**
 * Componente funcional Badge minimalista y monocromático
 */
export default function Badge({ text, type = 'status' }) {
  const isCompleted = text?.toLowerCase() === 'completada';
  const isInProgress = text?.toLowerCase() === 'en_progreso';
  const isHigh = text?.toLowerCase() === 'alta';

  let badgeStyle = 'bg-zinc-900 text-zinc-400 border-zinc-800';

  if (type === 'status') {
    if (isCompleted) {
      badgeStyle = 'bg-zinc-100 text-zinc-950 border-zinc-100 font-semibold';
    } else if (isInProgress) {
      badgeStyle = 'bg-zinc-800 text-zinc-200 border-zinc-700';
    } else {
      badgeStyle = 'bg-zinc-950 text-zinc-400 border-zinc-800';
    }
  } else {
    // Prioridad
    if (isHigh) {
      badgeStyle = 'bg-zinc-800 text-zinc-200 border-zinc-600 font-medium';
    } else {
      badgeStyle = 'bg-zinc-950 text-zinc-400 border-zinc-800';
    }
  }

  const labels = {
    completada: 'Completada',
    en_progreso: 'En progreso',
    pendiente: 'Pendiente',
    alta: 'Alta',
    media: 'Media',
    baja: 'Baja',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] border tracking-tight ${badgeStyle}`}>
      {type === 'status' && !isCompleted && (
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
      )}
      {labels[text?.toLowerCase()] || text}
    </span>
  );
}
