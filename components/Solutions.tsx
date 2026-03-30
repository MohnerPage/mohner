'use client';

const solutions = [
  {
    title: 'Industria Alimentaria',
    description: 'Envases que preservan frescura y cumplen con normas sanitarias internacionales.',
    icon: 'restaurant',
  },
  {
    title: 'Bebidas y refrescos',
    description: 'Botellas y envases resistentes que mantienen el sabor y la carbonatación.',
    icon: 'local_drink',
  },
  {
    title: 'Cosmética y cuidado personal',
    description: 'Diseño premium y funcionalidad para productos de belleza y wellness.',
    icon: 'spa',
  },
  {
    title: 'Farmacéutica',
    description: 'Envases con garantía de esterilidad y protección contra contaminantes.',
    icon: 'medication',
  },
];

export default function Solutions() {
  return (
    <section id="soluciones" className="py-24 bg-surface-dim">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">
            Soluciones por Industria
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Adaptamos nuestros envases a las necesidades específicas de cada sector.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((sol) => (
            <div
              key={sol.title}
              className="bg-surface p-8 rounded-2xl border border-outline-variant hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl text-primary">{sol.icon}</span>
              </div>
              <h3 className="text-xl font-headline font-semibold mb-3 text-on-surface">{sol.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{sol.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
