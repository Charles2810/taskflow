import React from 'react';

/**
 * Componente funcional Card con estilo minimalista monocromático
 */
export default function Card({ children, title, subtitle, className = '', action = null }) {
  return (
    <div className={`bg-zinc-900/90 border border-zinc-800 rounded-lg p-6 ${className}`}>
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-zinc-800/80">
          <div>
            {title && <h3 className="text-sm font-semibold text-zinc-100 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
