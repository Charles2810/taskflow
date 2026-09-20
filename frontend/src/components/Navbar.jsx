import React from 'react';
import { CheckSquare } from 'lucide-react';

/**
 * Barra de navegación con diseño minimalista y monocromático (sin gradientes)
 */
export default function Navbar({ appName = 'TaskFlow', user = null, taskCount = 0 }) {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Marca / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-white flex items-center justify-center text-zinc-950">
            <CheckSquare className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-white">{appName}</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border border-zinc-800 text-zinc-400">
              v1.0
            </span>
          </div>
        </div>

        {/* Info y Usuario */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 font-mono">
            <span>Tareas:</span>
            <span className="text-white font-semibold">{taskCount}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center text-xs font-mono text-zinc-200">
              {user?.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="hidden sm:block text-left text-xs">
              <p className="font-medium text-zinc-200 leading-tight">{user?.nombre || 'Usuario'}</p>
              <p className="text-[11px] text-zinc-500 font-mono">{user?.rol || 'dev'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
