interface WhyCard {
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  whyTitle?: string;
  whySubtitle?: string;
  whyCards?: any;
}

export default function WhyChooseUs({ whyTitle, whySubtitle, whyCards }: WhyChooseUsProps) {
  // Función de parseo ultra-segura
  const getCards = (): WhyCard[] => {
    try {
      if (!whyCards) return [];
      if (Array.isArray(whyCards)) return whyCards;
      if (typeof whyCards === 'string') {
        const parsed = JSON.parse(whyCards);
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

  let cards = getCards();

  if (cards.length === 0) {
    cards = [
      { icon: 'workspace_premium', title: 'Calidad Certificada', description: 'Procesos validados bajo ISO 9001.' },
      { icon: 'precision_manufacturing', title: 'Fabricación Flexible', description: 'Moldes personalizados.' },
      { icon: 'eco', title: 'Sostenibilidad Real', description: 'Reducimos huella de carbono.' },
      { icon: 'local_shipping', title: 'Logística Nacional', description: 'Entrega en 72h.' }
    ];
  }

  return (
    <section id="valores" className="py-24 px-8 bg-surface-container scroll-mt-20">
      <div className="max-w-screen-2xl mx-auto text-center mb-16">
        <h2 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface mb-4">
          {whyTitle || 'Why Choose Crystalline'}
        </h2>
        <p className="text-on-surface-variant text-lg font-light max-w-2xl mx-auto">
          {whySubtitle || 'No solo vendemos envases; ofrecemos soluciones completas que impulsan el éxito de tu producto.'}
        </p>
      </div>

      <div className="max-w-screen-2xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((adv, idx) => (
          <div key={idx} className="bg-surface p-8 rounded-xl border border-outline-variant/20 hover:border-primary/40 transition-all hover:shadow-glass">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">{adv.icon || 'star'}</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface mb-3">{adv.title || ''}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{adv.description || ''}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
