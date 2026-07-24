import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, MapPin, Clock, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LogisticsCards = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Staggered Entrance Animation
      gsap.fromTo(
        '.logistics-card',
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            preventOverlaps: true,
            fastScrollEnd: true
          }
        }
      );

      // 2. SVG Line Stroke Draw Animation for card accent paths
      const svgPaths = sectionRef.current.querySelectorAll('.draw-path');
      if (svgPaths.length > 0) {
        gsap.fromTo(
          svgPaths,
          { strokeDashoffset: 400 },
          {
            strokeDashoffset: 0,
            duration: 1.3,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              preventOverlaps: true,
              fastScrollEnd: true
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-6 md:py-10 px-4 sm:px-6 md:px-12 w-full">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Slate Teal Card - Permits & Logistics */}
        <div className="logistics-card bg-slateTeal text-white rounded-3xl p-8 md:p-10 shadow-lg flex flex-col justify-between relative overflow-hidden group border border-white/10 hover:shadow-2xl transition-all duration-500">
          
          {/* Animated SVG Border Accent */}
          <svg className="absolute top-0 right-0 w-48 h-48 opacity-20 pointer-events-none text-neonLime" viewBox="0 0 200 200" fill="none">
            <circle className="draw-path" cx="150" cy="50" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="400" strokeDashoffset="400" />
          </svg>

          <div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h2 className="font-condensed text-4xl md:text-5xl font-extrabold tracking-wider uppercase">
                PERMITS & LOGISTICS
              </h2>
              <ShieldCheck size={36} className="text-neonLime shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
            </div>
            <p className="font-sans text-xs uppercase tracking-widest text-white/70 font-semibold mb-6 relative z-10">
              FULL HIMALAYAN SUPPORT & GUARANTEE
            </p>

            <div className="space-y-5 relative z-10">
              {/* Item 1 */}
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-sans font-bold text-sm text-neonLime uppercase tracking-wider mb-1 flex items-center gap-2">
                  <CheckCircle2 size={16} /> STANDARD PERMIT PROCESSING
                </h3>
                <p className="font-sans text-xs text-white/80 leading-relaxed">
                  TIMS Cards & National Park permits issued seamlessly prior to your arrival. Ready upon hotel check-in.
                </p>
                {/* Accordion Detail Reveal */}
                <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 text-[11px] text-white/60 pt-2 space-y-1">
                  <p>• Verified directly with Nepal Tourism Board (NTB)</p>
                  <p>• Includes Sagarmatha & Annapurna conservation passes</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-sans font-bold text-sm text-neonLime uppercase tracking-wider mb-1 flex items-center gap-2">
                  <CheckCircle2 size={16} /> EXPRESS HELICOPTER & FLIGHT SUPPORT
                </h3>
                <p className="font-sans text-xs text-white/80 leading-relaxed">
                  Priority Lukla/Phaplu flight slots, high-altitude SAR helicopter coverage, and emergency weather re-routing.
                </p>
                {/* Accordion Detail Reveal */}
                <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 text-[11px] text-white/60 pt-2 space-y-1">
                  <p>• 24/7 Satellite phone & Garmin inReach monitoring</p>
                  <p>• Instant insurance claim documentation assistance</p>
                </div>
              </div>

              {/* Item 3 */}
              <div>
                <h3 className="font-sans font-bold text-sm text-neonLime uppercase tracking-wider mb-1 flex items-center gap-2">
                  <CheckCircle2 size={16} /> FREE CANCELLATION & GEAR STORAGE
                </h3>
                <p className="font-sans text-xs text-white/80 leading-relaxed">
                  Flexible date shifts for flight delays. Free secure duffel storage at our Thamel HQ during your trek.
                </p>
                {/* Accordion Detail Reveal */}
                <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 text-[11px] text-white/60 pt-2 space-y-1">
                  <p>• Free waterproof duffel bag loaner provided</p>
                  <p>• 100% refund policy up to 14 days prior to departure</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Light Cream Card - Visit HQ */}
        <div className="logistics-card bg-creamCard text-darkSlate rounded-3xl p-8 md:p-10 border border-creamBorder shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-500">
          
          {/* Animated SVG Border Accent */}
          <svg className="absolute top-0 right-0 w-48 h-48 opacity-15 pointer-events-none text-slateTeal" viewBox="0 0 200 200" fill="none">
            <circle className="draw-path" cx="150" cy="50" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="400" strokeDashoffset="400" />
          </svg>

          <div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h2 className="font-condensed text-4xl md:text-5xl font-extrabold tracking-wider uppercase text-darkSlate">
                HQ & BASECAMP
              </h2>
              <MapPin size={36} className="text-darkSlate/70 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1" />
            </div>
            <p className="font-sans text-xs uppercase tracking-widest text-darkSlate/60 font-semibold mb-6 relative z-10">
              VISIT OUR KATHMANDU FLAGSHIP STORE
            </p>

            <div className="space-y-5 relative z-10">
              <div className="border-b border-darkSlate/10 pb-4">
                <h3 className="font-sans font-bold text-xs text-darkSlate/60 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <MapPin size={14} className="text-slateTeal" /> ADDRESS
                </h3>
                <p className="font-sans font-semibold text-sm text-darkSlate">
                  Project Peak Expedition HQ
                </p>
                <p className="font-sans text-xs text-darkSlate/70">
                  Thamel Marg, Ward 26, Kathmandu 44600, Nepal
                </p>
                {/* Accordion Detail Reveal */}
                <div className="max-h-0 group-hover:max-h-16 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 text-[11px] text-darkSlate/60 pt-2">
                  <p>• Located 20 mins from Tribhuvan International Airport (KTM)</p>
                </div>
              </div>

              <div className="border-b border-darkSlate/10 pb-4">
                <h3 className="font-sans font-bold text-xs text-darkSlate/60 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <Clock size={14} className="text-slateTeal" /> STORE & OFFICE HOURS
                </h3>
                <p className="font-sans text-xs text-darkSlate/80">
                  <strong className="text-darkSlate font-bold">Monday – Friday:</strong> 8:00 AM – 7:00 PM
                </p>
                <p className="font-sans text-xs text-darkSlate/80 mt-0.5">
                  <strong className="text-darkSlate font-bold">Saturday – Sunday:</strong> 9:00 AM – 5:00 PM
                </p>
                {/* Accordion Detail Reveal */}
                <div className="max-h-0 group-hover:max-h-16 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 text-[11px] text-darkSlate/60 pt-2">
                  <p>• Complimentary Organic Himalayan Espresso served at entry</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/9779801234567?text=Hi!%20I'd%20like%20to%20visit%20your%20Kathmandu%20HQ."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-darkSlate/30 hover:border-darkSlate bg-white/70 hover:bg-white text-darkSlate px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-sm"
                >
                  Schedule HQ Briefing
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LogisticsCards;
