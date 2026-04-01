"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Ruler, Droplets, Palette, ShieldCheck, Phone } from "lucide-react";

interface ProductData {
  id: string | number;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  material?: string;
  capacity?: string;
  galleryUrls?: string[];
}

export default function ProductCard({ product, whatsappNumber }: { product: ProductData; whatsappNumber: string }) {

  // Combinamos los datos dinámicos de la DB con los placeholders técnicos
  const data = {
    name: product.name,
    category: product.category,
    price: product.price,
    shortDescription: product.description,
    inStock: true,
    images: [
      product.image,
      ...(product.galleryUrls && Array.isArray(product.galleryUrls) ? product.galleryUrls : []),
    ],
    technicalSpecs: {
      material: product.material || "Plástico Blanco (PET)",
      capacity: product.capacity || "Aprox. 250 ml",
      thread: "21.50 mm",
      weight: "25 gramos",
      height: "130.00 mm",
      diameter: "58.32 mm",
      colors: "Blanco Opaque",
    }
  };

  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % data.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev === 0 ? data.images.length - 1 : prev - 1));

  return (
    <>
      {/* TARJETA PRINCIPAL (ESTILO 6 - IMAGE FIRST) */}
      <div className="w-72 shrink-0 md:w-full snap-center bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-gray-100 flex flex-col">
        
        {/* Sección del Carrusel (Imagen Grande) */}
        <div className="relative h-[280px] w-full bg-slate-50 group" style={{ height: '280px', position: 'relative', overflow: 'hidden' }}>
          <Image 
            src={data.images[currentImage]} 
            alt={data.name} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-4 mix-blend-multiply transition-opacity duration-300"
            style={{ objectFit: 'contain' }}
          />
          
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={prevImage} className="p-1.5 rounded-full bg-white/80 text-gray-700 hover:bg-white shadow">
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextImage} className="p-1.5 rounded-full bg-white/80 text-gray-700 hover:bg-white shadow">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {data.images.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all ${currentImage === idx ? "w-4 bg-orange-500" : "w-1.5 bg-gray-300"}`}
              />
            ))}
          </div>

          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-gray-100 shadow-sm flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${data.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">{data.category}</span>
          </div>
        </div>

        {/* Información Compacta */}
        <div className="p-5 text-center flex-1 flex flex-col">
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="font-bold text-lg text-gray-900 leading-tight line-clamp-2 h-12 flex items-center justify-center">
              {data.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed h-10 overflow-hidden text-ellipsis">
              {data.shortDescription}
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-50">
            <p className="font-bold text-gray-900 text-lg mb-3">{data.price}</p>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 active:scale-[0.98]"
            >
              Ver Detalles y Cotizar
            </button>
          </div>
        </div>
      </div>

      {/* MODAL EMERGENTE DE ESPECIFICACIONES TÉCNICAS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-2/5 bg-slate-50 relative p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100" style={{ position: 'relative' }}>
              <div className="relative w-full aspect-square mb-6" style={{ width: '100%', aspectRatio: '1/1', position: 'relative' }}>
                 <Image src={data.images[currentImage]} alt="Detalle" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-contain mix-blend-multiply drop-shadow-lg" style={{ objectFit: 'contain' }} />
              </div>
              
              <div className="flex gap-2">
                {data.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`relative w-16 h-16 rounded-lg border-2 overflow-hidden bg-white ${currentImage === idx ? 'border-orange-500' : 'border-transparent'}`}
                  >
                    <Image src={img} alt="Thumb" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-3/5 p-8 flex flex-col h-full md:max-h-[80vh] overflow-y-auto">
              <div>
                <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-2 block">{data.category}</span>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{data.name}</h2>
                <p className="text-gray-500 leading-relaxed mb-8">{data.shortDescription}</p>
              </div>

              <div className="mb-10">
                <h3 className="font-bold text-gray-900 mb-4 text-lg border-b border-gray-100 pb-2">Dimensiones Principales</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="flex flex-col items-center bg-orange-50/50 p-4 rounded-xl border border-orange-100/50 text-center">
                    <Ruler className="text-orange-400 mb-2" size={24} />
                    <p className="text-[10px] text-orange-600/80 font-bold uppercase tracking-wider mb-1">Altura Total</p>
                    <p className="text-lg font-extrabold text-gray-900">{data.technicalSpecs.height}</p>
                  </div>
                  
                  <div className="flex flex-col items-center bg-orange-50/50 p-4 rounded-xl border border-orange-100/50 text-center">
                    <Ruler className="text-orange-400 mb-2" size={24} />
                    <p className="text-[10px] text-orange-600/80 font-bold uppercase tracking-wider mb-1">Diámetro Base</p>
                    <p className="text-lg font-extrabold text-gray-900">{data.technicalSpecs.diameter}</p>
                  </div>

                  <div className="flex flex-col items-center bg-orange-50/50 p-4 rounded-xl border border-orange-100/50 text-center">
                    <Ruler className="text-orange-400 mb-2" size={24} />
                    <p className="text-[10px] text-orange-600/80 font-bold uppercase tracking-wider mb-1">Rosca/Cuello</p>
                    <p className="text-lg font-extrabold text-gray-900">{data.technicalSpecs.thread}</p>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-4 text-lg border-b border-gray-100 pb-2">Otras Características</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-3 items-start bg-slate-50 p-3 rounded-xl border border-gray-100">
                    <Droplets className="text-slate-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Capacidad / Peso</p>
                      <p className="text-sm font-semibold text-gray-800">{data.technicalSpecs.capacity} • {data.technicalSpecs.weight}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start bg-slate-50 p-3 rounded-xl border border-gray-100">
                    <ShieldCheck className="text-slate-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Material</p>
                      <p className="text-sm font-semibold text-gray-800">{data.technicalSpecs.material}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start bg-slate-50 p-3 rounded-xl border border-gray-100 col-span-1 sm:col-span-2">
                    <Palette className="text-slate-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Colores Disponibles</p>
                      <p className="text-sm font-semibold text-gray-800">{data.technicalSpecs.colors}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <a 
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n%20para%20el%20envase:%20${encodeURIComponent(data.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/20"
                >
                  <Phone size={20} className="fill-current" />
                  Solicitar Cotización por WhatsApp
                </a>
                <p className="text-center text-xs text-gray-400 mt-3 font-medium">Asesoría inmediata por equipo especializado</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
