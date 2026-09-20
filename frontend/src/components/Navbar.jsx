import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

/**
 * Barra de navegación principal de TaskFlow (Sesión 06)
 */
export default function Navbar({ appName = 'TaskFlow', user = null, taskCount = 0 }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Marca */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">{appName}</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Gestión Ágil y Colaborativa</p>
          </div>
        </div>

        {/* Info de sesión y estado */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Tareas registradas: <strong className="text-indigo-400">{taskCount}</strong></span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-indigo-300">
              {user?.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="hidden sm:block text-left text-xs">
              <p className="font-semibold text-slate-200">{user?.nombre || 'Usuario Demo'}</p>
              <p className="text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                {user?.rol || 'Sesión 06'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
