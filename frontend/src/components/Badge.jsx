import React from 'react';

/**
 * Componente funcional Badge para representar estados y prioridades
 */
export default function Badge({ text, type = 'status' }) {
  const statusStyles = {
    completada: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    en_progreso: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    pendiente: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  };

  const priorityStyles = {
    alta: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    media: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    baja: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
  };

  const styleMap = type === 'priority' ? priorityStyles : statusStyles;
  const currentStyle = styleMap[text?.toLowerCase()] || 'bg-slate-700/30 text-slate-300 border-slate-600/30';

  const labels = {
    completada: 'Completada',
    en_progreso: 'En Progreso',
    pendiente: 'Pendiente',
    alta: 'Prioridad Alta',
    media: 'Prioridad Media',
    baja: 'Prioridad Baja',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${currentStyle}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {labels[text?.toLowerCase()] || text}
    </span>
  );
}
