import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Plane, Wallet, Compass } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

gsap.registerPlugin(ScrollTrigger);

const FeaturesBox = () => {
  const { t } = useSettings();
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = containerRef.current.querySelectorAll('.bento-item');
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            delay: index * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 92%'
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="py-6 md:py-10 px-4 sm:px-6 md:px-12 w-full">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <span className="bg-neonLime text-black px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest inline-block mb-2 shadow-sm">
            WHY PROJECT PEAK
          </span>
          <h2 className="font-condensed font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase text-darkSlate dark:text-creamBg tracking-wide">
            {t('feat.title')}
          </h2>
          <p className="font-sans text-darkSlate/60 dark:text-creamBg/60 max-w-xl mx-auto text-xs sm:text-sm mt-2">
            {t('feat.desc')}
          </p>
        </div>

        {/* Feature Grid with Spotlight Group Dimming */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:grid-rows-2 group/grid">
          
          {/* Large Item */}
          <div className="bento-item md:col-span-2 md:row-span-2 bg-white dark:bg-darkSlate/80 border border-creamBorder/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between group overflow-hidden relative shadow-sm hover:shadow-xl transition-all duration-300 group-hover/grid:opacity-60 hover:!opacity-100 hover:scale-[1.01]">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-neonLime/30 dark:bg-neonLime/20 flex items-center justify-center mb-6 group-hover:animate-bounce">
                <Plane size={28} className="text-darkSlate dark:text-neonLime transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-condensed font-extrabold text-3xl md:text-4xl uppercase mb-3 text-darkSlate dark:text-creamBg">
                {t('feat.flights')}
              </h3>
              <p className="font-sans text-darkSlate/70 dark:text-creamBg/70 text-xs sm:text-sm leading-relaxed max-w-md">
                {t('feat.flights.desc')}
              </p>
            </div>
          </div>

          {/* Medium Item */}
          <div className="bento-item md:col-span-2 bg-white dark:bg-darkSlate/80 border border-creamBorder/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 group-hover/grid:opacity-60 hover:!opacity-100 hover:scale-[1.01] group">
            <div className="w-12 h-12 rounded-xl bg-neonLime/30 dark:bg-neonLime/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <Wallet size={22} className="text-darkSlate dark:text-neonLime" />
            </div>
            <h3 className="font-condensed font-extrabold text-2xl uppercase mb-2 text-darkSlate dark:text-creamBg">{t('feat.payments')}</h3>
            <p className="font-sans text-darkSlate/70 dark:text-creamBg/70 text-xs leading-relaxed">
              {t('feat.payments.desc')}
            </p>
          </div>

          {/* Small Item 1 */}
          <div className="bento-item md:col-span-1 bg-white dark:bg-darkSlate/80 border border-creamBorder/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 group-hover/grid:opacity-60 hover:!opacity-100 hover:scale-[1.01] group">
            <div className="w-12 h-12 rounded-xl bg-neonLime/30 dark:bg-neonLime/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <Shield size={22} className="text-darkSlate dark:text-neonLime" />
            </div>
            <h3 className="font-condensed font-extrabold text-xl uppercase mb-2 text-darkSlate dark:text-creamBg">{t('feat.permits')}</h3>
            <p className="font-sans text-darkSlate/70 dark:text-creamBg/70 text-xs leading-relaxed">
              {t('feat.permits.desc')}
            </p>
          </div>

          {/* Small Item 2 */}
          <div className="bento-item md:col-span-1 bg-white dark:bg-darkSlate/80 border border-creamBorder/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 group-hover/grid:opacity-60 hover:!opacity-100 hover:scale-[1.01] group">
            <div className="w-12 h-12 rounded-xl bg-neonLime/30 dark:bg-neonLime/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <Compass size={22} className="text-darkSlate dark:text-neonLime" />
            </div>
            <h3 className="font-condensed font-extrabold text-xl uppercase mb-2 text-darkSlate dark:text-creamBg">{t('feat.weather')}</h3>
            <p className="font-sans text-darkSlate/70 dark:text-creamBg/70 text-xs leading-relaxed">
              {t('feat.weather.desc')}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesBox;
