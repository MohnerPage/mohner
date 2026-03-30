'use client';

import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CatalogPDF } from './CatalogPDF';
import { FileDown, Loader2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  material: string;
  capacity: string;
  dimensions: string;
  category: string;
  price: number;
  imageUrl?: string | null;
}

export default function DownloadCatalog({ products }: { products: Product[] }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
      <PDFDownloadLink
        document={<CatalogPDF products={products} />}
        fileName="Catalogo_Crystalline_2024.pdf"
        className="flex items-center justify-center gap-3 px-6 h-[52px] bg-primary text-white font-bold uppercase tracking-widest rounded-lg hover:bg-primary-dim transition-all shadow-md active:scale-[0.98] group w-full sm:w-auto"
      >
        {({ loading, error }) => (
          <>
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <FileDown size={20} className="group-hover:-translate-y-0.5 transition-transform" />
            )}
            <span className="text-[13px]">{loading ? 'Generando Catálogo...' : 'Descargar Catálogo PDF'}</span>
            {error && <span className="text-[10px] text-red-300 lowercase ml-2">(Error)</span>}
          </>
        )}
      </PDFDownloadLink>
  );
}
