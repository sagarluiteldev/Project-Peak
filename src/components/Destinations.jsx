import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSettings } from '../context/SettingsContext';
import { Map, ArrowUpRight, TrendingUp } from 'lucide-react';
import TrailMap from './TrailMap';
import { treks } from '../data/treks';

gsap.registerPlugin(ScrollTrigger);

const Destinations = () => {
  const { t, convertPrice } = useSettings();
  const sectionRef = useRef(null);
  const topoRef = useRef(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [mapTrek, setMapTrek] = useState('');
  const [viewAll, setViewAll] = useState(false);

  const displayTreks = viewAll ? treks : treks.slice(0, 4);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Topographic line path drawing animation in section header
      const paths = topoRef.current?.querySelectorAll('.topo-path');
      if (paths && paths.length > 0) {
        gsap.fromTo(
          paths,
          { strokeDashoffset: 600 },
          {
            strokeDashoffset: 0,
            duration: 1.4,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
          }
        );
      }

      // 2. Staggered card entrance with topographic layer split ease
      gsap.fromTo(
        '.trek-card-arrival',
        { opacity: 0, y: 35, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [viewAll]);

  const handleBook = (dest) => {
    const message = `Hi! I'm interested in booking the *${dest.name}* trek (${dest.days} days, ${convertPrice(dest.price)}). Please share more details.`;
    window.open(`https://wa.me/9779801234567?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <section id="destinations" ref={sectionRef} className="py-8 md:py-14 px-4 sm:px-6 md:px-12 w-full relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          {/* Section Header with Topographic Contour SVG */}
          <div className="text-center mb-10 md:mb-12 relative">
            <svg
              ref={topoRef}
              className="absolute left-1/2 -translate-x-1/2 -top-6 w-[500px] sm:w-[700px] h-32 opacity-25 dark:opacity-30 pointer-events-none text-darkSlate dark:text-creamBg"
              viewBox="0 0 600 120"
              fill="none"
              stroke="currentColor"
            >
              <path className="topo-path" d="M0,60 Q150,15 300,60 T600,60" strokeWidth="1.5" strokeDasharray="600" strokeDashoffset="600" />
              <path className="topo-path" d="M0,85 Q150,35 300,85 T600,85" strokeWidth="1" strokeDasharray="600" strokeDashoffset="600" />
              <path className="topo-path" d="M0,35 Q150,-5 300,35 T600,35" strokeWidth="1" strokeDasharray="600" strokeDashoffset="600" />
            </svg>

            <h2 className="font-condensed font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase text-darkSlate dark:text-creamBg tracking-wider relative z-10">
              NEW ARRIVALS & POPULAR TREKS
            </h2>
            <p className="font-sans text-darkSlate/60 dark:text-creamBg/60 text-xs sm:text-sm uppercase tracking-widest font-semibold mt-2 relative z-10 flex items-center justify-center gap-2">
              <TrendingUp size={14} className="text-slateTeal dark:text-neonLime" />
              CURATED HIMALAYAN EXPEDITIONS & HIGH PASSES
            </p>
          </div>

          {/* 4-Column Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {displayTreks.map((dest) => (
              <div
                key={dest.id}
                className="trek-card-arrival flex flex-col group cursor-pointer border border-creamBorder/40 dark:border-white/10 rounded-2xl p-3 bg-white/40 dark:bg-darkSlate/40 hover:shadow-xl transition-all duration-300"
                onClick={() => handleBook(dest)}
              >
                {/* Image Container */}
                <div className="relative h-60 w-full rounded-xl overflow-hidden mb-3.5 border border-creamBorder/50 shadow-sm">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/65 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10">
                    {dest.difficulty}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMapTrek(dest.name);
                      setMapOpen(true);
                    }}
                    className="absolute top-3 right-3 bg-white/85 hover:bg-white text-darkSlate p-2 rounded-full transition-all shadow-md hover:scale-110"
                    title="View Trail Route Map"
                  >
                    <Map size={14} />
                  </button>
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1 justify-between px-1">
                  <div>
                    <h3 className="font-condensed text-2xl font-extrabold text-darkSlate dark:text-creamBg tracking-wide group-hover:text-slateTeal dark:group-hover:text-neonLime transition-colors">
                      {dest.name}
                    </h3>
                    <p className="font-sans text-xs text-darkSlate/60 dark:text-creamBg/60 font-medium">
                      {dest.days} Days • Altitude: {dest.altitude}
                    </p>

                    {/* Animated Hover Elevation Profile Graph Preview */}
                    <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 mt-1">
                      <div className="flex items-center justify-between text-[10px] text-darkSlate/50 dark:text-creamBg/50 uppercase font-semibold pt-1 mb-1">
                        <span>Summit Profile</span>
                        <span>{dest.altitude}</span>
                      </div>
                      <svg className="w-full h-7 text-slateTeal dark:text-neonLime" viewBox="0 0 200 40" fill="none" stroke="currentColor">
                        <path d="M0,35 Q35,28 65,32 T110,14 T155,22 T200,6" strokeWidth="2" strokeLinecap="round" />
                        <path d="M0,35 Q35,28 65,32 T110,14 T155,22 T200,6 L200,40 L0,40 Z" fill="currentColor" fillOpacity="0.15" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-creamBorder/50 dark:border-white/10">
                    <span className="font-sans font-bold text-base text-darkSlate dark:text-creamBg">
                      {convertPrice(dest.price)}
                    </span>
                    <span className="font-sans text-xs font-bold text-darkSlate/80 dark:text-creamBg/80 uppercase tracking-wider flex items-center gap-1 group-hover:text-slateTeal dark:group-hover:text-neonLime group-hover:translate-x-0.5 transition-all">
                      Book Trek <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setViewAll(!viewAll)}
              className="border border-darkSlate/30 dark:border-creamBg/30 hover:bg-darkSlate hover:text-white dark:hover:bg-creamBg dark:hover:text-darkSlate text-darkSlate dark:text-creamBg px-8 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all bg-transparent"
            >
              {viewAll ? 'SHOW LESS' : 'VIEW ALL TREKS'}
            </button>
          </div>
        </div>
      </section>

      <TrailMap isOpen={mapOpen} onClose={() => setMapOpen(false)} trekName={mapTrek} />
    </>
  );
};

export default Destinations;
