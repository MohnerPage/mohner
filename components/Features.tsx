'use client';

const features = [
  {
    icon: 'eco',
    title: 'Sustentabilidad',
    description: 'Materiales reciclables y procesos de manufactura amigables con el medio ambiente.',
  },
  {
    icon: 'inventory_2',
    title: 'Gran variedad',
    description: 'Más de 1,200 modelos en plástico y vidrio para todas tus necesidades.',
  },
  {
    icon: 'palette',
    title: 'Personalización',
    description: 'Colores, formas y etiquetas personalizadas según tu identidad de marca.',
  },
  {
    icon: 'local_shipping',
    title: 'Entrega rápida',
    description: 'Envíos a todo México con seguimiento en tiempo real.',
  },
];

export default function Features() {
  return (
    <section id="nosotros" className="py-24 bg-surface-container">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Combinamos calidad, innovación y sustentabilidad para ofrecerte los mejores envases del mercado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-surface p-6 rounded-2xl border border-outline-variant hover:border-primary transition-colors group"
            >
              <div className="w-14 h-14 bg-primary-fixed rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-2xl text-primary group-hover:text-on-primary">
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-xl font-headline font-semibold mb-3 text-on-surface">
                {feature.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
