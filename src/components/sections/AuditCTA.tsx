'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { AnimatedText } from '@/components/motion/AnimatedText';
import { IconMapPin, IconWorld, IconBrandWhatsapp, IconAlertTriangle, IconCoin, IconScan, IconCheck } from '@tabler/icons-react';
import { trackEvent } from '@/lib/analytics';

const bullets = [
  { icon: IconMapPin, text: 'Análisis de tu Google Maps actual' },
  { icon: IconWorld, text: 'Análisis técnico de tu sitio web' },
  { icon: IconBrandWhatsapp, text: 'Estado de tu WhatsApp Business' },
  { icon: IconCoin, text: 'Estimación de fugas de dinero' },
];

const industries = ['Restaurante / café / bar','Retail / tienda física','Servicios profesionales','Hospitality (hotel, Airbnb)','Salud y bienestar','Inmobiliaria / desarrollos','Otro'];

export function AuditCTA() {
  const [formState, setFormState] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [formData, setFormData] = useState({ name: '', whatsapp: '', email: '', business: '', industry: '', city: '', website: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    trackEvent('audit_request', { industry: formData.industry });
    try {
      const res = await fetch('/api/audit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, locale: 'es' }) });
      if (!res.ok) throw new Error('fail');
      setFormState('success');
    } catch { setFormState('error'); }
  };

  const inputCls = 'w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:border-indigo-500/40 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200';

  return (
    <section id="audit-form" className="relative py-20 md:py-32 overflow-hidden bg-[#050505]">
      
      {/* Background Radar Animation */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <circle cx="200" cy="500" r="100" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="200" cy="500" r="200" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="200" cy="500" r="300" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
          <motion.line 
            x1="200" y1="500" x2="500" y2="500" stroke="indigo" strokeWidth="1" 
            animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ originX: "200px", originY: "500px" }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div>
            <span className="text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-3 block">Diagnóstico de Autoridad</span>
            <AnimatedText text="Antes de venderte, te decimos qué te falta." className="font-display text-4xl md:text-5xl font-normal leading-[1.1] tracking-tight text-white mb-6" />
            
            <div className="relative mb-8 p-5 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center gap-4 overflow-hidden group">
              <div className="relative z-10 w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">
                <IconAlertTriangle size={20} />
              </div>
              <div className="relative z-10">
                <p className="text-white text-sm font-medium mb-0.5 italic">Detectamos fugas de dinero en 48h.</p>
                <p className="text-white/30 text-[11px] leading-relaxed">PDF técnico de 6 páginas con un análisis honesto.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bullets.map((b, i) => (
                <FadeIn key={b.text} delay={0.1 + i * 0.05} x={-10}>
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-white/5 border border-white/10"><b.icon size={14} strokeWidth={1.5} className="text-indigo-400" /></div>
                    <span className="text-white/40 text-[13px]">{b.text}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.2} x={20}>
            <div className="p-6 md:p-10 rounded-[2rem] bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] shadow-xl relative max-w-md ml-auto">
              {formState === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-emerald-400"><IconCheck size={28} /></div>
                  <h3 className="font-display text-xl text-white mb-1">Solicitud Recibida</h3>
                  <p className="text-white/30 text-xs italic">Análisis en progreso.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="flex items-center gap-2.5 mb-4">
                    <IconScan className="text-indigo-400" size={18} />
                    <h3 className="font-display text-lg text-white">Auditoría Gratuita</h3>
                  </div>
                  
                  <input type="text" required placeholder="Nombre completo" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={inputCls} />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input type="tel" required placeholder="WhatsApp" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className={inputCls} />
                    <input type="email" required placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={inputCls} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" required placeholder="Negocio" value={formData.business} onChange={e => setFormData({...formData, business: e.target.value})} className={inputCls} />
                    <select required value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} className={`${inputCls} ${!formData.industry ? 'text-white/20' : ''}`}>
                      <option value="" disabled>Giro del negocio</option>
                      {industries.map(ind => <option key={ind} value={ind} className="bg-[#050505] text-white">{ind}</option>)}
                    </select>
                  </div>
                  
                  <div className="pt-2">
                    <motion.button 
                      type="submit" 
                      disabled={formState === 'loading'} 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      className="relative w-full py-3.5 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest overflow-hidden transition-all duration-300 shadow-lg"
                    >
                      <motion.div 
                        initial={{ left: '-100%' }}
                        whileHover={{ left: '100%' }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
                      />
                      <span className="relative z-10">
                        {formState === 'loading' ? 'Enviando...' : 'Obtener Auditoría'}
                      </span>
                    </motion.button>
                  </div>

                  <p className="text-white/10 text-[9px] text-center uppercase tracking-widest mt-2 font-medium italic">48h de entrega · PDF técnico</p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
