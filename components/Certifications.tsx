'use client';

export default function Certifications({
  certTitle,
  certSubtitle,
  certCards
}: {
  certTitle?: string,
  certSubtitle?: string,
  certCards?: any
}) {
  const renderedTitle = certTitle || "Certificaciones y Normas";
  const renderedSubtitle = certSubtitle || "Operamos bajo los más rigurosos estándares internacionales, garantizando la máxima calidad y seguridad en cada envase que producimos.";
  
  // Función de parseo ultra-segura
  const getCerts = () => {
    try {
      if (!certCards) return [];
      if (Array.isArray(certCards)) return certCards;
      if (typeof certCards === 'string') {
        const parsed = JSON.parse(certCards);
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

  let certifications = getCerts();

  if (certifications.length === 0) {
    certifications = [
      { name: 'ISO 9001', description: 'Gestión de Calidad' },
      { name: 'ISO 14001', description: 'Gestión Ambiental' },
      { name: 'FDA', description: 'FDA Registration' },
      { name: 'CE', description: 'Conformidad Europea' },
      { name: 'BRC', description: 'British Retail Consortium' },
      { name: 'HACCP', description: 'Análisis de Peligros' },
    ];
  }

  return (
    <section id="certificaciones" className="py-24 px-8 bg-surface-container">
      <div className="max-w-screen-2xl mx-auto text-center mb-16">
        <h2 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface mb-4">
          {renderedTitle}
        </h2>
        <p className="text-on-surface-variant text-lg font-light max-w-2xl mx-auto">
          {renderedSubtitle}
        </p>
      </div>

      <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
        {certifications.map((cert: any, idx: number) => (
          <div
            key={idx}
            className="bg-surface border border-outline-variant/30 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl">verified</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface mb-2">{cert?.name || ''}</h3>
            <p className="text-on-surface-variant text-sm">{cert?.description || ''}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
