'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import imageCompression from 'browser-image-compression';
import { Upload, X, Loader2, ArrowLeft, Save, Info } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    description: '',
    material: 'glass',
    capacity: '',
    height: '',
    diameter: '',
    thread: '',
    colors: '',
    category: 'General',
    price: '',
    imageUrl: '',
    galleryUrls: [] as string[],
  });
  
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [galleryUploading, setGalleryUploading] = useState(false);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          router.replace('/login');
        } else {
          setLoading(false);
        }
      })
      .catch(() => router.replace('/login'));
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true
      };

      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);

      const formData = new FormData();
      formData.append('file', compressedFile, file.name);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Error al subir la imagen');

      const data = await res.json();
      setForm(prev => ({ ...prev, imageUrl: data.imageUrl }));
      
    } catch (error) {
      alert('Hubo un error al subir la foto. Intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setForm(prev => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setGalleryUploading(true);
      const newUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1200, useWebWorker: true });
        const formData = new FormData();
        formData.append('file', compressedFile, file.name);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!res.ok) throw new Error('Error al subir la imagen de galería');
        const data = await res.json();
        newUrls.push(data.imageUrl);
      }

      setForm(prev => ({ ...prev, galleryUrls: [...prev.galleryUrls, ...newUrls] }));
    } catch (error) {
      alert('Hubo un error al subir imágenes de la galería.');
    } finally {
      setGalleryUploading(false);
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  const removeGalleryImage = (index: number) => {
    setForm(prev => {
      const newArray = [...prev.galleryUrls];
      newArray.splice(index, 1);
      return { ...prev, galleryUrls: newArray };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        material: form.material,
        capacity: form.capacity,
        dimensions: '', // legacy
        height: form.height,
        diameter: form.diameter,
        thread: form.thread,
        colors: form.colors,
        category: form.category,
        price: parseFloat(form.price) || 0,
        imageUrl: form.imageUrl || null,
        galleryUrls: form.galleryUrls.length > 0 ? form.galleryUrls : null,
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('¡Envase guardado con éxito! Ya aparece en tu página web.');
        router.push('/admin/products');
      } else {
        const data = await res.json();
        alert('Ups, error al guardar: ' + (data.error || 'Intenta nuevamente.'));
      }
    } catch (err) {
      alert('Error de conexión. Verifica tu internet e intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-slate-500 font-bold animate-pulse">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl pb-24">
      <a href="/admin/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors">
        <ArrowLeft size={24} /> Volver a Mi Catálogo
      </a>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Nuevo Envase</h1>
        <p className="text-sm text-slate-600">Sube la foto de tu envase y llena sus datos. No te preocupes, puedes dejar vacíos los datos que no te sepas.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
        
        {/* 1. SECCION DE FOTO */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-slate-900 border-b pb-2">1. Fotos del Envase</label>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Foto Principal (Portada)</p>
              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6 transition-colors hover:bg-blue-50">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            
            {preview ? (
              <div className="relative aspect-auto h-48 max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 group">
                <img src={preview} alt="Vista previa" className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-white rounded-md text-slate-900 font-medium hover:bg-slate-100 transition-all text-sm">Cambiar</button>
                  <button type="button" onClick={removeImage} className="px-4 py-2 bg-red-500 rounded-md text-white font-medium hover:bg-red-600 transition-all text-sm">Borrar</button>
                </div>
                {uploading && (
                  <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center">
                    <Loader2 className="animate-spin text-blue-600 mb-2" size={24} />
                    <p className="font-medium text-sm text-blue-800">Cargando...</p>
                  </div>
                )}
              </div>
            ) : (
              <div onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center py-6 cursor-pointer">
                {uploading ? (
                  <>
                    <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
                    <p className="text-sm font-medium text-blue-800">Preparando tu foto...</p>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                      <Upload size={20} />
                    </div>
                    <p className="text-sm font-medium text-slate-800">Toca aquí para elegir una foto</p>
                    <p className="text-xs text-slate-500 mt-1">Puedes tomarla con tu celular o elegir de tu galería</p>
                    <p className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded mt-2 font-bold uppercase tracking-wider">Tamaño sugerido: 800 x 800 px</p>
                  </>
                )}
              </div>
            )}
            
                {/* Opcional URL */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Enlace de internet (Opcional)</label>
                  <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="https://..." type="url" />
                </div>
              </div>
            </div>

            {/* GALERÍA DE IMÁGENES */}
            <div className="pt-4">
              <p className="text-sm font-medium text-slate-700 mb-2">Galería (Imágenes adicionales para el carrusel)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {form.galleryUrls.map((url, idx) => (
                  <div key={idx} className="relative aspect-square bg-slate-100 rounded-lg border border-slate-200 overflow-hidden group">
                    <img src={url} alt={`Imagen ${idx + 1}`} className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                <button 
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                >
                  {galleryUploading ? (
                    <Loader2 className="animate-spin mb-1" size={24} />
                  ) : (
                    <>
                      <Upload size={24} className="mb-1" />
                      <span className="text-xs font-semibold">Añadir Fotos</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">800x800</span>
                    </>
                  )}
                </button>
                <input type="file" ref={galleryInputRef} onChange={handleGalleryChange} accept="image/*" multiple className="hidden" />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* 2. DATOS PRINCIPALES */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-slate-900 border-b pb-2">2. Información Principal</label>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del Envase <span className="text-red-500">*</span></label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800" placeholder="Ej. Envase Cuadrado 500ml" type="text" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">¿De qué material es?</label>
              <select name="material" value={form.material} onChange={handleChange} className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800">
                <option value="glass">Botella de Vidrio</option>
                <option value="plastic">Botella de Plástico</option>
                <option value="other">Tapa / Otro material</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Categoría (Familia)</label>
              <input name="category" value={form.category} onChange={handleChange} className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800" placeholder="Ej. Licores, Farmacia..." type="text" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Descripción (Para qué sirve)</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800 resize-y" placeholder="Ej. Frasco ideal para guardar miel o mermelada gruesa..." />
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* 3. DETALLES TÉCNICOS */}
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-semibold text-slate-900 border-b pb-2 mb-3">3. Detalles para tus Clientes</label>
            <div className="flex items-start gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg border border-blue-100">
              <Info size={18} className="flex-shrink-0 mt-0.5 text-blue-500" />
              <p className="text-xs">Estos datos aparecerán en la pantalla de la botella. Puedes llenarlos ahora o dejarlos en blanco para después.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Capacidad / Volumen</label>
              <input name="capacity" value={form.capacity} onChange={handleChange} className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:border-blue-500" placeholder="Ej. 750 ml" type="text" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Precio Unitario ($)</label>
              <input name="price" value={form.price} onChange={handleChange} className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:border-blue-500" placeholder="Ej. 12.50" type="number" step="0.01" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Colores disponibles</label>
              <input name="colors" value={form.colors} onChange={handleChange} className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:border-blue-500" placeholder="Ej. Transparente, Ámbar" type="text" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Altura Total</label>
              <input name="height" value={form.height} onChange={handleChange} className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:border-blue-500" placeholder="Ej. 13 cm" type="text" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Diámetro de la base</label>
              <input name="diameter" value={form.diameter} onChange={handleChange} className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:border-blue-500" placeholder="Ej. 7.5 cm" type="text" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Rosca / Cuello</label>
              <input name="thread" value={form.thread} onChange={handleChange} className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:border-blue-500" placeholder="Ej. Rosca 28/400" type="text" />
            </div>
          </div>
        </div>

        {/* BOTÓN FINAL */}
        <div className="pt-6 mt-8 border-t border-slate-200">
          <button 
            type="submit" 
            disabled={saving || uploading}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold shadow-sm transition-all active:scale-[0.98] disabled:bg-slate-400"
          >
            {saving ? (
              <span className="animate-pulse">Publicando envase...</span>
            ) : (
              <>
                <Save size={18} />
                Guardar Envase y Publicar
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
