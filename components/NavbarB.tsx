'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NavbarB() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900 border-b border-slate-700 shadow-lg">
      <div className="flex justify-between items-center px-8 h-20 w-full max-w-screen-2xl mx-auto">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          <span className="text-orange-500">ENVASES</span>PRO
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#catalog" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">Catálogo</a>
          <a href="#why" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">Nosotros</a>
          <a href="#industries" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">Sectores</a>
          <Link href="/propuesta-b" className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors">Propuesta B</Link>
          <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition">
            Área Cliente
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl text-slate-300">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-8 py-4 space-y-4">
            <a href="#catalog" className="block text-base font-medium text-slate-300 hover:text-orange-400">Catálogo</a>
            <a href="#why" className="block text-base font-medium text-slate-300 hover:text-orange-400">Nosotros</a>
            <a href="#industries" className="block text-base font-medium text-slate-300 hover:text-orange-400">Sectores</a>
            <Link href="/propuesta-b" className="block text-base font-medium text-orange-400">Propuesta B</Link>
            <Link href="/login" className="block w-full text-center bg-orange-500 text-white px-6 py-2 rounded-full font-semibold mt-2">Área Cliente</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
