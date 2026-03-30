'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import { Download, Upload, FileSpreadsheet, Plus, Loader2, Save, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  material: string;
  capacity: string;
  dimensions: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  const loadProducts = async () => {
    setLoading(true);
    try {
      const authRes = await fetch('/api/auth/me');
      const authData = await authRes.json();
      if (!authData.authenticated) {
        router.replace('/login');
        return;
      }
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // --- Funciones de Excel ---

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        id: '',
        name: 'Ejemplo de Envase',
        category: 'Industrial',
        price: 15.50,
        description: 'Descripción del producto aquí',
        material: 'HDPE',
        capacity: '500ml',
        dimensions: '20x10x5 cm',
        height: 20,
        diameter: 10,
        thread: '28/410',
        colors: 'Blanco, Natural',
        imageUrl: '',
        galleryUrls: ''
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Plantilla");
    XLSX.writeFile(wb, "plantilla_crystalline.xlsx");
  };

  const handleExport = () => {
    const dataToExport = products.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description,
      material: p.material,
      capacity: p.capacity,
      dimensions: p.dimensions,
      imageUrl: p.imageUrl,
      createdAt: p.createdAt
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventario");
    XLSX.writeFile(wb, `respaldo_inventario_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setMessage({ type: '', text: '' });

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        if (data.length === 0) {
          throw new Error('El archivo está vacío.');
        }

        const response = await fetch('/api/products/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (response.ok) {
          setMessage({ type: 'success', text: `¡Éxito! ${result.successCount} productos procesados correctamente.` });
          loadProducts(); // Recargar la lista
        } else {
          throw new Error(result.error || 'Error al procesar el archivo.');
        }
      } catch (err: any) {
        setMessage({ type: 'error', text: err.message });
      } finally {
        setIsProcessing(false);
        e.target.value = ''; // Limpiar el input
      }
    };
    reader.readAsBinaryString(file);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(p => p.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    
    const confirm = window.confirm(`¿Estás seguro de que deseas eliminar ${selectedIds.length} productos? Esta acción no se puede deshacer.`);
    if (!confirm) return;

    setIsProcessing(true);
    try {
      const res = await fetch('/api/products/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: result.message });
        setSelectedIds([]);
        loadProducts();
      } else {
        throw new Error(result.error || 'Error al eliminar');
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="py-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">Inventario Crystalline</h1>
            <p className="text-base text-slate-500">Gestión centralizada y carga masiva de productos.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full md:w-auto">
            {/* Botón Nuevo */}
            <a
              href="/admin/products/new"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white h-11 px-4 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-md active:scale-95"
            >
              <Plus size={18} />
              <span className="whitespace-nowrap">Nuevo</span>
            </a>

            {/* Importar */}
            <label className="flex items-center justify-center gap-2 bg-slate-900 text-white h-11 px-4 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md cursor-pointer active:scale-95">
              {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              <span className="whitespace-nowrap">{isProcessing ? '...' : 'Importar'}</span>
              <input type="file" onChange={handleImport} accept=".xlsx, .xls, .csv" className="hidden" disabled={isProcessing} />
            </label>

            {/* Plantilla */}
            <button 
              onClick={handleDownloadTemplate}
              className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 h-11 px-4 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              title="Bajar formato base"
            >
              <FileSpreadsheet size={16} className="text-emerald-600" />
              <span className="whitespace-nowrap">Plantilla</span>
            </button>

            {/* Respaldo */}
            <button 
              onClick={handleExport}
              className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 h-11 px-4 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              title="Respaldar todo"
            >
              <Download size={16} className="text-blue-600" />
              <span className="whitespace-nowrap">Respaldo</span>
            </button>
          </div>
        </div>

        {/* Barra de acciones masivas (Sticky) */}
        {selectedIds.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-3">
              <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                {selectedIds.length}
              </span>
              <p className="text-sm font-bold text-red-900">Productos seleccionados</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedIds([])}
                className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700"
              >
                Cancelar
              </button>
              <button 
                onClick={handleBulkDelete}
                disabled={isProcessing}
                className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                Eliminar Seleccionados
              </button>
            </div>
          </div>
        )}

        {/* Mensajes de feedback */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'} flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300`}>
            {message.type === 'success' ? <CheckCircle2 size={20} className="text-emerald-600" /> : <AlertCircle size={20} className="text-red-600" />}
            <span className="text-sm font-bold">{message.text}</span>
            <button onClick={() => setMessage({ type: '', text: '' })} className="ml-auto text-xs font-bold opacity-50 hover:opacity-100">✕</button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Cargando productos...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-surface-container p-8 rounded-xl">
            <p className="text-on-surface-variant mb-4">Aún no hay productos.</p>
            <a href="/admin/products/new" className="text-primary font-semibold hover:underline">Crear el primero</a>
          </div>
        ) : (
          <div className="overflow-x-auto bg-surface-container rounded-xl border border-outline-variant">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary-fixed/20 border-b border-outline-variant">
                  <th className="px-4 py-4 w-12 text-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      checked={selectedIds.length === products.length && products.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-primary w-16">ID</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-primary">Nombre</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-primary">Categoría</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-primary">Material</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-primary">Capacidad</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-primary">Precio</th>
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-primary w-28 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className={`border-b border-outline-variant/30 hover:bg-surface-container-high transition-colors ${selectedIds.includes(product.id) ? 'bg-emerald-50/50' : ''}`}>
                    <td className="px-4 py-4 text-center">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        checked={selectedIds.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                      />
                    </td>
                    <td className="px-4 py-4 text-sm text-on-surface-variant">{product.id}</td>
                    <td className="px-4 py-4 font-semibold text-on-surface">{product.name}</td>
                    <td className="px-4 py-4 text-sm text-on-surface-variant">{product.category}</td>
                    <td className="px-4 py-4 text-sm text-on-surface-variant capitalize">{product.material}</td>
                    <td className="px-4 py-4 text-sm text-on-surface-variant">{product.capacity}{product.capacity ? ' ml' : ''}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-on-surface">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-4 text-right">
                      <a href={`/admin/products/${product.id}`} className="inline-block text-emerald-600 hover:text-emerald-800 hover:underline text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors border border-emerald-200 whitespace-nowrap">
                        Editar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer className="bg-surface-dim border-t border-outline-variant">
        <div className="py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold text-on-surface font-headline uppercase">TU LOGO</span>
            <p className="font-body text-xs font-light text-on-surface-variant">© 2024 TU LOGO Container Corp. Excelencia Industrial.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
