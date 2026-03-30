'use client';

import Link from 'next/link';

const categories = [
  {
    name: 'Envases de Plástico',
    description: 'Botellas, frascos, tarros en PET, HDPE, PP. Ideales para alimentos, bebidas, limpieza.',
    count: 650,
    icon: 'co_present',
    color: 'bg-primary-fixed',
  },
  {
    name: 'Envases de Vidrio',
    description: 'Botellas, frascos, viales en vidrio borosilicato y soda. Alta pureza y reciclabilidad.',
    count: 320,
    icon: 'water_drop',
    color: 'bg-tertiary-container',
  },
  {
    name: 'Tapas y Accesorios',
    description: 'Amplio catálogo de cierres, dosificadores, pipetas y empaques complementarios.',
    count: 230,
    icon: 'rotate_90_degrees_ccw',
    color: 'bg-secondary-container',
  },
];

export default function Products() {
  return (
    <section id="productos" className="py-24 bg-surface">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">
            Nuestros Productos
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Explora nuestra amplia gama de envases de plástico y vidrio, diseñados para preservar la calidad de tus productos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/productos/${cat.name.toLowerCase().replace(' ', '-')}`}
              className="group block bg-surface-container p-6 rounded-3xl border border-outline-variant hover:border-primary transition-all hover:shadow-xl"
            >
              <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-3xl text-on-surface">{cat.icon}</span>
              </div>
              <h3 className="text-2xl font-headline font-semibold mb-3 text-on-surface">
                {cat.name}
              </h3>
              <p className="text-on-surface-variant mb-4">{cat.description}</p>
              <div className="inline-flex items-center text-primary font-semibold group-hover:underline">
                Ver catálogo ({cat.count} modelos)
                <span className="material-symbols-outlined ml-1 text-lg">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
