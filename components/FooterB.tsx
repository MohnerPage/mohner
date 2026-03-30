'use client';

import Link from 'next/link';

export default function FooterB() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Columna 1: Marca */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              <span className="text-orange-500">ENVASES</span>PRO
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Líder en distribución de envases de vidrio y plástico para industria. Calidad, servicio y experiencia.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-orange-400 transition"><span className="material-symbols-outlined">facebook</span></a>
              <a href="#" className="text-slate-400 hover:text-orange-400 transition"><span className="material-symbols-outlined">linkedin</span></a>
              <a href="#" className="text-slate-400 hover:text-orange-400 transition"><span className="material-symbols-outlined">email</span></a>
            </div>
          </div>

          {/* Columna 2: Catálogo */}
          <div>
            <h4 className="text-white font-bold mb-4">Catálogo</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/catalog?material=vidrio" className="hover:text-orange-400 transition">Envases de Vidrio</Link></li>
              <li><Link href="/catalog?material=pet" className="hover:text-orange-400 transition">Botellas PET</Link></li>
              <li><Link href="/catalog?material=hdpe" className="hover:text-orange-400 transition">Contenedores HDPE</Link></li>
              <li><Link href="/catalog?material=aluminio" className="hover:text-orange-400 transition">Tapas y Aluminio</Link></li>
              <li><Link href="/catalog?material=farmaceutico" className="hover:text-orange-400 transition">Farmacéutico</Link></li>
            </ul>
          </div>

          {/* Columna 3: Empresa */}
          <div>
            <h4 className="text-white font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-400 transition">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Certificaciones</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Sostenibilidad</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Trabaja con Nosotros</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-white font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-orange-500 mt-0.5">location_on</span>
                <span>Av. Industrial 1234, Parque Tecnológico, 45000 Guadalajara, Jal.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-orange-500">phone</span>
                <span>+52 33 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-orange-500">email</span>
                <span>ventas@envasespro.com.mx</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between text-xs text-slate-500">
          <p>© 2026 EnvasesPro. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-orange-400 transition">Privacidad</Link>
            <Link href="/terms" className="hover:text-orange-400 transition">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
