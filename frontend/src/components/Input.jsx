import React from 'react';

/**
 * Componente funcional Input para formularios y filtros
 */
export default function Input({
  label,
  id,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  required = false,
  className = '',
}) {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id || name} className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all ${
          error ? 'border-rose-500 focus:ring-rose-500/50' : ''
        } ${className}`}
      />
      {error && <span className="text-xs text-rose-400 font-medium">{error}</span>}
    </div>
  );
}
