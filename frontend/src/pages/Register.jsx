import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { UserPlus, ArrowRight, User, Mail, Lock, ShieldCheck, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/**
 * Vista de Registro con Validación Avanzada en Tiempo Real (Sesión 11)
 */
export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rol, setRol] = useState('usuario');

  const [touched, setTouched] = useState({
    nombre: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  // Cálculo de fortaleza de contraseña (Monocromático)
  const calculatePasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'Vacía' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: 'Débil' };
    if (score === 2) return { score: 2, label: 'Aceptable' };
    return { score: 3, label: 'Fuerte' };
  };

  const strength = calculatePasswordStrength(password);

  // Validación de campos
  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre.trim()) {
      errors.nombre = 'El nombre completo es obligatorio.';
    } else if (nombre.trim().length < 3) {
      errors.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!email.trim()) {
      errors.email = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Introduce una dirección de correo válida (ej: nombre@dominio.com).';
    }

    if (!password) {
      errors.password = 'La contraseña es obligatoria.';
    } else if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Debes confirmar la contraseña.';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    return errors;
  };

  const errors = validate();

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      nombre: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    setServerError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      await register({
        nombre: nombre.trim(),
        email: email.trim(),
        password,
        rol,
      });
      toast.success('¡Cuenta creada exitosamente!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg = err.message || 'Error al registrar el usuario en el servidor.';
      setServerError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center max-w-md w-full mx-auto px-4 py-8 sm:py-12">
      <Card className="w-full">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded bg-white text-zinc-950 flex items-center justify-center mx-auto mb-3">
            <UserPlus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Crear Cuenta</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Registro seguro con validación en cliente y servidor.
          </p>
        </div>

        {serverError && (
          <div className="mb-4 p-3 rounded-md bg-zinc-950 border border-zinc-700 text-xs text-zinc-300 text-center animate-fade-in">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Input
            label="Nombre Completo"
            id="register-name"
            placeholder="Ej. Ana Gómez"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              if (serverError) setServerError('');
            }}
            onBlur={() => handleBlur('nombre')}
            error={touched.nombre ? errors.nombre : ''}
            icon={User}
            disabled={loading}
            required
          />

          <Input
            label="Correo Electrónico"
            id="register-email"
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

          <div className="flex flex-col gap-1.5">
            <Input
              label="Contraseña"
              id="register-password"
              type="password"
              placeholder="Mínimo 6 caracteres"
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

            {/* Medidor de Fortaleza Monocromático */}
            {password && (
              <div className="mt-1 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>Seguridad:</span>
                  <span className="text-zinc-300 font-semibold">{strength.label}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div
                    className={`h-1 rounded-full transition-colors ${
                      strength.score >= 1 ? 'bg-zinc-300' : 'bg-zinc-800'
                    }`}
                  />
                  <div
                    className={`h-1 rounded-full transition-colors ${
                      strength.score >= 2 ? 'bg-zinc-300' : 'bg-zinc-800'
                    }`}
                  />
                  <div
                    className={`h-1 rounded-full transition-colors ${
                      strength.score >= 3 ? 'bg-white' : 'bg-zinc-800'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>

          <Input
            label="Confirmar Contraseña"
            id="register-confirm-password"
            type="password"
            placeholder="Repite la contraseña"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (serverError) setServerError('');
            }}
            onBlur={() => handleBlur('confirmPassword')}
            error={touched.confirmPassword ? errors.confirmPassword : ''}
            icon={ShieldCheck}
            disabled={loading}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Rol de Usuario</label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
            >
              <option value="usuario">Usuario Estándar (Acceso normal)</option>
              <option value="admin">Administrador (Control total)</option>
            </select>
          </div>

          <Button type="submit" variant="primary" disabled={loading} className="w-full mt-2">
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Registrando cuenta...
              </>
            ) : (
              <>
                Registrarse
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-500">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-zinc-200 hover:underline font-medium">
            Inicia sesión aquí
          </Link>
        </div>
      </Card>
    </div>
  );
}

