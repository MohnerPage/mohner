'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NavbarPublic({ 
  brandName, 
  logoImageUrl, 
  authenticated,
  logoHeight = 40,
  showCatalog = true,
  showAbout = true,
  showValues = true,
  showCertifications = true,
  showTestimonials = true,
  showContact = false
}: { 
  brandName: string, 
  logoImageUrl: string | null,
  authenticated: boolean,
  logoHeight?: number,
  showCatalog?: boolean,
  showAbout?: boolean,
  showValues?: boolean,
  showCertifications?: boolean,
  showTestimonials?: boolean,
  showContact?: boolean
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(targetId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Inicio', href: '#home', show: true },
    { name: 'Catálogo', href: '#productos', show: showCatalog },
    { name: 'Nosotros', href: '#about', show: showAbout },
    { name: 'Valores', href: '#valores', show: showValues },
    { name: 'Certificaciones', href: '#certificaciones', show: showCertifications },
    { name: 'Testimonios', href: '#testimonios', show: showTestimonials },
  ].filter(link => link.show);

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-none">
      <div className="flex justify-between items-center px-8 h-20 w-full max-w-screen-2xl mx-auto overflow-visible">
        <Link href="/" onClick={(e) => handleScroll(e, '#home')} className="flex items-start gap-3 h-full overflow-visible pt-0">
          {logoImageUrl ? (
            <img 
              src={logoImageUrl} 
              alt={brandName} 
              className="object-contain drop-shadow-md transition-all duration-300" 
              style={{ 
                height: `${logoHeight}px`,
                maxHeight: 'none',
                width: 'auto'
              }}
            />
          ) : (
            <span className="text-2xl font-headline font-extrabold tracking-tighter text-primary">
              {brandName}
            </span>
          )}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={`/${link.href}`} 
              onClick={(e) => handleScroll(e, link.href)} 
              className="text-[10px] font-black uppercase shadow-none tracking-widest text-on-surface hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link href={authenticated ? "/admin/configuracion" : "/login"} className="bg-primary text-on-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 whitespace-nowrap">
            {authenticated ? "Administrar Sitio" : "Iniciar Sesión"}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="xl:hidden p-2 rounded-lg hover:bg-surface-variant text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl text-on-surface">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface border-t border-outline-variant shadow-lg absolute w-full left-0 top-20 animate-in slide-in-from-top-4 duration-300">
          <div className="px-8 py-6 space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={`/${link.href}`} 
                onClick={(e) => handleScroll(e, link.href)} 
                className="block text-base font-bold uppercase tracking-widest text-on-surface hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link href={authenticated ? "/admin/configuracion" : "/login"} className="block w-full text-center bg-primary text-on-primary px-6 py-3 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95">
              {authenticated ? "Administrar Sitio" : "Iniciar Sesión"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
