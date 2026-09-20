import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const toast = {
    success: (msg, duration) => showToast(msg, 'success', duration),
    error: (msg, duration) => showToast(msg, 'error', duration),
    info: (msg, duration) => showToast(msg, 'info', duration),
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast, toast }}>
      {children}

      {/* Contenedor de Toasts flotantes en esquina inferior derecha */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((item) => (
          <div
            key={item.id}
            className="pointer-events-auto bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-lg p-3.5 shadow-2xl flex items-start justify-between gap-3 text-xs transition-all duration-200"
          >
            <div className="flex items-start gap-2.5">
              {item.type === 'success' && (
                <div className="w-5 h-5 rounded bg-white text-zinc-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              )}
              {item.type === 'error' && (
                <div className="w-5 h-5 rounded bg-zinc-800 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              )}
              {item.type === 'info' && (
                <div className="w-5 h-5 rounded bg-zinc-800 text-zinc-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              )}
              <div className="leading-snug pt-0.5">
                <p className="font-medium text-zinc-200">{item.message}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeToast(item.id)}
              className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition-colors cursor-pointer flex-shrink-0"
              title="Cerrar notificación"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser utilizado dentro de un ToastProvider');
  }
  return context;
}
