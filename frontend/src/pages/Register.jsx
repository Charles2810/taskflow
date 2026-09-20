import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { UserPlus, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim() || !email.trim() || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      await register({
        nombre: nombre.trim(),
        email: email.trim(),
        password,
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Error al registrar usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center max-w-md w-full mx-auto px-4 py-12">
      <Card className="w-full">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded bg-white text-zinc-950 flex items-center justify-center mx-auto mb-3">
            <UserPlus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Crear Cuenta</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Registro con persistencia en Supabase y token JWT.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded bg-zinc-950 border border-zinc-700 text-xs text-zinc-300 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nombre Completo"
            placeholder="Ej. Ana Gómez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

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
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" disabled={loading} className="w-full mt-1">
            {loading ? 'Creando cuenta...' : 'Registrarse'}
            <ArrowRight className="w-4 h-4" />
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
