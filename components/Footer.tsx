'use client';

import Link from 'next/link';

export default function Footer({ 
  brandName = "TU LOGO", 
  logoImageUrl, 
  logoHeight = 40,
  footerAboutText,
  facebookUrl,
  instagramUrl,
  tiktokUrl
}: { 
  brandName?: string, 
  logoImageUrl?: string | null, 
  logoHeight?: number,
  footerAboutText?: string,
  facebookUrl?: string | null,
  instagramUrl?: string | null,
  tiktokUrl?: string | null
}) {
  const defaultAbout = "Distribuidores de envases de vidrio y plástico para las industrias alimentaria, cosmética y farmacéutica.";

  return (
    <footer className="bg-surface-dim border-t border-outline-variant">
      <div className="max-w-screen-2xl mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          {/* Column 1: Brand */}
          <div className="max-w-md">
            <Link href="/" className="inline-block mb-6">
              {logoImageUrl ? (
                <img 
                  src={logoImageUrl} 
                  alt={brandName} 
                  className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" 
                  style={{ height: `${Math.min(logoHeight, 64)}px`, objectFit: 'contain' }}
                />
              ) : (
                <span className="text-2xl font-headline font-extrabold tracking-tighter text-primary italic uppercase">{brandName}</span>
              )}
            </Link>
            <p className="text-on-surface-variant text-base font-light leading-relaxed mb-8">
              {footerAboutText || defaultAbout}
            </p>
            
            <div className="flex gap-4">
              {facebookUrl && (
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-surface border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all shadow-sm">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {instagramUrl && (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-surface border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all shadow-sm">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.741 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.35.932 2.126 1.238c.765.301 1.636.501 2.913.56 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384s1.352-1.35 1.233-2.126c.301-.765.501-1.636.56-2.913.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126s-1.35-1.352-2.126-1.233c-.765-.301-1.636-.501-2.913-.56C15.667.014 15.259 0 12 0z"/><path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.162 4.162 0 1 1 0-8.324 4.162 4.162 0 0 1 0 8.324zM18.406 4.337a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
                </a>
              )}
              {tiktokUrl && (
                <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-surface border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all shadow-sm">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18c0 1.94-.66 3.82-1.88 5.17-1.3 1.42-3.15 2.22-5.12 2.22-1.97 0-3.82-.8-5.12-2.22-1.22-1.35-1.88-3.23-1.88-5.17s.66-3.82 1.88-5.17c1.3-1.42 3.15-2.22 5.12-2.22.42 0 .84.04 1.25.12v4.27c-.41-.08-.83-.12-1.25-.12-1.13 0-2.2.46-2.95 1.28-.71.79-1.08 1.86-1.08 3.04s.37 2.25 1.08 3.04c.75.82 1.82 1.28 2.95 1.28s2.2-.46 2.95-1.28c.71-.79 1.08-1.86 1.08-3.04L12.525.02z"/></svg>
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 md:text-right">
             <div className="space-y-4">
                <Link href="/privacidad" className="text-sm font-bold text-on-surface hover:text-primary transition-colors block uppercase tracking-widest">Política de Privacidad</Link>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-on-surface-variant font-medium">
            <Link href="/login" className="hover:text-primary transition-colors cursor-default select-none">©</Link> {new Date().getFullYear()} {brandName}. Todos los derechos reservados.
          </p>
          <div className="text-[10px] text-on-surface-variant uppercase font-black tracking-widest opacity-40">
            Excelencia en empaque industrial
          </div>
        </div>
      </div>
    </footer>
  );
}
