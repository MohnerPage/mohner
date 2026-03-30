'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          router.replace('/admin/products');
        }
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user, password }),
      });
      if (res.ok) {
        // Redirigir al panel de admin
        router.push('/admin/products/new');
      } else {
        const data = await res.json();
        alert('Error: ' + (data.error || 'Credenciales inválidas'));
      }
    } catch (err) {
      alert('Error de red');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center glass-background relative px-4">
      {/* Decorative floating blobs */}
      <div className="absolute top-1/4 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Login Card */}
      <div className="w-full max-w-md z-10">
        <div className="bg-surface-container-lowest/90 backdrop-blur-md p-10 md:p-12 rounded-xl shadow-[0_20px_40px_rgba(42,52,55,0.06)] border border-outline-variant/10">
          {/* Brand */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-container mb-4">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>dataset</span>
            </span>
            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-2">Acceso Interno</h1>
            <p className="text-on-surface-variant text-sm font-light">Autenticación del Sistema de Gestión</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* User Input */}
            <div>
              <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold mb-2" htmlFor="user">
                ID de Empleado o Correo Electrónico
              </label>
              <div className="relative">
                <input
                  className="w-full h-12 px-4 bg-surface-container-high border-none rounded-lg focus:ring-1 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline/50 text-sm"
                  id="user"
                  placeholder="name@crystalline.corp"
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline/40 text-lg">person</span>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold" htmlFor="password">
                  Código de Seguridad
                </label>
                <a href="#" className="text-primary text-[11px] font-semibold uppercase tracking-wider hover:opacity-80 transition-opacity">¿Olvidaste tu Acceso?</a>
              </div>
              <div className="relative">
                <input
                  className="w-full h-12 px-4 bg-surface-container-high border-none rounded-lg focus:ring-1 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline/50 text-sm"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline/40 text-lg">lock</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full h-12 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-bold text-sm tracking-wide rounded-lg shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
              type="submit"
            >
              Iniciar Sesión en el Panel
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </form>

          {/* Footer meta */}
          <div className="mt-8 text-center">
            <p className="text-[11px] text-on-surface-variant/60 font-body uppercase tracking-[0.15em]">
              Portal Industrial Restringido
            </p>
          </div>
        </div>

        {/* Meta links */}
        <div className="mt-8 text-center space-y-2">
                      <p className="text-on-surface-variant/70 text-xs font-light tracking-tight">
                        © 2024 tu logo Container Corp. Industrial Excellence.
                      </p>          <div className="flex justify-center gap-4 text-[10px] text-on-surface-variant/50 uppercase tracking-tighter">
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Especificaciones Técnicas</a>
          </div>
        </div>
      </div>
    </div>
  );
}
