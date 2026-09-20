import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { LogIn, ArrowRight, Mail, Lock, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/**
 * Vista de Inicio de Sesión con Validación Avanzada (Sesión 11)
 */
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  // Validación de campos
  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errors.email = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Introduce un formato de correo válido (ej: usuario@email.com).';
    }

    if (!password) {
      errors.password = 'La contraseña es obligatoria.';
    } else if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    return errors;
  };

  const errors = validate();

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setServerError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      await login(email.trim(), password);
      toast.success('¡Bienvenido de nuevo!');
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.message || 'Credenciales inválidas. Verifica tu correo o contraseña.';
      setServerError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role = 'admin') => {
    setLoading(true);
    setServerError('');
    try {
      const demoEmail = role === 'admin' ? 'admin@taskflow.com' : 'juan@email.com';
      await login(demoEmail, 'password123');
      toast.success(`Sesión iniciada como ${role.toUpperCase()} (Demo)`);
      navigate(from, { replace: true });
    } catch {
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center max-w-md w-full mx-auto px-4 py-8 sm:py-12">
      <Card className="w-full">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded bg-white text-zinc-950 flex items-center justify-center mx-auto mb-3">
            <LogIn className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Iniciar Sesión</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Acceso seguro con token JWT y base de datos Supabase.
          </p>
        </div>

        {serverError && (
          <div className="mb-4 p-3 rounded-md bg-zinc-950 border border-zinc-700 text-xs text-zinc-300 text-center animate-fade-in">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Input
            label="Correo Electrónico"
            id="login-email"
            type="email"
            placeholder="usuario@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (serverError) setServerError('');
            }}
            onBlur={() => handleBlur('email')}
            error={touched.email ? errors.email : ''}
            icon={Mail}
            disabled={loading}
            required
          />

          <Input
            label="Contraseña"
            id="login-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (serverError) setServerError('');
            }}
            onBlur={() => handleBlur('password')}
            error={touched.password ? errors.password : ''}
            icon={Lock}
            disabled={loading}
            required
          />

          <Button type="submit" variant="primary" disabled={loading} className="w-full mt-2">
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Validando credenciales...
              </>
            ) : (
              <>
                Iniciar Sesión
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {/* Acceso Rápido Demo */}
        <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
          <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
            Acceso Rápido para Pruebas (Demo)
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleQuickDemo('admin')}
              disabled={loading}
              className="flex-1 text-xs py-1.5"
            >
              Como Admin
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleQuickDemo('user')}
              disabled={loading}
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

