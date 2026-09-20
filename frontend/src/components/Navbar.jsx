import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckSquare, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * Barra de navegación responsive conectada a AuthContext (Sesión 08 y Sesión 10)
 * Soporta navegación móvil (drawer/hamburguesa) y de escritorio con Tailwind CSS
 */
export default function Navbar({ appName = 'TaskFlow' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Marca / Logo */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 rounded bg-white flex items-center justify-center text-zinc-950">
              <CheckSquare className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">{appName}</span>
          </Link>

          {/* Enlaces de Navegación de Escritorio (Desktop: md+) */}
          <nav className="hidden md:flex items-center gap-1 text-xs">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded transition-colors ${
                isActive('/') ? 'text-white bg-zinc-900 font-medium' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-1.5 rounded transition-colors ${
                isActive('/dashboard') ? 'text-white bg-zinc-900 font-medium' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
          </nav>
        </div>

        {/* Acciones de Autenticación de Escritorio (Desktop: md+) */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-7 h-7 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center font-mono text-zinc-200">
                  {user?.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-left">
                  <p className="font-medium text-zinc-200 leading-tight">{user?.nombre || 'Usuario'}</p>
                  <p className="text-[10px] text-zinc-500 font-mono">{user?.rol || 'usuario'}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded transition-colors cursor-pointer"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-900 rounded transition-colors font-medium"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 text-xs bg-white text-zinc-950 hover:bg-zinc-200 rounded font-semibold transition-colors"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>

        {/* Botón de Menú Móvil (Hamburguesa en < md) */}
        <div className="flex md:hidden items-center gap-2">
          {isAuthenticated && (
            <div className="w-6 h-6 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center font-mono text-[11px] text-zinc-200">
              {user?.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded transition-colors cursor-pointer"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil (Mobile-first responsive drawer) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 space-y-4 animate-fade-in">
          {/* Enlaces de Navegación Móvil */}
          <nav className="flex flex-col gap-1.5">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded text-xs transition-colors font-medium ${
                isActive('/') ? 'text-white bg-zinc-900' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded text-xs transition-colors font-medium ${
                isActive('/dashboard') ? 'text-white bg-zinc-900' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              Dashboard
            </Link>
          </nav>

          {/* Sección de Usuario / Autenticación en Móvil */}
          <div className="pt-3 border-t border-zinc-800/80">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center font-mono text-xs text-zinc-200">
                    {user?.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-200">{user?.nombre || 'Usuario'}</p>
                    <p className="text-[10px] text-zinc-500 font-mono">{user?.email || ''}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 rounded border border-zinc-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs text-zinc-300 hover:text-white bg-zinc-900 rounded border border-zinc-800 font-medium transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs bg-white text-zinc-950 hover:bg-zinc-200 rounded font-semibold transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

