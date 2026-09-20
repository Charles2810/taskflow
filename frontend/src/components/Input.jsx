import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Componente funcional Input minimalista y monocromático (Sesión 06 y Sesión 11)
 * Soporta validación en tiempo real, estados de error inline y textos de ayuda.
 */
export default function Input({
  label,
  id,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onBlur,
  onFocus,
  error = '',
  helperText = '',
  required = false,
  disabled = false,
  icon: Icon = null,
  className = '',
  ...props
}) {
  const inputId = id || name;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-zinc-400 flex items-center justify-between">
          <span>
            {label} {required && <span className="text-zinc-500">*</span>}
          </span>
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          className={`w-full px-3 py-2 bg-zinc-950 border rounded-md text-zinc-100 placeholder-zinc-600 text-sm transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
            Icon ? 'pl-9' : ''
          } ${
            error
              ? 'border-zinc-400 focus:border-white focus:ring-1 focus:ring-zinc-400'
              : 'border-zinc-800 focus:border-zinc-500'
          } ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <span className="text-[11px] text-zinc-300 flex items-center gap-1 mt-0.5 font-medium animate-fade-in">
          <AlertCircle className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
          {error}
        </span>
      ) : helperText ? (
        <span className="text-[11px] text-zinc-500 mt-0.5">{helperText}</span>
      ) : null}
    </div>
  );
}

