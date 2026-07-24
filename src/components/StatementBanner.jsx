import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const StatementBanner = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const btnRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    if (btnRef.current) {
      xTo.current = gsap.quickTo(btnRef.current, 'x', { duration: 0.35, ease: 'power2.out' });
      yTo.current = gsap.quickTo(btnRef.current, 'y', { duration: 0.35, ease: 'power2.out' });
    }

    let ctx = gsap.context(() => {
      // 1. Kinetic Word Mask Reveal - Longer animation, starts slow
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.mask-word');
        gsap.fromTo(
          words,
          { yPercent: 130, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.8,
            delay: 0.15,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              preventOverlaps: true,
              fastScrollEnd: true
            }
          }
        );
      }

      // 2. Parallax Image Zoom Scrub
      const images = sectionRef.current.querySelectorAll('.banner-img');
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.0 },
          {
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
              preventOverlaps: true,
              fastScrollEnd: true
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic Button Tracking with gsap.quickTo for 120 FPS response
  const handleMouseMove = (e) => {
    if (!btnRef.current || !xTo.current || !yTo.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    xTo.current(x);
    yTo.current(y);
  };

  const handleMouseLeave = () => {
    if (!xTo.current || !yTo.current) return;
    xTo.current(0);
    yTo.current(0);
  };

  const scrollToTreks = () => {
    const el = document.getElementById('destinations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="py-8 md:py-16 px-4 sm:px-6 md:px-12 w-full select-none overflow-hidden gpu-layer">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-8">
        
        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {/* Small Left Thumbnail */}
          <div className="col-span-1 md:col-span-3 h-52 md:h-80 rounded-3xl overflow-hidden shadow-md border border-creamBorder/50 dark:border-white/10 relative group gpu-card">
            <img
              src="https://images.unsplash.com/photo-1671181366687-47530c4dbe4b?q=80&w=600&auto=format&fit=crop"
              alt="Himalayan mountain peak"
              className="banner-img w-full h-full object-cover transition-transform duration-700 gpu-layer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Large Right Panorama with Tent */}
          <div className="col-span-1 md:col-span-9 h-64 md:h-80 rounded-3xl overflow-hidden shadow-md border border-creamBorder/50 dark:border-white/10 relative group gpu-card">
            <img
              src="https://images.unsplash.com/photo-1505058439590-d86bd136dcec?q=80&w=1470&auto=format&fit=crop"
              alt="Camp under Himalayan skies"
              className="banner-img w-full h-full object-cover transition-transform duration-700 gpu-layer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>

        {/* Big Impact Single-Line Kinetic Statement & Magnetic CTA */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6 mt-2 w-full overflow-hidden">
          
          <h2 ref={titleRef} className="font-condensed text-[1.8rem] xs:text-[2.6rem] sm:text-[3.8rem] md:text-[5.2rem] lg:text-[6.5rem] xl:text-[7.2rem] font-extrabold tracking-tight uppercase text-darkSlate dark:text-creamBg leading-none flex flex-nowrap whitespace-nowrap gap-x-1.5 sm:gap-x-3 items-center shrink-0">
            <span className="inline-flex overflow-hidden py-1">
              <span className="mask-word inline-block gpu-layer">THE</span>
            </span>
            <span className="inline-flex overflow-hidden py-1">
              <span className="mask-word inline-block gpu-layer">HIMALAYAS</span>
            </span>
            <span className="inline-flex overflow-hidden py-1">
              <span className="mask-word inline-block gpu-layer">ARE</span>
            </span>
            <span className="inline-flex overflow-hidden py-1">
              <span className="mask-word inline-block gpu-layer">OUR</span>
            </span>
            <span className="inline-flex overflow-hidden py-1">
              <span className="mask-word bg-neonLime text-black px-2 sm:px-3.5 py-0.5 rounded-lg font-extrabold shadow-sm gpu-layer">
                TRUE HOME
              </span>
            </span>
          </h2>

          {/* Magnetic Liquid CTA Button */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="shrink-0 pt-2"
          >
            <button
              ref={btnRef}
              onClick={scrollToTreks}
              className="bg-neonLime hover:bg-[#b8e600] text-black font-condensed font-extrabold text-lg md:text-xl uppercase tracking-widest px-8 py-3.5 rounded-full shadow-[0_10px_35px_rgba(204,255,0,0.35)] hover:scale-105 transition-all flex items-center gap-3 cursor-pointer gpu-layer"
            >
              <span>BEGIN EXPEDITION</span>
              <ArrowUpRight size={20} className="stroke-[2.5]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StatementBanner;
