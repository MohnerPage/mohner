'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PropuestaDHome() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: '¿Cuál es el MOQ por pedido?', a: 'Nuestro MOQ varía según producto: desde 500 unidades en PET hasta 5,000 en vidrio soplado. Contactános para cotizar exacto.' },
    { q: '¿Ofrecen personalización?', a: 'Sí, contamos con servicios de etiquetado, termoformado y coloreado personalizado. Lead time: 2-3 semanas.' },
    { q: '¿Envíos a toda Latinoamérica?', a: 'Entregamos a México, USA, Colombia, Chile, Argentina y Costa Rica. Costos de flete separados.' },
    { q: '¿Certificaciones de calidad?', a: 'ISO 9001, FDA para alimentos, CE para productos médicos, y certificación BRC para vidrio.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero con video background */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="https://cdn.coverr.co/videos/coverr-factory-line-2732/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8">
          <div className="max-w-xl">
            <span className="inline-block bg-turquoise-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
              NUEVA LÍNEA 2026
            </span>
            <h1 className="text-6xl font-bold text-slate-900 mb-6 leading-tight">
              PET <span className="text-turquoise-500">100% Reciclado</span> para marcas verdes
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
             presentamos nuestra nueva línea de botellas PET fabricadas con plástico post-consumo. Misma calidad, menor huella.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact?source=pet2026" className="bg-turquoise-500 hover:bg-turquoise-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition">
                Reservar Muestra
              </Link>
              <a href="#features" className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-300 text-slate-700 hover:border-turquoise-500 transition">
                Conocer más
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Ventajas de PET Reciclado</h2>
            <p className="text-slate-600 text-lg">Calidad superior, impacto ambiental reducido</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: '100% Reciclable', desc: 'Cada botella puede volver a reciclarse infinidad de veces sin perder propiedades.', icon: 'recycling' },
              { title: 'Cristalino', desc: 'Transparencia óptica comparable al vidrio, ideal para productos premium.', icon: 'visibility' },
              { title: 'Liviano', desc: 'Peso reducido hasta 30%, ahorro en transporte y emisiones.', icon: 'flight' },
              { title: 'Seguro', desc: 'Aprobado para contacto alimentario, libre de BPA.', icon: 'verified' },
              { title: 'Personalizable', desc: 'Amplia gama de colores, acabados y capacidades (100ml a 2L).', icon: 'palette' },
              { title: 'Rápido entrega', desc: 'Stock permanente, envío en 48h a toda México.', icon: 'rocket_launch' }
            ].map((feat, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-slate-100">
                <div className="w-14 h-14 bg-turquoise-100 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl text-turquoise-600">{feat.icon}</span>
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios stripe */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-8">
          <h3 className="text-center text-slate-500 font-semibold mb-10 uppercase tracking-wide">Clientes satisfechos</h3>
          <div className="flex overflow-x-auto gap-8 pb-4">
            {[
              { quote: 'Excelente calidad y entrega rápida. Volveremos a comprar.', name: 'María González', company: 'Jugos del Sol' },
              { quote: 'El PET reciclado tiene la misma transparencia que el virgen. Muy contentos.', name: 'Carlos Ruiz', company: 'Aguas Pura' },
              { quote: 'Atención personalizada y precios competitivos. Recomendado.', name: 'Laura Méndez', company: 'Cosmética Natural SA' }
            ].map((t, i) => (
              <div key={i} className="min-w-[300px] bg-turquoise-50 p-6 rounded-xl border-l-4 border-turquoise-500">
                <p className="text-slate-800 italic mb-4">"{t.quote}"</p>
                <p className="font-bold text-slate-900">{t.name}</p>
                <p className="text-turquoise-600 text-sm">{t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA grande */}
      <section className="py-24 bg-turquoise-500">
        <div className="max-w-screen-2xl mx-auto px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">¿Listo para cambiar a sustentable?</h2>
          <p className="text-xl text-turquoise-100 mb-10 max-w-2xl mx-auto">
            Solicita muestras gratuitas y_descuento de lanzamiento válido hasta fin de mes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact?source=pet2026" className="bg-white text-turquoise-600 px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-slate-100 transition">
              Solicitar Muestras
            </Link>
            <a href="tel:+523312345678" className="px-10 py-4 rounded-xl font-semibold text-lg border-2 border-white text-white hover:bg-turquoise-600 transition">
              Llamar ahora
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <button
                  className="w-full px-6 py-5 text-left font-semibold text-slate-900 flex justify-between items-center hover:bg-slate-50"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className="material-symbols-outlined text-turquoise-500">
                    {openFaq === i ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-screen-2xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <span className="text-2xl font-bold text-white">EnvasesPro</span>
            <p className="text-sm mt-2">Tu socio en envases sustentables</p>
          </div>
          <div className="text-sm">
            © 2026 EnvasesPro. <a href="/privacy" className="hover:text-white transition">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
