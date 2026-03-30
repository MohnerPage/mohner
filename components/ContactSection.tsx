'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Aquí se conectaría con API real de contacto
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación
      setStatus('success');
      setForm({ name: '', email: '', company: '', industry: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="py-24 px-8 bg-surface-dim">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface mb-6">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <p className="text-on-surface-variant text-lg font-light leading-relaxed mb-8">
              Ya sea que necesites una cotización, información técnica o deseas convertirte en distribuidor, nuestro equipo está listo para ayudarte.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-surface mb-1">visit us</h4>
                  <p className="text-on-surface-variant">Av. Industrial 1234, Sector manufacture<br />Monterrey, NL. México 64820</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">email</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-surface mb-1">Email</h4>
                  <p className="text-on-surface-variant">contact@crystalline-container.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">phone</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-surface mb-1">Call us</h4>
                  <p className="text-on-surface-variant">+52 (81) 1234 5678</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className="bg-surface-container p-8 rounded-xl shadow-md border border-outline-variant/20" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full h-11 px-4 bg-surface border border-outline-variant/30 rounded-lg focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full h-11 px-4 bg-surface border border-outline-variant/30 rounded-lg focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full h-11 px-4 bg-surface border border-outline-variant/30 rounded-lg focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Industry</label>
                  <select
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    className="w-full h-11 px-4 bg-surface border border-outline-variant/30 rounded-lg focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  >
                    <option value="">Select...</option>
                    <option value="food">Food & Beverage</option>
                    <option value="cosmetics">Cosmetics & Personal Care</option>
                    <option value="pharma">Pharmaceutical</option>
                    <option value="chemical">Chemical & Industrial</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-lg focus:outline-none focus:border-primary/50 transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full h-12 bg-primary text-on-primary font-headline font-bold rounded-lg hover:bg-primary-dim transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>Sending...<span className="material-symbols-outlined animate-spin">refresh</span></>
                ) : (
                  <>Send Message <span className="material-symbols-outlined">arrow_forward</span></>
                )}
              </button>
              {status === 'success' && (
                <p className="mt-4 text-sm text-success text-center">Message sent successfully! We'll contact you soon.</p>
              )}
              {status === 'error' && (
                <p className="mt-4 text-sm text-error text-center">Error sending message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
