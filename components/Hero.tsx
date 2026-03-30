'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="pt-20 min-h-[90vh] flex items-center relative overflow-hidden bg-surface">
      {/* Decoración abstracta */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-fixed rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-tertiary-container rounded-full blur-3xl opacity-20" />

      <div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
        {/* Contenido */}
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 bg-primary-container px-4 py-2 rounded-lg text-primary text-sm font-semibold">
            <span className="material-symbols-outlined text-base">eco</span>
            Soluciones 100% sustentables
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold leading-tight text-on-surface">
            Envases de <span className="text-primary">Plástico</span> y <span className="text-primary">Vidrio</span> que impulsan tu marca
          </h1>

          <p className="text-lg text-on-surface-variant max-w-lg">
            Fabricamos y distribuimos envases de alta calidad para alimentos, bebidas, cosméticos y farmacéutica. Personalización, cumplimiento normativo y entrega rápida en todo México.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#productos"
              className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary-dim transition-colors shadow-lg active:scale-95"
            >
              <span className="material-symbols-outlined">inventory_2</span>
              Ver catálogo
            </Link>
            <Link
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 border-2 border-outline text-on-surface px-8 py-4 rounded-xl font-semibold hover:bg-surface-variant transition-colors active:scale-95 shadow-sm"
            >
              <span className="material-symbols-outlined">phone</span>
              Contactar
            </Link>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-outline-variant">
            <div>
              <div className="text-3xl font-headline font-bold text-primary">+500</div>
              <div className="text-sm text-on-surface-variant">Clientes satisfechos</div>
            </div>
            <div>
              <div className="text-3xl font-headline font-bold text-primary">+1,200</div>
              <div className="text-sm text-on-surface-variant">Productos</div>
            </div>
            <div>
              <div className="text-3xl font-headline font-bold text-primary">18</div>
              <div className="text-sm text-on-surface-variant">Años de experiencia</div>
            </div>
          </div>
        </div>

        {/* Imagen */}
        <div className="relative z-10 hidden md:block">
          <div className="relative w-full h-[500px] rounded-3xl overflow-hidden bg-primary-fixed/30 border border-primary-container">
            {/* Placeholder: en producción sería una imagen real */}
            <div className="absolute inset-0 flex items-center justify-center text-primary-dim">
              <div className="text-center">
                <span className="material-symbols-outlined text-6xl mb-4">view_in_ar</span>
                <p className="font-headline">Imagen de envases</p>
              </div>
            </div>
          </div>
          {/* Flotante */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg border border-outline-variant">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success-container rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-success">check_circle</span>
              </div>
              <div>
                <div className="font-semibold text-on-surface">Certificación ISO 9001</div>
                <div className="text-sm text-on-surface-variant">Calidad garantizada</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
