import React from 'react';

/**
 * Componente funcional Button con estilo minimalista y monocromático
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
    primary: 'bg-white text-zinc-950 hover:bg-zinc-200 border border-white font-semibold',
    secondary: 'bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border border-zinc-800',
    outline: 'bg-transparent text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900/50',
    danger: 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800',
    ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm transition-colors duration-150 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none ${styles[variant] || styles.primary} ${className}`}
    >
      {children}
    </button>
  );
}
