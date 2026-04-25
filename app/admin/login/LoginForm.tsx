'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Lock, User } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Error al ingresar');
        setLoading(false);
        return;
      }
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Error de red');
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-sand-50 via-cream to-sand-100">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-10">
          <Logo />
        </div>
        <form onSubmit={onSubmit} className="bg-cream border border-sand-200 p-8 space-y-5 shadow-elegant">
          <div className="text-center mb-2">
            <p className="eyebrow mb-2">Panel privado</p>
            <h1 className="font-display text-3xl text-espresso">Bienvenido</h1>
            <p className="text-sm text-espresso-lighter mt-2">Ingresá para gestionar tu tienda.</p>
          </div>

          <label className="block">
            <span className="label-duna">Usuario</span>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-lighter" />
              <input
                className="input-duna pl-10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="duna"
                autoFocus
                autoComplete="username"
              />
            </div>
          </label>

          <label className="block">
            <span className="label-duna">Contraseña</span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-lighter" />
              <input
                className="input-duna pl-10"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </label>

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Ingresando...</> : 'Ingresar'}
          </button>

          <p className="text-center text-xs text-espresso-lighter pt-3 border-t border-sand-200">
            ¿Problemas para ingresar? Contactá al administrador.
          </p>
        </form>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-espresso-lighter hover:text-gold">
            ← Volver al sitio
          </Link>
        </div>
      </div>
    </section>
  );
}
