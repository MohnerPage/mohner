import ProductCard from '@/components/ProductPreview';

export default function PreviewPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Vista Previa del Componente</h1>
        <ProductCard />
      </div>
    </main>
  );
}
