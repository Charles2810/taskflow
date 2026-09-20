import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Componente ProtectedRoute (Sesión 07)
 * Protege rutas privadas comprobando la existencia de un token de autenticación.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirigir al login guardando la ruta previa para redirección posterior
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
