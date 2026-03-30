'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PropuestaCHome() {
  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Header natural */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold text-emerald-800">
            <span className="text-emerald-600">Eco</span>Envases
          </Link>
          <nav className="hidden md:flex gap-8">
            <a href="#products" className="text-emerald-900 hover:text-emerald-600 font-medium">Productos</a>
            <a href="#sustainability" className="text-emerald-900 hover:text-emerald-600 font-medium">Sostenibilidad</a>
            <a href="#about" className="text-emerald-900 hover:text-emerald-600 font-medium">Nosotros</a>
            <a href="#contact" className="text-emerald-900 hover:text-emerald-600 font-medium">Contacto</a>
          </nav>
          <Link href="/login" className="bg-emerald-600 text-white px-6 py-2 rounded-full font-medium hover:bg-emerald-700 transition">
            Clientes
          </Link>
        </div>
      </header>

      {/* Hero con naturaleza */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1542273917363-3b1817c69e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Green nature" fill className="object-cover opacity-10" />
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 text-center">
          <p className="text-emerald-600 font-bold uppercase tracking-widest mb-4">Innovación Sustentable</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-emerald-900 mb-6 leading-tight">
            Envases que <span className="text-emerald-600">cuidan el planeta</span>
          </h1>
          <p className="text-xl text-emerald-800 mb-10 max-w-2xl mx-auto leading-relaxed">
            Especialistas en envases de vidrio reciclado y plásticos biodegradables. Reducimos la huella de carbono en cada entrega.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/catalog" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-emerald-700 transition">
              Catálogo Eco
            </Link>
            <a href="#impact" className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition">
              Nuestro Impacto
            </a>
          </div>
        </div>
      </section>

      {/* Stats verdes */}
      <section className="bg-emerald-600 text-white py-12">
        <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Toneladas recicladas', value: '15,000+' },
            { label: 'Plantas reforestadas', value: '3,200' },
            { label: 'Clientes sostenibles', value: '850+' },
            { label: 'CO₂ evitado', value: '4,500 t' }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-emerald-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products con enfoque natural */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-emerald-900 mb-4">Nuestras Líneas</h2>
            <p className="text-emerald-700 text-lg">Envases sostenibles certificados</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: 'Vidrio 100% Reciclado', icon: 'circle', price: 'Desde $1.20' },
              { title: 'Bioplástico PLA', icon: 'eco', price: 'Desde $0.95' },
              { title: 'PET Reciclado', icon: 'recycling', price: 'Desde $0.60' },
              { title: 'Aluminio Infinito', icon: 'autorenew', price: 'Desde $0.40' },
              { title: 'Fibras Naturales', icon: 'grass', price: 'Desde $1.80' },
              { title: 'Cartón Certificado', icon: 'forest', price: 'Desde $0.75' }
            ].map((product, i) => (
              <div key={i} className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl text-emerald-600">{product.icon}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-emerald-900 mb-3">{product.title}</h3>
                <p className="text-emerald-700 mb-6">Materiales renovables, certificaciones internacionales, huella de carbono reducida.</p>
                <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
                  <span className="text-2xl font-bold text-emerald-600">{product.price}</span>
                  <Link href="/catalog" className="text-emerald-600 font-semibold hover:text-emerald-800 flex items-center gap-2">
                    Ver línea <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA compromiso */}
      <section className="py-24 bg-emerald-900 text-white">
        <div className="max-w-screen-2xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Juntos por un futuro más verde</h2>
          <p className="text-emerald-100 text-xl mb-10 max-w-2xl mx-auto">
            Cada envase que eliges reduce el impacto ambiental. Únete a más de 850 marcas comprometidas con el planeta.
          </p>
          <Link href="/contact" className="bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl transition">
            Quiero ser parte
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-100 py-12">
        <div className="max-w-screen-2xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-serif font-bold text-white">
              <span className="text-emerald-500">Eco</span>Envases
            </span>
            <p className="text-sm mt-2">Sostenibilidad en cada botella</p>
          </div>
          <div className="text-sm text-emerald-400">
            © 2026 EcoEnvases S.A. de C.V.
          </div>
        </div>
      </footer>
    </div>
  );
}
