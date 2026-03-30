'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  alt: string;
}

const sampleProduct: Product = {
  id: 1,
  name: 'Nordic Clear Flint 750ml',
  category: 'Premium Spirit',
  price: '$5.12 / unit',
  description: 'Extra-clear heavy flint glass with a weighted base designed for high-end boutique spirits.',
  image: '/prod_pharma_v2.png',
  alt: 'Premium glass spirit bottle'
};

// Propuesta 1: Glass Full (glassmorphism completa)
export function CardProposal1() {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-glass hover:shadow-glass-lg transition-all">
      <div className="relative h-56 bg-surface-light">
        <img src={sampleProduct.image} alt={sampleProduct.alt} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2">
          {sampleProduct.category}
        </span>
        <h3 className="font-headline text-xl text-on-surface mb-2">{sampleProduct.name}</h3>
        <p className="text-on-surface-variant text-sm line-clamp-2 mb-4">{sampleProduct.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary text-lg">{sampleProduct.price}</span>
          <button className="bg-primary text-white px-4 py-2 rounded-xl font-medium hover:bg-primary/90 transition flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">shopping_cart</span>
            Cotizar
          </button>
        </div>
      </div>
    </div>
  );
}

// Propuesta 2: Minimal (líneas limpias, sin sombras)
export function CardProposal2() {
  return (
    <div className="bg-surface rounded-xl border border-outline-variant/30 p-4 hover:border-primary/50 transition-colors">
      <div className="h-48 mb-4 overflow-hidden rounded-lg">
        <img src={sampleProduct.image} alt={sampleProduct.alt} className="w-full h-full object-cover" />
      </div>
      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{sampleProduct.category}</span>
      <h3 className="font-headline text-lg text-on-surface mt-1 mb-2">{sampleProduct.name}</h3>
      <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">{sampleProduct.description}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-on-surface">{sampleProduct.price}</span>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90">Cotizar</button>
          <button className="p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-light">
            <span className="material-symbols-outlined">info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Propuesta 3: Elevated (sombra pronunciada, hover lift)
export function CardProposal3() {
  return (
    <div className="bg-surface rounded-2xl shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden border border-outline-variant/10">
      <div className="h-56 relative">
        <img src={sampleProduct.image} alt={sampleProduct.alt} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
          {sampleProduct.category}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-headline text-xl text-on-surface mb-2">{sampleProduct.name}</h3>
        <p className="text-on-surface-variant text-sm line-clamp-2 mb-4">{sampleProduct.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{sampleProduct.price}</span>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary/90 shadow-lg hover:shadow-primary/30 transition flex items-center gap-2">
            <span className="material-symbols-outlined">shopping_cart</span>
            Cotizar
          </button>
        </div>
      </div>
    </div>
  );
}

// Propuesta 4: Bordered (acento en borde color primary)
export function CardProposal4() {
  return (
    <div className="bg-surface border-2 border-primary rounded-2xl overflow-hidden hover:shadow-primary/20 hover:shadow-xl transition-all">
      <div className="h-52 bg-surface-light relative">
        <img src={sampleProduct.image} alt={sampleProduct.alt} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <span className="text-white text-xs font-bold uppercase tracking-wide">{sampleProduct.category}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-headline text-lg text-on-surface mb-2">{sampleProduct.name}</h3>
        <p className="text-on-surface-variant text-sm line-clamp-2 mb-4">{sampleProduct.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-primary text-xl">{sampleProduct.price}</span>
          <button className="border-2 border-primary text-primary px-4 py-2 rounded-xl font-medium hover:bg-primary hover:text-white transition flex items-center gap-2">
            <span className="material-symbols-outlined">shopping_cart</span>
            Cotizar
          </button>
        </div>
      </div>
    </div>
  );
}

// Propuesta 5: Dark Card (fondo oscuro, texto claro)
export function CardProposal5() {
  return (
    <div className="bg-surface-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-outline-variant/20">
      <div className="h-56 relative">
        <img src={sampleProduct.image} alt={sampleProduct.alt} className="w-full h-full object-cover brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-transparent to-transparent" />
      </div>
      <div className="p-5 -mt-8 relative">
        <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-2">
          {sampleProduct.category}
        </span>
        <h3 className="font-headline text-xl text-white mb-2">{sampleProduct.name}</h3>
        <p className="text-gray-300 text-sm line-clamp-2 mb-4">{sampleProduct.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary text-lg">{sampleProduct.price}</span>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition flex items-center gap-2">
            <span className="material-symbols-outlined">shopping_cart</span>
            Cotizar
          </button>
        </div>
      </div>
    </div>
  );
}

// Propuesta 6: Image First (imagen grande, texto abajo compacto)
export function CardProposal6() {
  return (
    <div className="bg-surface rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
      <div className="h-64">
        <img src={sampleProduct.image} alt={sampleProduct.alt} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 text-center">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{sampleProduct.category}</span>
        <h3 className="font-headline text-lg text-on-surface mt-1 mb-2">{sampleProduct.name}</h3>
        <p className="text-on-surface-variant text-sm mb-3">{sampleProduct.price}</p>
        <button className="w-full bg-primary text-white py-2.5 rounded-xl font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">shopping_cart</span>
          Cotizar
        </button>
      </div>
    </div>
  );
}

// Propuesta 7: Centered (contenido centrado, badge redondo)
export function CardProposal7() {
  return (
    <div className="bg-surface rounded-2xl p-6 text-center border border-outline-variant/20 hover:border-primary/40 hover:shadow-lg transition-all">
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-surface-light overflow-hidden border-4 border-primary/10">
        <img src={sampleProduct.image} alt={sampleProduct.alt} className="w-full h-full object-cover" />
      </div>
      <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
        {sampleProduct.category}
      </span>
      <h3 className="font-headline text-xl text-on-surface mb-2">{sampleProduct.name}</h3>
      <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">{sampleProduct.description}</p>
      <p className="text-primary font-bold text-lg mb-4">{sampleProduct.price}</p>
      <button className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2 mx-auto w-fit">
        <span className="material-symbols-outlined">shopping_cart</span>
        Cotizar
      </button>
    </div>
  );
}

// Propuesta 8: Compact (sin descripción, info mínima)
export function CardProposal8() {
  return (
    <div className="bg-surface rounded-xl overflow-hidden border border-outline-variant/20 hover:shadow-md transition-all group">
      <div className="h-48 relative">
        <img src={sampleProduct.image} alt={sampleProduct.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-primary">
          {sampleProduct.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-headline text-base text-on-surface mb-2 line-clamp-1">{sampleProduct.name}</h3>
        <p className="text-primary font-bold mb-3">{sampleProduct.price}</p>
        <div className="flex gap-2">
          <button className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition">Cotizar</button>
          <button className="p-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-light">
            <span className="material-symbols-outlined text-sm">info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Propuesta 9: Rounded XL (radius muy grande, padding generoso)
export function CardProposal9() {
  return (
    <div className="bg-surface rounded-[2rem] p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border border-outline-variant/10">
      <div className="h-56 rounded-[1.5rem] overflow-hidden mb-5 bg-surface-light">
        <img src={sampleProduct.image} alt={sampleProduct.alt} className="w-full h-full object-cover" />
      </div>
      <div className="space-y-3">
        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-primary/20 to-primary/5 text-primary text-sm font-bold rounded-full">
          {sampleProduct.category}
        </span>
        <h3 className="font-headline text-2xl text-on-surface">{sampleProduct.name}</h3>
        <p className="text-on-surface-variant line-clamp-2">{sampleProduct.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-primary">{sampleProduct.price}</span>
          <button className="bg-primary text-white px-6 py-3 rounded-[1.25rem] font-medium hover:bg-primary/90 shadow-lg hover:shadow-primary/30 transition flex items-center gap-2">
            <span className="material-symbols-outlined">shopping_cart</span>
            Cotizar
          </button>
        </div>
      </div>
    </div>
  );
}

// Propuesta 10: Split Layout (imagen izquierda, contenido derecha)
export function CardProposal10() {
  return (
    <div className="bg-surface rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-outline-variant/10 flex flex-col md:flex-row">
      <div className="md:w-2/5 h-48 md:h-auto relative">
        <img src={sampleProduct.image} alt={sampleProduct.alt} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 bg-primary text-white px-3 py-1 text-xs font-bold rounded-tr-lg">
          {sampleProduct.category}
        </div>
      </div>
      <div className="md:w-3/5 p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-headline text-xl text-on-surface mb-2">{sampleProduct.name}</h3>
          <p className="text-on-surface-variant text-sm line-clamp-3">{sampleProduct.description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-primary text-xl">{sampleProduct.price}</span>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition flex items-center gap-2">
            <span className="material-symbols-outlined">shopping_cart</span>
            Cotizar
          </button>
        </div>
      </div>
    </div>
  );
}

// Página que muestra las 10 propuestas
export default function CardProposalsPage() {
  const proposals = [
    { id: 1, name: 'Glass Full', Component: CardProposal1 },
    { id: 2, name: 'Minimal', Component: CardProposal2 },
    { id: 3, name: 'Elevated', Component: CardProposal3 },
    { id: 4, name: 'Bordered', Component: CardProposal4 },
    { id: 5, name: 'Dark Card', Component: CardProposal5 },
    { id: 6, name: 'Image First', Component: CardProposal6 },
    { id: 7, name: 'Centered', Component: CardProposal7 },
    { id: 8, name: 'Compact', Component: CardProposal8 },
    { id: 9, name: 'Rounded XL', Component: CardProposal9 },
    { id: 10, name: 'Split Layout', Component: CardProposal10 },
  ];

  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-headline text-4xl text-on-surface mb-2">Propuestas de Tarjetas de Producto</h1>
        <p className="text-on-surface-variant mb-8">Selecciona el estilo que prefieres para implementar en el catálogo.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {proposals.map(({ id, name, Component }) => (
            <div key={id} className="space-y-3">
              <div className="bg-surface-light rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-primary">Propuesta {id}</span>
                  <span className="text-xs text-on-surface-variant bg-surface px-2 py-1 rounded">{name}</span>
                </div>
                <Component />
              </div>
              <button
                onClick={() => alert(`Seleccionaste: ${name}`)}
                className="w-full py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition"
              >
                Elegir esta
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
