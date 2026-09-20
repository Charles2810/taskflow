import React from 'react';

/**
 * Componente funcional Input minimalista y monocromático
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
        <label htmlFor={id || name} className="text-xs font-medium text-zinc-400">
          {label} {required && <span className="text-zinc-500">*</span>}
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
        className={`w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors ${
          error ? 'border-zinc-500' : ''
        } ${className}`}
      />
      {error && <span className="text-xs text-zinc-400">{error}</span>}
    </div>
  );
}
