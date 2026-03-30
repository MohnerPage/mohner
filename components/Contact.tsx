'use client';

import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se enviaría el formulario; por ahora solo mostramos un mensaje
    alert('Gracias por contactarnos. Te respondemos en menos de 24h.');
    setForm({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section id="contacto" className="py-24 bg-surface-container">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Información de contacto */}
          <div>
            <h2 className="text-3xl font-headline font-bold text-on-surface mb-6">
              Contáctanos
            </h2>
            <p className="text-on-surface-variant mb-10">
              Estamos listos para ayudarte a encontrar el envase perfecto para tu producto. Completa el formulario y un asesor te contactará.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-fixed rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">phone</span>
                </div>
                <div>
                  <div className="font-semibold text-on-surface">Teléfono</div>
                  <div className="text-on-surface-variant">+52 (33) 1234 5678</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-fixed rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">email</span>
                </div>
                <div>
                  <div className="font-semibold text-on-surface">Email</div>
                  <div className="text-on-surface-variant">contacto@envasesplus.mx</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-fixed rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                </div>
                <div>
                  <div className="font-semibold text-on-surface">Dirección</div>
                  <div className="text-on-surface-variant">Av. Industrial 1234, Guadalajara, Jalisco, México</div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-3xl border border-outline-variant space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-on-surface">Nombre *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-on-surface">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-on-surface">Empresa</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-on-surface">Teléfono</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                  placeholder="+52 33 1234 5678"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface">Mensaje *</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:border-primary resize-none"
                placeholder="Cuéntanos sobre tu proyecto, cantidad aproximada y material preferido..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-semibold hover:bg-primary-dim transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <span className="material-symbols-outlined">send</span>
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
