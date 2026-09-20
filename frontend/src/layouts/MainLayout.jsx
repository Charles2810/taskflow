import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

/**
 * Layout principal con Navbar y contenedor para vistas hijas (Sesión 07)
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar appName="TaskFlow" />

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="border-t border-zinc-800/80 py-6 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>TaskFlow © 2026 — Programación Web II (UPDS)</span>
          <span>Arquitectura SPA con React + Vite + TailwindCSS</span>
        </div>
      </footer>
    </div>
  );
}
