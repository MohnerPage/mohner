'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="flex justify-between items-center px-8 h-20 w-full max-w-screen-2xl mx-auto">
        <Link href="/admin/products" className="text-2xl font-headline font-bold tracking-tighter text-primary">
          TU LOGO
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/admin/products/new" className="text-sm font-medium text-on-surface hover:text-primary transition-colors">Nuevo Producto</Link>
          <Link href="/admin/products" className="text-sm font-medium text-on-surface hover:text-primary transition-colors">Catálogo</Link>
          <button onClick={handleLogout} className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Cerrar Sesión</button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-surface-variant"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl text-on-surface">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant">
          <div className="px-8 py-4 space-y-4">
            <Link href="/admin/products/new" className="block text-base font-medium text-on-surface hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Nuevo Producto</Link>
            <Link href="/admin/products" className="block text-base font-medium text-on-surface hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Catálogo</Link>
            <button onClick={() => { setMobileMenuOpen(false); handleLogout(); }} className="block text-base font-medium text-on-surface-variant hover:text-primary">Cerrar Sesión</button>
          </div>
        </div>
      )}
    </nav>
  );
}
