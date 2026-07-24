import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plane, CheckCircle, CreditCard, ExternalLink, Calendar, MapPin, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PermitDashboard = () => {
  const [activeTab, setActiveTab] = useState('visas');
  const sectionRef = useRef(null);
  const topoGridRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance Stagger
      gsap.fromTo(
        '.permit-panel',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 92%',
          }
        }
      );

      // 2. Topographic Grid Line Trace Animation
      const gridPaths = topoGridRef.current?.querySelectorAll('.grid-path');
      if (gridPaths && gridPaths.length > 0) {
        gsap.fromTo(
          gridPaths,
          { strokeDashoffset: 500 },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-6 md:py-10 px-4 sm:px-6 md:px-12 w-full relative overflow-hidden">
      
      {/* Background Topographic Grid Trace Lines */}
      <svg
        ref={topoGridRef}
        className="absolute inset-0 w-full h-full opacity-15 dark:opacity-20 pointer-events-none text-darkSlate dark:text-creamBg"
        viewBox="0 0 1200 400"
        fill="none"
        stroke="currentColor"
      >
        <path className="grid-path" d="M0,100 Q300,30 600,100 T1200,100" strokeWidth="1" strokeDasharray="500" strokeDashoffset="500" />
        <path className="grid-path" d="M0,200 Q300,130 600,200 T1200,200" strokeWidth="1" strokeDasharray="500" strokeDashoffset="500" />
        <path className="grid-path" d="M0,300 Q300,230 600,300 T1200,300" strokeWidth="1" strokeDasharray="500" strokeDashoffset="500" />
      </svg>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-neonLime text-black px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 shadow-sm">
            <CreditCard size={16} className="text-black" /> Visas, Permits & Flight Routing
          </div>
          <h2 className="font-condensed font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase text-darkSlate dark:text-creamBg tracking-wide">
            NEPAL TRAVEL & PERMITS HUB
          </h2>
          <p className="font-sans text-darkSlate/60 dark:text-creamBg/60 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-medium">
            Everything you need regarding Visas, TIMS Cards, National Park Permits, and Lukla flight routing.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Left Info Card */}
          <div className="permit-panel flex-1 bg-white dark:bg-darkSlate/80 border border-creamBorder/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex bg-creamCard dark:bg-black/30 rounded-2xl p-1 mb-6 border border-creamBorder/60">
                <button 
                  onClick={() => setActiveTab('visas')}
                  className={`flex-1 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 ${activeTab === 'visas' ? 'bg-neonLime text-black shadow-md scale-[1.02]' : 'text-darkSlate/60 dark:text-creamBg/60'}`}
                >
                  <Calendar size={14} /> Visa on Arrival
                </button>
                <button 
                  onClick={() => setActiveTab('permits')}
                  className={`flex-1 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 ${activeTab === 'permits' ? 'bg-neonLime text-black shadow-md scale-[1.02]' : 'text-darkSlate/60 dark:text-creamBg/60'}`}
                >
                  <MapPin size={14} /> Trek Permits
                </button>
              </div>

              {activeTab === 'visas' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="font-condensed text-2xl font-extrabold uppercase text-darkSlate dark:text-creamBg mb-2">
                    Tourist Visa Fees (2026/27)
                  </h3>
                  <p className="font-sans text-xs text-darkSlate/70 dark:text-creamBg/70 mb-6">
                    Visas can be obtained on arrival at Tribhuvan International Airport (KTM). Cash (USD, EUR, GBP) or card.
                  </p>
                  
                  {/* Tactile Springy Visa Duration Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-creamCard dark:bg-black/20 rounded-2xl p-5 text-center border-t-4 border-neonLime shadow-xs hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-darkSlate/60 dark:text-creamBg/60 font-bold block mb-1">15 Days</span>
                      <span className="font-condensed font-extrabold text-4xl text-darkSlate dark:text-creamBg">$30</span>
                    </div>
                    <div className="bg-creamCard dark:bg-black/20 rounded-2xl p-5 text-center border-t-4 border-neonLime shadow-xs hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-darkSlate/60 dark:text-creamBg/60 font-bold block mb-1">30 Days</span>
                      <span className="font-condensed font-extrabold text-4xl text-darkSlate dark:text-creamBg">$50</span>
                    </div>
                    <div className="bg-creamCard dark:bg-black/20 rounded-2xl p-5 text-center border-t-4 border-neonLime shadow-xs hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-darkSlate/60 dark:text-creamBg/60 font-bold block mb-1">90 Days</span>
                      <span className="font-condensed font-extrabold text-4xl text-darkSlate dark:text-creamBg">$125</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 font-sans text-xs text-darkSlate/70 dark:text-creamBg/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-slateTeal dark:text-neonLime" /> Pay in cash (USD, EUR, GBP) or card.
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-slateTeal dark:text-neonLime" /> Passport must be valid for at least 6 months.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'permits' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="font-condensed text-2xl font-extrabold uppercase text-darkSlate dark:text-creamBg mb-2">
                    Required Trekking Permits
                  </h3>
                  <p className="font-sans text-xs text-darkSlate/70 dark:text-creamBg/70 mb-6">
                    Every trek requires a TIMS card and National Park entry. All covered when booking with Project Peak!
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-creamCard dark:bg-black/20 rounded-2xl border border-creamBorder/50 hover:scale-[1.01] transition-transform duration-200 cursor-pointer">
                      <div>
                        <h4 className="font-sans font-bold text-xs text-darkSlate dark:text-creamBg uppercase">TIMS Card (Trekkers' Information)</h4>
                        <p className="font-sans text-[11px] text-darkSlate/50 dark:text-creamBg/50">Mandatory for all routes</p>
                      </div>
                      <span className="font-sans font-bold text-xs bg-neonLime text-black px-3 py-1.5 rounded-full shadow-sm hover:scale-105 transition-transform">~ $15 (NPR 2000)</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-creamCard dark:bg-black/20 rounded-2xl border border-creamBorder/50 hover:scale-[1.01] transition-transform duration-200 cursor-pointer">
                      <div>
                        <h4 className="font-sans font-bold text-xs text-darkSlate dark:text-creamBg uppercase">National Park Entry</h4>
                        <p className="font-sans text-[11px] text-darkSlate/50 dark:text-creamBg/50">Sagarmatha, Annapurna, Langtang</p>
                      </div>
                      <span className="font-sans font-bold text-xs bg-neonLime text-black px-3 py-1.5 rounded-full shadow-sm hover:scale-105 transition-transform">~ $25 (NPR 3000)</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-2xl hover:scale-[1.01] transition-transform duration-200 cursor-pointer">
                      <div>
                        <h4 className="font-sans font-bold text-xs text-amber-800 dark:text-amber-200 flex items-center gap-1.5 uppercase"><AlertCircle size={14}/> Restricted Areas</h4>
                        <p className="font-sans text-[11px] text-amber-700/70 dark:text-amber-300/70">Manaslu, Upper Mustang</p>
                      </div>
                      <span className="font-sans font-bold text-xs text-amber-900 dark:text-amber-100">From $50/week</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Flight Status Widget */}
          <div className="permit-panel w-full lg:w-96 bg-slateTeal text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest bg-neonLime text-black px-2.5 py-1 rounded-full shadow-sm">
                  LIVE FLIGHT ROUTER
                </span>
              </div>
              <h3 className="font-condensed font-extrabold text-3xl mb-2 uppercase tracking-wide">
                Lukla Flight Routing
              </h3>
              
              <p className="font-sans text-xs text-white/80 leading-relaxed mb-6">
                During <strong>Peak Season</strong>, flights to Lukla re-route via <strong>Ramechhap Airport (Manthali)</strong> to bypass Kathmandu congestion.
              </p>

              <div className="bg-black/20 rounded-2xl p-4 mb-6 border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-white/60">Current Airport</span>
                  <span className="font-sans text-xs font-bold text-neonLime">Ramechhap [RCH]</span>
                </div>
                <div className="h-px w-full bg-white/10 my-2"></div>
                <div className="flex items-start gap-2 text-[11px] text-white/80">
                  <AlertCircle size={14} className="shrink-0 mt-0.5 text-neonLime" />
                  <span>Includes 4-hour night drive from Kathmandu. Project Peak manages all transfers.</span>
                </div>
              </div>

              <button 
                onClick={() => window.open(`https://wa.me/9779801234567?text=${encodeURIComponent("Hi! Could you confirm current Lukla flight routings for this week?")}`, '_blank', 'noopener,noreferrer')}
                className="w-full bg-neonLime hover:bg-[#b8e600] text-black font-condensed font-extrabold text-lg uppercase tracking-wider py-3 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Verify Flight Schedules <ExternalLink size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PermitDashboard;
