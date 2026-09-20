import React from 'react';

/**
 * Componente funcional Button (Sesión 06)
 * @param {React.ReactNode} children - Contenido del botón
 * @param {'primary' | 'secondary' | 'danger' | 'outline' | 'success'} variant - Estilo visual
 * @param {Function} onClick - Manejador de evento click
 * @param {'button' | 'submit' | 'reset'} type - Tipo de botón
 * @param {boolean} disabled - Estado deshabilitado
 * @param {string} className - Clases CSS complementarias
 */
export default function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) {
  const styles = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 border border-indigo-500/30',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20',
    outline: 'border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${styles[variant] || styles.primary} ${className}`}
    >
      {children}
    </button>
  );
}
