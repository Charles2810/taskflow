import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckSquare, LogOut } from 'lucide-react';

/**
 * Barra de navegación con soporte para React Router y estilo minimalista monocromático
 */
export default function Navbar({ appName = 'TaskFlow' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo / Marca */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded bg-white flex items-center justify-center text-zinc-950">
              <CheckSquare className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">{appName}</span>
          </Link>

          {/* Enlaces Principales */}
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

        {/* Acciones de Autenticación */}
        <div className="flex items-center gap-3">
          {token ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-7 h-7 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center font-mono text-zinc-200">
                  {user?.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden sm:block text-left">
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
      </div>
    </header>
  );
}
