export default function About({ 
  aboutText, 
  aboutImageUrl,
  aboutTitle,
  aboutStats,
  aboutImageSize
}: { 
  aboutText?: string, 
  aboutImageUrl?: string | null,
  aboutTitle?: string,
  aboutStats?: any,
  aboutImageSize?: number
}) {
  const renderedText = aboutText || "En Multi-envases y Plásticos Monher convertimos necesidades en soluciones de envasado...";
  const renderedTitle = aboutTitle || "Somos Crystalline";
  
  // Función de parseo ultra-segura
  const getStats = () => {
    try {
      if (!aboutStats) return null;
      if (Array.isArray(aboutStats)) return aboutStats;
      if (typeof aboutStats === 'string') {
        const parsed = JSON.parse(aboutStats);
        if (Array.isArray(parsed)) return parsed;
        // Caso de doble stringificación
        if (typeof parsed === 'string') {
          const doubleParsed = JSON.parse(parsed);
          if (Array.isArray(doubleParsed)) return doubleParsed;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  let statsArray = getStats();
  
  // Fallback si no es un array válido
  if (!statsArray || !Array.isArray(statsArray) || statsArray.length === 0) {
    statsArray = [
      { label: 'Años de experiencia', value: '28' },
      { label: 'Clientes confían', value: '750+' },
      { label: 'Envases/año', value: '15M' },
      { label: 'Tasa de cumplimiento', value: '99.8%' }
    ];
  }

  // Dividir los párrafos por los saltos de línea
  const paragraphs = renderedText.split('\n').filter(p => p.trim() !== '');

  return (
    <section id="about" className="py-24 px-8 bg-surface-dim">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface mb-6">
              {renderedTitle}
            </h2>
            <div className="prose text-on-surface-variant text-lg font-light leading-relaxed mb-8">
              {paragraphs.map((p, i) => (
                <p key={i} className="mb-4 text-justify">{p}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {statsArray.map((stat: any, index: number) => (
                <div key={index} className="px-6 py-3 bg-white border border-outline-variant rounded-lg shadow-sm">
                  <span className="block text-3xl font-bold text-primary">{stat?.value || ''}</span>
                  <span className="text-sm text-on-surface-variant">{stat?.label || ''}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary-dim/20 rounded-2xl blur-xl"></div>
            <img 
              src={aboutImageUrl || "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
              alt="Crystalline facility"
              className="relative object-cover rounded-xl shadow-lg h-auto"
              style={{ width: `${aboutImageSize || 400}px` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
