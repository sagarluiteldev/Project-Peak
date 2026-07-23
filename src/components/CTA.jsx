import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { ArrowRight, MessageCircle } from 'lucide-react';

const CTA = () => {
  const { t } = useSettings();

  const handleWhatsApp = () => {
    const message = "Hi! I'd like to plan a trek in Nepal. Can you help me get started?";
    window.open(`https://wa.me/9779801234567?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-12 w-full">
      <div className="max-w-4xl mx-auto text-center bg-slateTeal text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl border border-white/10 relative overflow-hidden">
        <span className="bg-neonLime text-black px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest inline-block mb-3">
          START YOUR JOURNEY
        </span>
        <h2 className="font-condensed font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase text-white tracking-wide mb-4">
          {t('cta.title')}
        </h2>
        <p className="font-sans text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          {t('cta.desc')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#destinations"
            className="magnetic-btn bg-neonLime hover:bg-[#b8e600] text-black font-condensed font-extrabold text-xl uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span>{t('cta.btn')}</span>
            <ArrowRight size={20} />
          </a>
          <button 
            onClick={handleWhatsApp}
            className="border-2 border-white/40 hover:border-white text-white px-8 py-3.5 rounded-full font-condensed font-extrabold text-xl uppercase tracking-widest flex items-center justify-center gap-2 transition-all backdrop-blur-sm"
          >
            <MessageCircle size={20} />
            <span>{t('cta.whatsapp')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
