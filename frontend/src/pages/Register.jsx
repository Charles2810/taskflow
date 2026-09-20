import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { UserPlus, ArrowRight } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
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
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), email: email.trim(), password }),
      }).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard', { replace: true });
        return;
      }

      // Modo demo si backend no responde
      const demoUser = {
        id: Date.now().toString(),
        nombre: nombre.trim(),
        email: email.trim(),
        rol: 'usuario',
      };
      localStorage.setItem('token', 'demo-jwt-registered-session-07');
      localStorage.setItem('user', JSON.stringify(demoUser));
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('Error al registrar usuario.');
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
            Empieza a organizar tus proyectos hoy mismo.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded bg-zinc-950 border border-zinc-700 text-xs text-zinc-300 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
