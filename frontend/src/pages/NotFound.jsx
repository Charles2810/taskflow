import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full mx-auto px-4 py-16 text-center">
      <div className="w-12 h-12 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
        <FileQuestion className="w-6 h-6" />
      </div>
      <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-1">Error 404</span>
      <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Página no encontrada</h1>
      <p className="text-xs text-zinc-400 mb-6 max-w-sm">
        La ruta a la que intentas acceder no existe o fue movida en la aplicación.
      </p>
      <Link to="/">
        <Button variant="primary">
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
}
