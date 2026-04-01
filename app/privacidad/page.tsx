import NavbarPublic from '@/components/NavbarPublic';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';

async function getSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'global' },
    });
    return settings;
  } catch (error) {
    console.error("Error fetching settings for privacy page during build:", error);
    return null;
  }
}

export default async function PrivacyPage() {
  const settings = await getSettings();
  const brandName = settings?.brandName || 'Nuestra Empresa';

  return (
    <main className="min-h-screen bg-surface">
      <NavbarPublic 
        brandName={brandName} 
        logoImageUrl={settings?.logoImageUrl || null} 
        authenticated={false} 
        logoHeight={(settings as any)?.logoHeight || 40}
        minimal={true}
      />
      
      <div className="max-w-4xl mx-auto px-8 py-32">
        <h1 className="font-headline text-4xl font-black text-on-surface mb-8 tracking-tighter uppercase italic">Aviso de Privacidad</h1>
        
        <div className="prose prose-slate max-w-none text-on-surface-variant font-light leading-relaxed space-y-6">
          <p>
            En <strong>{brandName}</strong>, valoramos su privacidad y estamos comprometidos con la protección de sus datos personales. Este aviso de privacidad describe cómo recopilamos, usamos y protegemos su información.
          </p>

          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">1. Información que Recopilamos</h2>
            <p>Recopilamos información que usted nos proporciona directamente al completar formularios de contacto, tales como su nombre, dirección de correo electrónico, empresa y mensaje.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">2. Uso de la Información</h2>
            <p>Utilizamos la información recopilada exclusivamente para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responder a sus consultas y solicitudes de cotización.</li>
              <li>Enviar información relevante sobre nuestros productos y servicios.</li>
              <li>Mejorar la experiencia de usuario en nuestro sitio web.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">3. Protección de Datos</h2>
            <p>Implementamos medidas de seguridad técnicas y administrativas para proteger sus datos personales contra el acceso no autorizado, alteración o divulgación.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">4. Transferencia a Terceros</h2>
            <p><strong>{brandName}</strong> no vende ni alquila sus datos personales a terceros. Sus datos solo podrán ser compartidos con proveedores de servicios que nos ayuden en nuestra operación, bajo estrictos acuerdos de confidencialidad.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">5. Derechos ARCO</h2>
            <p>Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, puede contactarnos a través de {settings?.contactEmail || 'nuestros canales oficiales'}.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">6. Cambios en este Aviso</h2>
            <p>Nos reservamos el derecho de actualizar este aviso en cualquier momento para reflejar cambios en nuestras prácticas o requerimientos legales.</p>
          </section>

          <p className="pt-8 text-sm opacity-50 border-t border-outline-variant">Última actualización: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <Footer 
        brandName={brandName} 
        logoImageUrl={settings?.logoImageUrl} 
        logoHeight={(settings as any)?.logoHeight}
        footerAboutText={(settings as any)?.footerAboutText}
        facebookUrl={(settings as any)?.facebookUrl}
        instagramUrl={(settings as any)?.instagramUrl}
        tiktokUrl={(settings as any)?.tiktokUrl}
      />
    </main>
  );
}
