import React from 'react';

/**
 * Componente funcional Card para envolver secciones y listas de tareas
 */
export default function Card({ children, title, subtitle, className = '', action = null }) {
  return (
    <div className={`bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-xl p-6 shadow-xl shadow-black/20 ${className}`}>
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between mb-4 border-b border-slate-700/50 pb-3">
          <div>
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
