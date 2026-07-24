import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { treks } from '../data/treks';
import { useSettings } from '../context/SettingsContext';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 'annapurna',
    title: 'ANNAPURNA REGION',
    subtitle: 'Classic Circuits & Basecamp',
    image: 'https://images.unsplash.com/photo-1671181366687-47530c4dbe4b?q=80&w=1470&auto=format&fit=crop',
    colSpan: 'col-span-1 md:col-span-5',
    height: 'h-60 md:h-72',
    textPos: 'bottom-5 left-5'
  },
  {
    id: 'everest',
    title: 'EVEREST REGION',
    subtitle: 'Base Camp & Gokyo Lakes',
    image: 'https://plus.unsplash.com/premium_photo-1697729963745-8e14a76d48c2?q=80&w=1121&auto=format&fit=crop',
    colSpan: 'col-span-1 md:col-span-4',
    height: 'h-60 md:h-72',
    textPos: 'bottom-5 left-5'
  },
  {
    id: 'langtang',
    title: 'LANGTANG & GOSAIKUNDA',
    subtitle: 'Valley of Glaciers & Holy Lakes',
    image: 'https://images.unsplash.com/photo-1643548947288-fbf86caf414a?q=80&w=1102&auto=format&fit=crop',
    colSpan: 'col-span-1 md:col-span-3',
    height: 'h-60 md:h-72',
    textPos: 'bottom-5 left-5'
  },
  {
    id: 'manaslu',
    title: 'MANASLU & REMOTE',
    subtitle: 'Off-the-beaten-path Wilderness',
    image: 'https://images.unsplash.com/photo-1545662618-66de187bbf69?q=80&w=1470&auto=format&fit=crop',
    colSpan: 'col-span-1 md:col-span-3',
    height: 'h-60 md:h-72',
    textPos: 'bottom-5 left-5'
  },
  {
    id: 'expeditions',
    title: 'HIGH PASSES & EXPEDITIONS',
    subtitle: 'Three Passes, Thorong La & Larkya La',
    image: 'https://images.unsplash.com/photo-1505058439590-d86bd136dcec?q=80&w=1470&auto=format&fit=crop',
    colSpan: 'col-span-1 md:col-span-6',
    height: 'h-60 md:h-72',
    textPos: 'bottom-5 left-5'
  },
  {
    id: 'all',
    title: 'ALL TREKS',
    subtitle: 'Explore 20+ Routes',
    isSlateCard: true,
    colSpan: 'col-span-1 md:col-span-3',
    height: 'h-60 md:h-72',
  }
];

const BentoGrid = () => {
  const { t } = useSettings();
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Smooth Fluid entrance animation for bento cards
      gsap.fromTo(
        '.bento-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 92%',
          }
        }
      );

      // 2. Parallax scroll window effect for card background images
      const images = sectionRef.current.querySelectorAll('.bento-img');
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -10, scale: 1.1 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.bento-card'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
              preventOverlaps: true,
              fastScrollEnd: true
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector('.bento-img');
    if (!img) return;

    const rect = card.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(img, {
      x: xPos * 18,
      y: yPos * 18,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector('.bento-img');
    if (!img) return;

    gsap.to(img, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const scrollToDestinations = () => {
    const el = document.getElementById('destinations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="py-6 md:py-10 px-4 sm:px-6 md:px-12 w-full">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {categories.map((cat) => {
            if (cat.isSlateCard) {
              return (
                <div
                  key={cat.id}
                  onClick={scrollToDestinations}
                  className={`bento-card ${cat.colSpan} ${cat.height} bg-slateTeal dark:bg-slateTeal/90 text-white rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer group hover:bg-[#2b4453] transition-all shadow-md relative overflow-hidden`}
                >
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="font-condensed text-4xl md:text-5xl tracking-widest uppercase mb-1 font-extrabold group-hover:scale-105 transition-transform duration-300">
                      {cat.title}
                    </span>
                    <span className="text-white/70 font-sans text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 group-hover:text-white transition-colors">
                      {cat.subtitle} <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              );
            }

            return (
              <div
                key={cat.id}
                onClick={scrollToDestinations}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`bento-card ${cat.colSpan} ${cat.height} relative rounded-3xl overflow-hidden group cursor-pointer border border-creamBorder/50 shadow-sm`}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="bento-img absolute inset-0 w-full h-[120%] -top-[10%] object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90 transition-colors duration-300" />

                <div className={`absolute ${cat.textPos} z-10 p-2 transition-transform duration-300 group-hover:-translate-y-1`}>
                  <h3 className="text-white font-condensed text-2xl md:text-3xl font-extrabold tracking-wider drop-shadow-md">
                    {cat.title}
                  </h3>
                  <p className="text-white/75 group-hover:text-white font-sans text-xs font-semibold tracking-wide uppercase transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 flex items-center gap-1">
                    {cat.subtitle} <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
