import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import About from '@/components/About';
import WhyChooseUs from '@/components/WhyChooseUs';
import Certifications from '@/components/Certifications';
import Testimonials from '@/components/Testimonials';
import CatalogSection from '@/components/CatalogSection';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// Los productos ahora se manejarán dinámicamente desde la base de datos.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has('auth_token');

  let dbProducts: any[] = [];
  let settings: any = null;

  try {
    dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });

    settings = await (prisma as any).siteSettings.findUnique({
      where: { id: 'global' }
    });
  } catch (error) {
    console.error("Database connection failed, using fallbacks:", error);
  }
  
  // ... (keeping fallbackSettings as updated in previous step)
  const fallbackSettings = {
    whatsappNumber: settings?.whatsappNumber || '5213312345678',
    heroTitle: settings?.heroTitle || 'Envases de Plástico y Vidrio que impulsan tu marca',
    heroSubtitle: settings?.heroSubtitle || 'Fabricamos y distribuimos envases de alta calidad para alimentos, bebidas, cosméticos y farmacéutica...',
    heroImageUrl: settings?.heroImageUrl || null,
    heroBgImageUrl: settings?.heroBgImageUrl || null,
    brandName: settings?.brandName || 'Crystalline',
    logoImageUrl: settings?.logoImageUrl || null,
    aboutText: settings?.aboutText || 'En Crystalline transformamos materias primas en obras de arte funcionales...',
    aboutImageUrl: settings?.aboutImageUrl || null,
    aboutTitle: settings?.aboutTitle || 'Somos Crystalline',
    aboutStats: settings?.aboutStats || '[]',
    aboutImageSize: settings?.aboutImageSize || 400,
    whyTitle: settings?.whyTitle || '',
    whySubtitle: settings?.whySubtitle || '',
    whyCards: settings?.whyCards || '[]',
    certTitle: settings?.certTitle || 'Certificaciones y Normas',
    certSubtitle: settings?.certSubtitle || '',
    certCards: settings?.certCards || '[]',
    testiTitle: settings?.testiTitle || 'Lo Que Dicen Nuestros Clientes',
    testimonialsData: settings?.testimonials || '[]',
    contactEmail: settings?.contactEmail || 'contacto@crystalline.com',
    logoHeight: (settings as any)?.logoHeight || 40,
    heroImageSize: (settings as any)?.heroImageSize || 400,
    footerAboutText: (settings as any)?.footerAboutText || 'Distribuidores de envases de vidrio y plástico para las industrias alimentaria, cosmética y farmacéutica.',
    facebookUrl: (settings as any)?.facebookUrl || '',
    instagramUrl: (settings as any)?.instagramUrl || '',
    tiktokUrl: (settings as any)?.tiktokUrl || '',
    showCatalog: settings?.showCatalog !== undefined ? settings.showCatalog : true,
    showAbout: settings?.showAbout !== undefined ? settings.showAbout : true,
    showValues: settings?.showValues !== undefined ? settings.showValues : true,
    showCertifications: settings?.showCertifications !== undefined ? settings.showCertifications : true,
    showTestimonials: settings?.showTestimonials !== undefined ? settings.showTestimonials : true,
    showContact: settings?.showContact !== undefined ? settings.showContact : false
  };

  // Mapear productos dinámicos
  const products = dbProducts.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: `$${p.price.toFixed(2)} / unidad`,
    description: p.description,
    image: p.imageUrl || '/placeholder-catalog.png',
    galleryUrls: (p as any).galleryUrls ? JSON.parse((p as any).galleryUrls as string) : [],
    material: p.material,
    capacity: p.capacity
  }));
  return (
    <>
      <NavbarPublic 
        brandName={fallbackSettings.brandName} 
        logoImageUrl={fallbackSettings.logoImageUrl} 
        logoHeight={fallbackSettings.logoHeight}
        authenticated={isAuthenticated}
        showCatalog={fallbackSettings.showCatalog}
        showAbout={fallbackSettings.showAbout}
        showValues={fallbackSettings.showValues}
        showCertifications={fallbackSettings.showCertifications}
        showTestimonials={fallbackSettings.showTestimonials}
        showContact={fallbackSettings.showContact}
      />
      <main>
        {/* Hero Section */}
        <section id="home" className="pt-40 md:pt-20 min-h-[60vh] flex items-center relative overflow-hidden bg-surface">
          {fallbackSettings.heroBgImageUrl ? (
            <div className="absolute inset-0 z-0">
              <img src={fallbackSettings.heroBgImageUrl} alt="Hero Background" className="w-full h-full object-cover opacity-15" />
            </div>
          ) : null}
          <div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 z-10">
              <div className="inline-flex items-center gap-2 bg-primary-container px-4 py-2 rounded-lg text-primary text-sm font-semibold">
                <span className="material-symbols-outlined text-base">eco</span>
                Soluciones 100% sustentables
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-headline font-bold leading-tight text-on-surface">
                {fallbackSettings.heroTitle}
              </h1>
              <p className="text-lg text-on-surface-variant max-w-lg">
                {fallbackSettings.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#productos" className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary-dim transition-colors shadow-lg active:scale-95">
                  <span className="material-symbols-outlined">inventory_2</span>
                  Ver catálogo
                </a>
                <a href={`https://wa.me/${fallbackSettings.whatsappNumber}?text=${encodeURIComponent('Hola, me comunico desde la página principal. Me interesa conocer sus productos.')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-[#25D366] text-[#25D366] px-8 py-4 rounded-xl font-semibold hover:bg-[#25D366] hover:text-white transition-colors shadow-sm active:scale-95">
                  <svg width="24" height="24" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  Contactar por WhatsApp
                </a>
              </div>
            </div>
            <div className="relative z-10 hidden md:flex items-center justify-center p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white/20 shadow-glass overflow-hidden mx-auto aspect-square h-auto" style={{ width: fallbackSettings.heroImageSize }}>
              <img 
                src={fallbackSettings.heroImageUrl || "/crystalline_logo.png"} 
                alt={fallbackSettings.brandName} 
                className="w-full h-full object-cover rounded-xl drop-shadow-2xl" 
              />
            </div>
          </div>
        </section>

        {/* Products Section */}
        {fallbackSettings.showCatalog && (
          <section id="productos" className="py-24 bg-surface">
            <div className="max-w-screen-2xl mx-auto px-8">
              <CatalogSection products={products} dbProducts={dbProducts} whatsappNumber={fallbackSettings.whatsappNumber} />
            </div>
          </section>
        )}

        {fallbackSettings.showAbout && (
          <About 
            aboutText={fallbackSettings.aboutText} 
            aboutImageUrl={fallbackSettings.aboutImageUrl} 
            aboutTitle={fallbackSettings.aboutTitle} 
            aboutStats={fallbackSettings.aboutStats}
            aboutImageSize={fallbackSettings.aboutImageSize}
          />
        )}
        
        {fallbackSettings.showValues && (
          <WhyChooseUs 
            whyTitle={fallbackSettings.whyTitle} 
            whySubtitle={fallbackSettings.whySubtitle} 
            whyCards={fallbackSettings.whyCards} 
          />
        )}

        {fallbackSettings.showCertifications && (
          <Certifications 
            certTitle={fallbackSettings.certTitle} 
            certSubtitle={fallbackSettings.certSubtitle} 
            certCards={fallbackSettings.certCards} 
          />
        )}

        {fallbackSettings.showTestimonials && (
          <Testimonials 
            testiTitle={fallbackSettings.testiTitle} 
            testimonialsData={fallbackSettings.testimonialsData} 
          />
        )}


      </main>
      <Footer 
        brandName={fallbackSettings.brandName} 
        logoImageUrl={fallbackSettings.logoImageUrl} 
        logoHeight={fallbackSettings.logoHeight}
        footerAboutText={fallbackSettings.footerAboutText}
        facebookUrl={fallbackSettings.facebookUrl}
        instagramUrl={fallbackSettings.instagramUrl}
        tiktokUrl={fallbackSettings.tiktokUrl}
      />
    </>
  );
}