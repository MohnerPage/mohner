'use client';

import { useState, useEffect } from 'react';

export default function Testimonials({
  testiTitle,
  testimonialsData
}: {
  testiTitle?: string,
  testimonialsData?: any
}) {
  const [current, setCurrent] = useState(0);
  const renderedTitle = testiTitle || "Lo Que Dicen Nuestros Clientes";
  
  // Función de parseo ultra-segura
  const getTestimonials = () => {
    try {
      if (!testimonialsData) return [];
      if (Array.isArray(testimonialsData)) return testimonialsData;
      if (typeof testimonialsData === 'string') {
        const parsed = JSON.parse(testimonialsData);
        if (Array.isArray(parsed)) return parsed;
        if (typeof parsed === 'string') {
          const doubleParsed = JSON.parse(parsed);
          if (Array.isArray(doubleParsed)) return doubleParsed;
        }
      }
      return [];
    } catch (e) {
      return [];
    }
  };

  let testimonialsList = getTestimonials();

  if (testimonialsList.length === 0) {
    testimonialsList = [
      {
        quote: "Crystalline ha sido un socio estratégico clave para nuestra línea de bebidas premium. La calidad del vidrio y la consistencia en los envíos son excepcionales.",
        author: "María González",
        role: "Directora de Operaciones, Destilería Altamar",
      },
      {
        quote: "La transparencia en la comunicación y la capacidad de respuesta a nuestras especificaciones técnicas hacen de Crystalline un proveedor confiable.",
        author: "Carlos Ruiz",
        role: "Gerente de Supply Chain, Cosméticos Natura",
      },
      {
        quote: "Desde que cambiamos a los envases de Crystalline, nuestra tasa de reclamos por defectos ha disminuido en un 40%. Excelente inversión.",
        author: "Elena Torres",
        role: "Jefa de Calidad, Farmacéutica Vital",
      },
    ];
  }

  useEffect(() => {
    if (testimonialsList.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonialsList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonialsList.length]);

  return (
    <section id="testimonios" className="py-24 px-8 bg-surface">
      <div className="max-w-screen-2xl mx-auto text-center mb-16">
        <h2 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface mb-4">
          {renderedTitle}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonialsList.map((t: any, idx: number) => (
              <div key={idx} className="w-full flex-shrink-0 px-4">
                <div className="bg-surface-container p-10 rounded-xl shadow-md border border-outline-variant/20">
                  <svg className="w-12 h-12 text-primary/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-on-surface text-xl font-light leading-relaxed mb-8">
                    {t?.quote || ''}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">{(t?.author || 'C').charAt(0)}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-on-surface">{t?.author || ''}</p>
                      <p className="text-sm text-on-surface-variant font-light">{t?.role || ''}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonialsList.map((_: any, idx: number) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors ${current === idx ? 'bg-primary' : 'bg-outline-variant'}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
