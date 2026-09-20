import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { CheckSquare, ArrowRight, Shield, Database, Cpu } from 'lucide-react';

export default function Home() {
  const token = localStorage.getItem('token');

  return (
    <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
          <CheckSquare className="w-3.5 h-3.5 text-white" />
          TaskFlow — Versión SPA con React Router
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Gestión de tareas <br className="hidden sm:block" />
          sin fricción.
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Plataforma full-stack moderna construida con Flask, Supabase PostgreSQL y React. Diseñada con un enfoque sobrio, rápido y sin distracciones.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {token ? (
            <Link to="/dashboard">
              <Button variant="primary" className="w-full sm:w-auto px-6 py-2.5">
                Ir a mi Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <Button variant="primary" className="w-full sm:w-auto px-6 py-2.5">
                  Crear cuenta gratis
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="w-full sm:w-auto px-6 py-2.5">
                  Iniciar sesión
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Características Minimalistas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        <Card className="text-left space-y-2">
          <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-white mb-3">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-white">Arquitectura MVC</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Backend desacoplado en Python con Flask Blueprints, controladores y separación estricta de responsabilidades.
          </p>
        </Card>

        <Card className="text-left space-y-2">
          <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-white mb-3">
            <Database className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-white">Supabase PostgreSQL</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Base de datos en la nube con Row Level Security (RLS), tipos UUID e integridad referencial en cascada.
          </p>
        </Card>

        <Card className="text-left space-y-2">
          <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-white mb-3">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-white">Seguridad & JWT</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Autenticación basada en Bearer Tokens firmados digitalmente, rutas privadas y autorización por roles.
          </p>
        </Card>
      </div>
    </div>
  );
}
