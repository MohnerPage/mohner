'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Settings, Box, LogOut, Home } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  const isConfig = pathname.includes('/configuracion');
  const isProducts = pathname.includes('/products');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-manrope">
      
      {/* Sidebar - Panel Lateral "Súper Fácil" */}
      <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <span className="font-extrabold text-xl text-slate-800 tracking-tight">Panel Web</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          
          <a 
            href="/admin/products"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isProducts 
                ? 'bg-blue-50 text-blue-700 font-semibold' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Box size={20} className={isProducts ? 'text-blue-600' : 'text-slate-400'} />
            <div>
              <p className="text-sm">Mi Catálogo</p>
            </div>
          </a>

          <a 
            href="/admin/configuracion"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isConfig 
                ? 'bg-emerald-50 text-emerald-700 font-semibold' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Settings size={20} className={isConfig ? 'text-emerald-600' : 'text-slate-400'} />
            <div>
              <p className="text-sm">Mi Página Web</p>
            </div>
          </a>

        </nav>

        <div className="p-4 border-t border-slate-100 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <Home size={18} />
            <span className="text-sm font-medium">Sitio público</span>
          </Link>

          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Navegación Móvil (Bottom Bar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex items-center justify-around p-3 z-50">
        <a href="/admin/products" className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg ${isProducts ? 'text-blue-600' : 'text-slate-500'}`}>
          <Box size={20} />
          <span className="text-[10px] font-bold">Catálogo</span>
        </a>
        <a href="/admin/configuracion" className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg ${isConfig ? 'text-emerald-600' : 'text-slate-500'}`}>
          <Settings size={20} />
          <span className="text-[10px] font-bold">Página Web</span>
        </a>
        <button onClick={handleLogout} className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg text-red-500">
          <LogOut size={20} />
          <span className="text-[10px] font-bold">Salir</span>
        </button>
      </div>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto p-6 md:p-10">
          {children}
        </div>
      </main>

    </div>
  );
}
