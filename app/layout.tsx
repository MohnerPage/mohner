import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

import { prisma } from '@/lib/prisma';
 
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  let settings: any = null;
  try {
    settings = await prisma.siteSettings.findUnique({
      where: { id: 'global' }
    });
  } catch (error) {
    console.error("Metadata fetch failed during build:", error);
  }

  const absoluteTitle = settings?.siteTitle || 'Crystalline | Líder en Envases de Vidrio y Plástico en México';
  const iconUrl = settings?.faviconUrl || '/favicon.svg';

  return {
    title: absoluteTitle,
    description: 'Fabricantes de envases de vidrio y plástico de alta calidad para las industrias alimentaria, cosmética y farmacéutica. Soluciones sustentables y personalizadas.',
    keywords: 'envases, vidrio, plástico, botellas, frascos, empaques, Crystalline, México, sustentabilidad',
    icons: {
      icon: iconUrl,
    },
    openGraph: {
      title: absoluteTitle,
      description: 'Soluciones de envasado de alta gama para diversas industrias con enfoque en calidad y diseño.',
      type: 'website',
      locale: 'es_MX',
      siteName: settings?.brandName || 'Crystalline',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Tailwind CSS via CDN */}
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Manrope:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-surface font-body text-on-surface antialiased selection:bg-primary selection:text-on-primary" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
