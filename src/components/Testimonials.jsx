import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSettings } from '../context/SettingsContext';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonialsRow1 = [
  {
    name: "Sarah Mitchell",
    country: "United States",
    trek: "Everest Base Camp",
    rating: 5,
    text: "An absolutely life-changing experience. The team handled everything from Lukla flights to lodge bookings seamlessly. I just had to show up and walk!"
  },
  {
    name: "Thomas Weber",
    country: "Germany",
    trek: "Annapurna Circuit",
    rating: 5,
    text: "I was nervous about permits and high passes, but Project Peak made it effortless. Our guide Pemba was incredibly knowledgeable and attentive."
  },
  {
    name: "Yuki Tanaka",
    country: "Japan",
    trek: "Mardi Himal Trek",
    rating: 5,
    text: "Perfect for a shorter trip. The views of Machhapuchhre were unreal. Booking through the website was quick and the WhatsApp support was instant."
  },
  {
    name: "Liam O'Connor",
    country: "Australia",
    trek: "Manaslu Circuit",
    rating: 5,
    text: "Off the beaten path perfection. Wild rivers, ancient monasteries, and zero crowd stress. Peak logistics kept us warm and fed every single day."
  }
];

const testimonialsRow2 = [
  {
    name: "Elena Rostova",
    country: "Italy",
    trek: "Gokyo Lakes & Cho La Pass",
    rating: 5,
    text: "Standing at Gokyo Ri at sunrise watching Everest and Lhotse glow is etched in my mind forever. Immaculate service from start to finish."
  },
  {
    name: "David Kim",
    country: "South Korea",
    trek: "Langtang Valley",
    rating: 5,
    text: "Warm tea houses, friendly tamang locals, and stunning glaciers. The gear check advice saved my knees during the steep descents."
  },
  {
    name: "Chloe Dubois",
    country: "France",
    trek: "Three Passes Trek",
    rating: 5,
    text: "Challenging altitude but worth every single breath. The flight router updates kept us on time even when Lukla weather shifted."
  },
  {
    name: "Marcus Vance",
    country: "United Kingdom",
    trek: "Annapurna Base Camp",
    rating: 5,
    text: "360-degree mountain amphitheater at 4,130m! Unbeatable experience with top-tier safety gear and oxygen saturation monitoring."
  }
];

const Testimonials = () => {
  const { t } = useSettings();
  const sectionRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance Fade
      gsap.fromTo(
        sectionRef.current.querySelector('.header-title'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      );

      // 2. Continuous Marquee Animations
      const tl1 = gsap.to(marquee1Ref.current, {
        xPercent: -50,
        repeat: -1,
        duration: 28,
        ease: 'none'
      });

      const tl2 = gsap.to(marquee2Ref.current, {
        xPercent: 50,
        repeat: -1,
        duration: 28,
        ease: 'none'
      });

      // 3. Scroll Velocity Acceleration
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const boost = Math.min(3.5, 1 + velocity / 1200);
          gsap.to([tl1, tl2], { timeScale: boost, duration: 0.3, overwrite: 'auto' });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-8 md:py-14 w-full overflow-hidden select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 mb-8">
        <div className="header-title text-center">
          <span className="bg-neonLime text-black px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest inline-block mb-2 shadow-sm">
            TREKKER REVIEWS
          </span>
          <h2 className="font-condensed font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase text-darkSlate dark:text-creamBg tracking-wide">
            {t('test.title')}
          </h2>
        </div>
      </div>

      {/* Dual-Lane Infinite Parallax Marquee */}
      <div className="flex flex-col gap-5 w-full overflow-hidden relative">
        
        {/* Subtle Side Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-creamCanvas dark:from-[#121c27] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-creamCanvas dark:from-[#121c27] to-transparent z-20 pointer-events-none" />

        {/* Row 1: Leftward Marquee */}
        <div className="flex w-max" ref={marquee1Ref}>
          {[...testimonialsRow1, ...testimonialsRow1].map((item, i) => (
            <div
              key={i}
              className="w-[320px] sm:w-[380px] md:w-[420px] shrink-0 mx-2.5 bg-white dark:bg-darkSlate/80 border border-creamBorder/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: item.rating }).map((_, j) => (
                      <Star key={j} size={15} className="fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
                    ))}
                  </div>
                  <Quote size={20} className="text-slateTeal/40 dark:text-neonLime/40 group-hover:text-neonLime transition-colors" />
                </div>
                <p className="font-sans text-darkSlate/85 dark:text-creamBg/85 leading-relaxed text-xs sm:text-sm mb-6 italic">
                  "{item.text}"
                </p>
              </div>

              <div className="border-t border-creamBorder/50 dark:border-white/10 pt-4 flex justify-between items-end">
                <div>
                  <p className="font-condensed font-extrabold text-xl uppercase text-darkSlate dark:text-creamBg group-hover:text-slateTeal dark:group-hover:text-neonLime transition-colors">
                    {item.name}
                  </p>
                  <p className="font-sans text-darkSlate/50 dark:text-creamBg/50 text-xs font-semibold">{item.country}</p>
                </div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider bg-creamCard dark:bg-black/30 group-hover:bg-neonLime group-hover:text-black text-darkSlate dark:text-creamBg px-2.5 py-1 rounded-full transition-colors">
                  {item.trek}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Rightward Marquee */}
        <div className="flex w-max -ml-[50%]" ref={marquee2Ref}>
          {[...testimonialsRow2, ...testimonialsRow2].map((item, i) => (
            <div
              key={i}
              className="w-[320px] sm:w-[380px] md:w-[420px] shrink-0 mx-2.5 bg-white dark:bg-darkSlate/80 border border-creamBorder/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: item.rating }).map((_, j) => (
                      <Star key={j} size={15} className="fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
                    ))}
                  </div>
                  <Quote size={20} className="text-slateTeal/40 dark:text-neonLime/40 group-hover:text-neonLime transition-colors" />
                </div>
                <p className="font-sans text-darkSlate/85 dark:text-creamBg/85 leading-relaxed text-xs sm:text-sm mb-6 italic">
                  "{item.text}"
                </p>
              </div>

              <div className="border-t border-creamBorder/50 dark:border-white/10 pt-4 flex justify-between items-end">
                <div>
                  <p className="font-condensed font-extrabold text-xl uppercase text-darkSlate dark:text-creamBg group-hover:text-slateTeal dark:group-hover:text-neonLime transition-colors">
                    {item.name}
                  </p>
                  <p className="font-sans text-darkSlate/50 dark:text-creamBg/50 text-xs font-semibold">{item.country}</p>
                </div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider bg-creamCard dark:bg-black/30 group-hover:bg-neonLime group-hover:text-black text-darkSlate dark:text-creamBg px-2.5 py-1 rounded-full transition-colors">
                  {item.trek}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
