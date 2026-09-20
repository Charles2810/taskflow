import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

/**
 * Proveedor de Contexto Global de Autenticación (Sesión 08)
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión persistida desde localStorage al montar la app
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Error al restaurar sesión:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  // Función de inicio de sesión
  const login = async (email, password) => {
    try {
      const data = await authService.login({ email, password });
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } catch (err) {
      // Fallback amigable para pruebas locales / demo si el backend no está iniciado
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        const demoUser = {
          id: 'a0000000-0000-0000-0000-000000000001',
          nombre: email.split('@')[0],
          email: email,
          rol: 'usuario',
        };
        const demoToken = 'demo-jwt-fallback-session-08';
        setToken(demoToken);
        setUser(demoUser);
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        return { success: true, user: demoUser, isDemo: true };
      }
      throw err;
    }
  };

  // Función de registro
  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        const demoUser = {
          id: Date.now().toString(),
          nombre: userData.nombre,
          email: userData.email,
          rol: userData.rol || 'usuario',
        };
        const demoToken = 'demo-jwt-registered-session-08';
        setToken(demoToken);
        setUser(demoUser);
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        return { success: true, user: demoUser, isDemo: true };
      }
      throw err;
    }
  };

  // Función de cierre de sesión
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom Hook para acceder al contexto de autenticación
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}
