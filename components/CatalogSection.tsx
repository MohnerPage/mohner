'use client';

import { useState, useRef } from 'react';
import DownloadCatalog from './DownloadCatalog';
import ProductCard from './ProductCard';
import { Search, XCircle } from 'lucide-react';


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

export default function CatalogSection({ products, dbProducts, whatsappNumber }: { products: ProductData[], dbProducts: any[], whatsappNumber: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const catalogRef = useRef<HTMLDivElement>(null);

  // Filtrado de productos basado en el buscador
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Cálculos para la paginación a nivel cliente
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Si se busca algo, regresar inmediatamente a la página 1
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Función para manejar el cambio de página con auto-scroll
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Se elimina el auto-scroll para que el usuario mantenga su posición visual al navegar
  };

  return (
    <>
      <div className="text-center mb-16" ref={catalogRef}>
        <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">Nuestros Productos</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto mb-8">
          Explora nuestra amplia gama de envases de plástico y vidrio, diseñados para preservar la calidad de tus productos.
        </p>
        
        {/* Controles del Catálogo: Barra de Herramientas Premium e Industrial */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-full w-full bg-white p-3 sm:p-4 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 mb-12">
          
          {/* Barra de Búsqueda Moderna y Cuadrada Fina */}
          <div className="relative w-full md:max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Ej: Gotero ámbar, PET 500ml..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-[52px] pl-12 pr-12 bg-gray-50/80 hover:bg-white border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-gray-800 text-sm sm:text-base font-medium placeholder:text-gray-400"
            />
            {/* Botón flotante para limpiar texto */}
            {searchTerm && (
              <button 
                onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label="Borrar búsqueda"
              >
                <XCircle className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Componente PDF - ahora usa w-full o w-auto */}
          <div className="shrink-0 w-full md:w-auto">
             <DownloadCatalog products={dbProducts} />
          </div>
        </div>
      </div>
      
      {/* Resultados Filtrados y Paginados */}
      {filteredProducts.length > 0 ? (
        <>
          <style jsx>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          <div className="flex overflow-x-auto snap-x snap-mandatory pb-12 px-4 -mx-4 gap-6 no-scrollbar md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 mb-4">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} whatsappNumber={whatsappNumber} />
            ))}
          </div>

          {/* Controles de Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button 
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Anterior
              </button>
              
              <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 font-bold transition-colors ${
                      currentPage === i + 1 
                        ? "bg-primary text-white" 
                        : "text-gray-600 hover:bg-gray-50 border-l border-gray-100 first:border-l-0"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-surface-container-high rounded-3xl border border-dashed border-outline-variant/50 max-w-4xl mx-auto shadow-sm">
          <Search className="h-16 w-16 text-on-surface-variant/30 mx-auto mb-6" />
          <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-3">No encontramos resultados</h3>
          <p className="text-on-surface-variant max-w-md mx-auto text-sm md:text-base">No hay ningún envase que coincida con "<strong className="text-primary">{searchTerm}</strong>". Prueba buscando con términos más generales.</p>
          <button 
            onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
            className="mt-8 px-6 py-2.5 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary/20 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>

      )}
    </>
  );
}
