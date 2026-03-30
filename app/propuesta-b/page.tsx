'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/NavbarB';
import Footer from '@/components/FooterB';

export default function PropuestaBHome() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Industrial Dark */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/medicines_opt.jpg"
            alt="Containers for medicines"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8">
          <div className="max-w-3xl">
            <p className="text-orange-400 font-bold uppercase tracking-widest mb-4">
              Proveedor Industrial de Envases
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Soluciones en <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">Envases de Vidrio</span> y Plástico
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl">
              Fabricamos y distribuimos envases de Alta Calidad para las industrias Farmacéutica, Alimentaria, Cosméticos y Química. Más de 20 años de experiencia.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#catalog" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg">
                Ver Catálogo
              </a>
              <a href="https://wa.me/5213312345678?text=Hola, me interesa conocer sus envases" target="_blank" rel="noopener" className="border-2 border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition flex items-center gap-2">
                <span className="material-symbols-outlined">whatsapp</span>
                WhatsApp Ventas
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-900 py-8 border-b border-slate-200">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Años de Experiencia', value: '20+' },
              { label: 'Clientes Activos', value: '500+' },
              { label: 'Referencias en Stock', value: '2,500+' },
              { label: 'Entregas/Mes', value: '10,000+' }
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-3xl font-bold text-orange-500 mb-1">{stat.value}</p>
                <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Preview */}
      <section id="catalog" className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Nuestro Catálogo</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Más de 2,500 referencias en stock. Envases de vidrio, PET, HDPE, PVC y aluminio. Personalización disponible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { cat: 'Vidrio', img: '/prod_pharma_v2.png' },
              { cat: 'PET', img: '/prod_industrial_v2.png' },
              { cat: 'HDPE', img: '/prod_industrial_v2.png' },
              { cat: 'Aluminio', img: '/prod_pharma_v2.png' },
              { cat: 'Farmacéutico', img: '/prod_pharma_v2.png' },
              { cat: 'Alimentario', img: '/prod_pharma_v2.png' }
            ].map((item, idx) => (
              <div key={idx} className="group border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white">
                <div className="h-64 relative bg-slate-100">
                  <Image src={item.img} alt={item.cat} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <h3 className="text-white text-2xl font-bold">{item.cat}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 mb-4">Envases especializados para {item.cat.toLowerCase()}. Calidad certificada.</p>
                  <Link href={`/catalog?category=${item.cat}`} className="text-orange-500 font-semibold hover:text-orange-600 inline-flex items-center gap-2">
                    Ver productos
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">¿Por qué elegirnos?</h2>
              <p className="text-slate-600 mb-8 text-lg">
                Somos socio estratégico para más de 500 empresas en México y Latinoamérica. Nuestro compromiso es la calidad, la puntualidad y el servicio técnico especializado.
              </p>
              <ul className="space-y-6">
                {[
                  { icon: 'verified', title: 'Calidad Certificada', desc: 'ISO 9001, FDA, CE' },
                  { icon: 'local_shipping', title: 'Entrega Garantizada', desc: 'Red logística nacional' },
                  { icon: 'precision_manufacturing', title: 'Fabricación Propia', desc: 'Control total del proceso' },
                  { icon: 'support_agent', title: 'Asesoría Técnica', desc: 'Ingenieros especializados' }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-orange-600 text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <a href="#industries" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition">
                  <span className="material-symbols-outlined">business</span>
                  Conocer nuestros sectores
                </a>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/prod_pharma_v2.png"
                alt="Manufacturing process"
                fill
                className="object-cover object-center bg-slate-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Sectores que Atendemos</h2>
            <p className="text-slate-600 text-lg">Soluciones adaptadas a cada industria</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Farmacéutica', 'Alimentaria', 'Cosmética', 'Química', 'Agroindustria', 'Bebidas', 'Cuidado Personal', 'Investigación'].map((industry, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-orange-500 hover:shadow-lg transition-all text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-600 text-3xl">inventory_2</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{industry}</h3>
                <p className="text-slate-600 text-sm">Envases especializados y normados</p>
              </div>
            ))}
          </div>

          {/* Botones de acción después de sectores */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/5213312345678?text=Hola, me interesa cotizar para el sector" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition">
              <span className="material-symbols-outlined">whatsapp</span>
              Contactar por WhatsApp
            </a>
            <a href="#catalog" className="inline-flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition">
              <span className="material-symbols-outlined">shopping_bag</span>
              Ver Catálogo por Sector
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-screen-2xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para cotizar?</h2>
          <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto">
            Nuestro equipo de ventas está preparado para ayudarte a encontrar el envase perfecto para tu producto.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/5213312345678?text=Hola, me interesa cotizar envases" target="_blank" rel="noopener" className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-lg font-bold text-lg shadow-lg transition flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">whatsapp</span>
              WhatsApp Ventas
            </a>
            <a href="#catalog" className="border-2 border-white/30 hover:bg-white/10 text-white px-10 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">grid_view</span>
              Ver Catálogo Completo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
