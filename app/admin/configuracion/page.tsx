'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, AlertCircle, CheckCircle2, Upload, Loader2, Image as ImageIcon, Hash, Layout, HelpCircle, Star, Award, MessageSquare, Quote, Info, ShieldCheck, Mail, Phone, Globe, Link as LinkIcon, Share2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function ConfigPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingHeroBg, setUploadingHeroBg] = useState(false);
  const [uploadingAbout, setUploadingAbout] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    brandName: '',
    logoImageUrl: '',
    whatsappNumber: '',
    heroTitle: '',
    heroSubtitle: '',
    heroImageUrl: '',
    heroBgImageUrl: '',
    aboutText: '',
    aboutImageUrl: '',
    aboutTitle: '',
    aboutStats: '[]',
    aboutImageSize: 400,
    whyTitle: '',
    whySubtitle: '',
    whyCards: '[]',
    certTitle: '',
    certSubtitle: '',
    certCards: '[]',
    testiTitle: '',
    testimonials: '[]',
    siteTitle: '',
    faviconUrl: '',
    logoHeight: 40,
    heroImageSize: 400,
    contactEmail: '',
    footerAboutText: '',
    facebookUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    showCatalog: true,
    showAbout: true,
    showValues: true,
    showCertifications: true,
    showTestimonials: true,
    showContact: false
  });

  const [stats, setStats] = useState<any[]>([]);
  const [whyCards, setWhyCards] = useState<any[]>([]);
  const [certCards, setCertCards] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  const heroInputRef = useRef<HTMLInputElement>(null);
  const heroBgInputRef = useRef<HTMLInputElement>(null);
  const aboutInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          setFormData({
            brandName: data.brandName || '',
            logoImageUrl: data.logoImageUrl || '',
            whatsappNumber: data.whatsappNumber || '',
            heroTitle: data.heroTitle || '',
            heroSubtitle: data.heroSubtitle || '',
            heroImageUrl: data.heroImageUrl || '',
            heroBgImageUrl: data.heroBgImageUrl || '',
            aboutText: data.aboutText || '',
            aboutImageUrl: data.aboutImageUrl || '',
            aboutTitle: data.aboutTitle || '',
            aboutStats: data.aboutStats || '[]',
            aboutImageSize: data.aboutImageSize || 400,
            whyTitle: data.whyTitle || '',
            whySubtitle: data.whySubtitle || '',
            whyCards: data.whyCards || '[]',
            certTitle: data.certTitle || '',
            certSubtitle: data.certSubtitle || '',
            certCards: data.certCards || '[]',
            testiTitle: data.testiTitle || '',
            testimonials: data.testimonials || '[]',
            siteTitle: data.siteTitle || '',
            faviconUrl: data.faviconUrl || '',
            logoHeight: data.logoHeight || 40,
            heroImageSize: data.heroImageSize || 400,
            contactEmail: data.contactEmail || '',
            footerAboutText: data.footerAboutText || '',
            facebookUrl: data.facebookUrl || '',
            instagramUrl: data.instagramUrl || '',
            linkedinUrl: data.linkedinUrl || '',
            showCatalog: data.showCatalog !== undefined ? data.showCatalog : true,
            showAbout: data.showAbout !== undefined ? data.showAbout : true,
            showValues: data.showValues !== undefined ? data.showValues : true,
            showCertifications: data.showCertifications !== undefined ? data.showCertifications : true,
            showTestimonials: data.showTestimonials !== undefined ? data.showTestimonials : true,
            showContact: data.showContact !== undefined ? data.showContact : false,
          });

          const parseJsonSafe = (val: any) => {
            try {
              if (!val) return [];
              let parsed = typeof val === 'string' ? JSON.parse(val) : val;
              // Handle potential double stringification
              if (typeof parsed === 'string') {
                parsed = JSON.parse(parsed);
              }
              return Array.isArray(parsed) ? parsed : [];
            } catch (e) {
              console.error('Error parsing JSON:', e);
              return [];
            }
          };

          setStats(parseJsonSafe(data.aboutStats));
          setWhyCards(parseJsonSafe(data.whyCards));
          setCertCards(parseJsonSafe(data.certCards));
          setTestimonials(parseJsonSafe(data.testimonials));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setStats(newStats);
  };

  const handleWhyCardChange = (index: number, field: string, value: string) => {
    const newCards = [...whyCards];
    newCards[index] = { ...newCards[index], [field]: value };
    setWhyCards(newCards);
  };

  const handleCertCardChange = (index: number, field: string, value: string) => {
    const newCards = [...certCards];
    newCards[index] = { ...newCards[index], [field]: value };
    setCertCards(newCards);
  };

  const handleTestimonialChange = (index: number, field: string, value: string) => {
    const newTestis = [...testimonials];
    newTestis[index] = { ...newTestis[index], [field]: value };
    setTestimonials(newTestis);
  };

  const addCert = () => setCertCards([...certCards, { name: '', description: '' }]);
  const removeCert = (index: number) => setCertCards(certCards.filter((_, i) => i !== index));

  const addTestimonial = () => setTestimonials([...testimonials, { quote: '', author: '', role: '' }]);
  const removeTestimonial = (index: number) => setTestimonials(testimonials.filter((_, i) => i !== index));

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const dataToSave = {
        ...formData,
        aboutStats: stats,
        whyCards: whyCards,
        certCards: certCards,
        testimonials: testimonials
      };

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      if (!res.ok) throw new Error('Error al guardar');

      setMessage({ type: 'success', text: '¡Configuración actualizada correctamente!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al guardar los cambios.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (field === 'heroImageUrl') setUploadingHero(true);
      if (field === 'heroBgImageUrl') setUploadingHeroBg(true);
      if (field === 'aboutImageUrl') setUploadingAbout(true);
      if (field === 'logoImageUrl') setUploadingLogo(true);

      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);

      const formDataObj = new FormData();
      formDataObj.append('file', compressedFile, file.name);

      const res = await fetch('/api/upload', { method: 'POST', body: formDataObj });
      if (!res.ok) throw new Error('Error al subir');

      const data = await res.json();
      setFormData(prev => ({ ...prev, [field]: data.imageUrl }));
    } catch (error) {
      alert('Error al subir imagen');
    } finally {
      setUploadingHero(false);
      setUploadingHeroBg(false);
      setUploadingAbout(false);
      setUploadingLogo(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-slate-500">Cargando...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4">
      {/* Header Sticky */}
      <div className="flex justify-between items-center mb-12 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-4 z-50">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Panel de Control</h1>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Configuración Landing Page</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:bg-slate-300"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Guardando...' : 'Publicar Cambios'}
        </button>
      </div>

      {message.text && (
        <div className={`p-5 mb-8 rounded-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500 shadow-lg ${
          message.type === 'success' ? 'bg-emerald-500 border-emerald-400 text-white shadow-emerald-500/20' : 'bg-rose-500 border-rose-400 text-white shadow-rose-500/20'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <p className="font-black uppercase tracking-widest text-xs">{message.text}</p>
        </div>
      )}

      <div className="space-y-10">
        
        {/* 1. BRANDING & IDENTIDAD */}
        <section className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-slate-50 p-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white"><Star size={16} /></div>
            <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">01. Identidad Digital</h2>
          </div>
          <div className="p-8 space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Logo de Marca</label>
                <div onClick={() => logoInputRef.current?.click()} className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all group overflow-hidden">
                  <input type="file" ref={logoInputRef} onChange={(e) => handleImageUpload(e, 'logoImageUrl')} className="hidden" />
                  {formData.logoImageUrl ? <img src={formData.logoImageUrl} className="h-full w-full object-contain p-4 group-hover:scale-110 transition-transform" /> : uploadingLogo ? <Loader2 className="animate-spin text-slate-400" /> : <Upload size={24} className="text-slate-300" />}
                </div>
              </div>
              <div className="md:col-span-2 space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Nombre Público</label>
                  <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-slate-900 outline-none transition-all font-bold text-slate-800" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Altura Visual del Logo: {formData.logoHeight}px</label>
                  <input type="range" min="20" max="240" value={formData.logoHeight} onChange={(e) => setFormData({...formData, logoHeight: parseInt(e.target.value)})} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900" />
                  <div className="flex justify-between text-[8px] font-black text-slate-300 uppercase mt-2"><span>Mini</span><span>Standard</span><span>XL</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PORTADA (HERO) */}
        <section className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden shadow-sm">
          <div className="bg-slate-50 p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white"><Layout size={16} /></div>
              <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">02. Portada (Inicio)</h2>
            </div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Siempre Activo</span>
          </div>
          <div className="p-8 space-y-8">
             <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-4">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Imagen Central 1:1</label>
                 <div onClick={() => heroInputRef.current?.click()} className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer overflow-hidden group">
                   <input type="file" ref={heroInputRef} onChange={(e) => handleImageUpload(e, 'heroImageUrl')} className="hidden" />
                   {formData.heroImageUrl ? <img src={formData.heroImageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /> : uploadingHero ? <Loader2 className="animate-spin text-slate-400" /> : <ImageIcon size={32} className="text-slate-200" />}
                 </div>
                 <div>
                    <label className="block text-[8px] font-black text-slate-300 uppercase mb-2">Escala: {formData.heroImageSize}px</label>
                    <input type="range" min="100" max="800" value={formData.heroImageSize} onChange={(e) => setFormData({...formData, heroImageSize: parseInt(e.target.value)})} className="w-full accent-slate-900" />
                 </div>
               </div>
               <div className="space-y-4">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Fondo del Hero</label>
                 <div onClick={() => heroBgInputRef.current?.click()} className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer overflow-hidden group">
                   <input type="file" ref={heroBgInputRef} onChange={(e) => handleImageUpload(e, 'heroBgImageUrl')} className="hidden" />
                   {formData.heroBgImageUrl ? <img src={formData.heroBgImageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-50" /> : <Layout size={32} className="text-slate-200" />}
                 </div>
                 <button onClick={() => setFormData({...formData, heroBgImageUrl: ''})} className="w-full py-2 bg-slate-50 rounded-xl text-[8px] font-black text-slate-400 uppercase hover:bg-rose-50 hover:text-rose-500 transition-all">Limpiar Fondo</button>
               </div>
             </div>
             <div className="space-y-6">
               <input type="text" name="heroTitle" value={formData.heroTitle} onChange={handleChange} placeholder="Título Principal" className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-xl italic" />
               <textarea name="heroSubtitle" value={formData.heroSubtitle} onChange={handleChange} rows={3} placeholder="Mensaje de impacto..." className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-medium leading-relaxed" />
             </div>
          </div>
        </section>

        {/* 3. CATÁLOGO */}
        <section className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden shadow-sm">
           <div className="bg-slate-50 p-5 border-b border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white"><ImageIcon size={16} /></div>
               <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">03. Catálogo de Productos</h2>
             </div>
             <div className="flex items-center gap-3">
               <span className={`text-[10px] font-black uppercase tracking-widest ${formData.showCatalog ? 'text-emerald-500' : 'text-slate-300'}`}>{formData.showCatalog ? 'Visible' : 'Oculto'}</span>
               <button onClick={() => setFormData({...formData, showCatalog: !formData.showCatalog})} className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.showCatalog ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.showCatalog ? 'translate-x-6' : 'translate-x-0'}`} />
               </button>
             </div>
           </div>
           <div className="p-8">
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Los productos se gestionan en la sección de Inventario. Aquí puedes controlar si el catálogo aparece en la landing page principal.</p>
           </div>
        </section>

        {/* 4. NOSOTROS (ABOUT) */}
        <section className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden shadow-sm">
           <div className="bg-slate-50 p-5 border-b border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white"><Info size={16} /></div>
               <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">04. Sobre Nosotros</h2>
             </div>
             <div className="flex items-center gap-3">
               <span className={`text-[10px] font-black uppercase tracking-widest ${formData.showAbout ? 'text-emerald-500' : 'text-slate-300'}`}>{formData.showAbout ? 'Visible' : 'Oculto'}</span>
               <button onClick={() => setFormData({...formData, showAbout: !formData.showAbout})} className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.showAbout ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.showAbout ? 'translate-x-6' : 'translate-x-0'}`} />
               </button>
             </div>
           </div>
           <div className="p-8 space-y-8">
             <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4">
                  <div onClick={() => aboutInputRef.current?.click()} className="aspect-video md:aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center cursor-pointer overflow-hidden">
                    <input type="file" ref={aboutInputRef} onChange={(e) => handleImageUpload(e, 'aboutImageUrl')} className="hidden" />
                    {formData.aboutImageUrl ? <img src={formData.aboutImageUrl} className="w-full h-full object-cover" /> : <ImageIcon size={32} className="text-slate-200" />}
                  </div>
                  <input type="range" min="200" max="1000" value={formData.aboutImageSize} onChange={(e) => setFormData({...formData, aboutImageSize: parseInt(e.target.value)})} className="w-full accent-slate-900" />
                </div>
                <div className="md:col-span-2 space-y-6">
                   <input type="text" name="aboutTitle" value={formData.aboutTitle} onChange={handleChange} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold" placeholder="Título Nosotros" />
                   <textarea name="aboutText" value={formData.aboutText} onChange={handleChange} rows={6} className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm leading-relaxed" placeholder="Historia / Misión..." />
                </div>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat: any, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100">
                  <input value={stat.value} onChange={(e) => handleStatChange(idx, 'value', e.target.value)} className="w-full bg-transparent font-black text-slate-900 text-lg outline-none" placeholder="28+" />
                  <input value={stat.label} onChange={(e) => handleStatChange(idx, 'label', e.target.value)} className="w-full bg-transparent font-black uppercase text-[8px] text-slate-400 outline-none" placeholder="Años" />
                </div>
              ))}
             </div>
           </div>
        </section>

        {/* 5. VALORES (WHY CHOOSE US) */}
        <section className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden shadow-sm">
           <div className="bg-slate-50 p-5 border-b border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white"><ShieldCheck size={16} /></div>
               <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">05. Nuestras Ventajas (Valores)</h2>
             </div>
             <div className="flex items-center gap-3">
               <span className={`text-[10px] font-black uppercase tracking-widest ${formData.showValues ? 'text-emerald-500' : 'text-slate-300'}`}>{formData.showValues ? 'Visible' : 'Oculto'}</span>
               <button onClick={() => setFormData({...formData, showValues: !formData.showValues})} className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.showValues ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.showValues ? 'translate-x-6' : 'translate-x-0'}`} />
               </button>
             </div>
           </div>
           <div className="p-8 space-y-8">
             <div className="space-y-4">
                <input type="text" name="whyTitle" value={formData.whyTitle} onChange={handleChange} placeholder="Título Ventajas" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold" />
                <textarea name="whySubtitle" value={formData.whySubtitle} onChange={handleChange} rows={2} placeholder="Subtítulo descriptivo" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm" />
             </div>
             <div className="grid md:grid-cols-2 gap-4">
                {whyCards.map((card: any, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 rounded-3xl border-2 border-slate-100 space-y-3">
                    <div className="flex items-center gap-3">
                       <span className="material-symbols-outlined text-slate-900 bg-white shadow-sm p-2 rounded-xl text-xl">{card.icon}</span>
                       <input value={card.title} onChange={(e) => handleWhyCardChange(idx, 'title', e.target.value)} className="flex-1 bg-transparent font-black text-xs uppercase outline-none" placeholder="Título Ventaja" />
                    </div>
                    <textarea value={card.description} onChange={(e) => handleWhyCardChange(idx, 'description', e.target.value)} className="w-full bg-transparent text-xs opacity-70 outline-none" rows={3} placeholder="Explicación..." />
                  </div>
                ))}
             </div>
           </div>
        </section>

        {/* 6. CERTIFICACIONES */}
        <section className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden shadow-sm transition-all hover:border-slate-200">
           <div className="bg-slate-50 p-5 border-b border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white"><Award size={16} /></div>
               <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">06. Certificaciones y Normas</h2>
             </div>
             <div className="flex items-center gap-3">
               <span className={`text-[10px] font-black uppercase tracking-widest ${formData.showCertifications ? 'text-emerald-500' : 'text-slate-300'}`}>{formData.showCertifications ? 'Visible' : 'Oculto'}</span>
               <button onClick={() => setFormData({...formData, showCertifications: !formData.showCertifications})} className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.showCertifications ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.showCertifications ? 'translate-x-6' : 'translate-x-0'}`} />
               </button>
             </div>
           </div>
           <div className="p-8 space-y-8">
              <div className="space-y-4">
                <input type="text" name="certTitle" value={formData.certTitle} onChange={handleChange} placeholder="Título Certificaciones" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold" />
                <textarea name="certSubtitle" value={formData.certSubtitle} onChange={handleChange} rows={2} placeholder="Descripción global" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {certCards.map((cert: any, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 relative group">
                    <button onClick={() => removeCert(idx)} className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs">×</button>
                    <input value={cert.name} onChange={(e) => handleCertCardChange(idx, 'name', e.target.value)} className="w-full bg-transparent font-black uppercase text-[10px] mb-1 outline-none text-slate-900" placeholder="Nombre" />
                    <input value={cert.description} onChange={(e) => handleCertCardChange(idx, 'description', e.target.value)} className="w-full bg-transparent text-[8px] font-bold text-slate-400 outline-none" placeholder="Descripción" />
                  </div>
                ))}
                <button onClick={addCert} className="aspect-square border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-[8px] font-black uppercase tracking-widest text-slate-300 hover:border-slate-900 hover:text-slate-900 transition-all">Añadir</button>
              </div>
           </div>
        </section>

        {/* 7. TESTIMONIOS */}
        <section className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden shadow-sm">
           <div className="bg-slate-50 p-5 border-b border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white"><MessageSquare size={16} /></div>
               <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">07. Testimonios</h2>
             </div>
             <div className="flex items-center gap-3">
               <span className={`text-[10px] font-black uppercase tracking-widest ${formData.showTestimonials ? 'text-emerald-500' : 'text-slate-300'}`}>{formData.showTestimonials ? 'Visible' : 'Oculto'}</span>
               <button onClick={() => setFormData({...formData, showTestimonials: !formData.showTestimonials})} className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.showTestimonials ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.showTestimonials ? 'translate-x-6' : 'translate-x-0'}`} />
               </button>
             </div>
           </div>
           <div className="p-8 space-y-8">
              <input type="text" name="testiTitle" value={formData.testiTitle} onChange={handleChange} placeholder="Título de Testimonios" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold" />
              <div className="space-y-4">
                {testimonials.map((testi: any, idx) => (
                  <div key={idx} className="p-6 bg-slate-50 rounded-3xl border-2 border-slate-100 relative group">
                     <button onClick={() => removeTestimonial(idx)} className="absolute top-4 right-4 w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 shadow-sm"><Hash size={14} /></button>
                     <div className="flex gap-4">
                        <Quote className="text-slate-200" size={32} />
                        <div className="flex-1 space-y-4 pt-2">
                           <textarea value={testi.quote} onChange={(e) => handleTestimonialChange(idx, 'quote', e.target.value)} placeholder="Su opinión..." className="w-full bg-transparent outline-none text-sm italic font-medium leading-relaxed" rows={3} />
                           <div className="grid md:grid-cols-2 gap-4">
                              <input value={testi.author} onChange={(e) => handleTestimonialChange(idx, 'author', e.target.value)} placeholder="Autor" className="bg-white p-3 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest" />
                              <input value={testi.role} onChange={(e) => handleTestimonialChange(idx, 'role', e.target.value)} placeholder="Empresa / Cargo" className="bg-white p-3 rounded-xl border border-slate-200 text-[10px] font-bold" />
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
                <button onClick={addTestimonial} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-900 transition-all">Nuevo Testimonio</button>
              </div>
           </div>
        </section>

         {/* 08. WHATSAPP & GLOBAL */}
         <section className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden shadow-sm">
            <div className="bg-slate-50 p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white"><Phone size={16} /></div>
                <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">08. Configuración WhatsApp & Global</h2>
              </div>
            </div>
           <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Phone size={12} className="text-emerald-500" /> WhatsApp (Sólo números)</label>
                    <input type="text" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} placeholder="521..." className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 font-bold" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Mail size={12} className="text-blue-500" /> Email de Contacto</label>
                    <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} placeholder="ventas@..." className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 font-bold" />
                 </div>
              </div>
           </div>
        </section>

        {/* 09. FOOTER & REDES SOCIALES */}
        <section className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden shadow-sm mb-20">
           <div className="bg-slate-50 p-5 border-b border-slate-100 flex items-center gap-3">
             <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white"><Quote size={16} /></div>
             <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">09. Footer & Redes Sociales</h2>
           </div>
           <div className="p-8 space-y-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Descripción Breve (Footer)</label>
                <textarea name="footerAboutText" value={formData.footerAboutText} onChange={handleChange} rows={3} placeholder="Distribuidores de envases..." className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-medium" />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic flex items-center gap-2"><Globe size={12} /> Facebook URL</label>
                    <input type="text" name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} placeholder="https://facebook.com/..." className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs font-bold" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic flex items-center gap-2"><Share2 size={12} /> Instagram URL</label>
                    <input type="text" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} placeholder="https://instagram.com/..." className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs font-bold" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic flex items-center gap-2"><LinkIcon size={12} /> LinkedIn URL</label>
                    <input type="text" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} placeholder="https://linkedin.com/..." className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-xs font-bold" />
                 </div>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
