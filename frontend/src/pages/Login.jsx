import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Credenciales inválidas.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role = 'admin') => {
    setLoading(true);
    try {
      const demoEmail = role === 'admin' ? 'admin@taskflow.com' : 'juan@email.com';
      await login(demoEmail, 'password123');
      navigate(from, { replace: true });
    } catch {
      // Ignorar para fallback instantáneo
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center max-w-md w-full mx-auto px-4 py-12">
      <Card className="w-full">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded bg-white text-zinc-950 flex items-center justify-center mx-auto mb-3">
            <LogIn className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Iniciar Sesión</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Conexión en vivo con Flask y Supabase Auth.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded bg-zinc-950 border border-zinc-700 text-xs text-zinc-300 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="usuario@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" disabled={loading} className="w-full mt-1">
            {loading ? 'Validando...' : 'Iniciar Sesión'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Acceso Demo */}
        <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
          <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
            Acceso Rápido para Pruebas (Demo)
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleQuickDemo('admin')}
              className="flex-1 text-xs py-1.5"
            >
              Como Admin
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleQuickDemo('user')}
              className="flex-1 text-xs py-1.5"
            >
              Como Usuario
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-zinc-500">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-zinc-200 hover:underline font-medium">
            Regístrate aquí
          </Link>
        </div>
      </Card>
    </div>
  );
}
