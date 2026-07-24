import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Dumbbell, Flame, TrendingDown, Target, ArrowRight, HeartPulse } from 'lucide-react';
import { treks } from '../data/treks';

gsap.registerPlugin(ScrollTrigger);

const FitnessCalculator = () => {
  const [weightStr, setWeightStr] = useState('75');
  const [unit, setUnit] = useState('kg');
  const [selectedTrekId, setSelectedTrekId] = useState(treks[0]?.id || 1);
  const sectionRef = useRef(null);
  const ecgPathRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance Stagger
      gsap.fromTo(
        '.fitness-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 92%'
          }
        }
      );

      // 2. ECG Heartbeat Path Drawing
      if (ecgPathRef.current) {
        gsap.fromTo(
          ecgPathRef.current,
          { strokeDashoffset: 600 },
          {
            strokeDashoffset: 0,
            duration: 1.4,
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

  const selectedTrek = treks.find(t => t.id === Number(selectedTrekId)) || treks[0];
  const weightVal = parseFloat(weightStr) || 0;
  
  const weightInKg = unit === 'kg' ? weightVal : weightVal * 0.453592;

  const getMetValue = (difficulty) => {
    if (difficulty === 'hard') return 8.5;
    if (difficulty === 'moderate') return 7;
    return 6;
  };

  const calculateCalories = () => {
    if (weightInKg === 0 || !selectedTrek) return 0;
    const met = getMetValue(selectedTrek.difficulty);
    const dailyCalories = met * weightInKg * 6;
    return Math.round(dailyCalories * selectedTrek.days);
  };

  const totalCalories = calculateCalories();
  const marathons = (totalCalories / 2600).toFixed(1);
  const bigMacs = Math.round(totalCalories / 550);
  const fatBurned = (totalCalories / 7700).toFixed(1);

  // Radial Gauge Percentage (capped 100%)
  const maxCalories = 40000;
  const gaugePercent = Math.min(100, Math.max(10, Math.round((totalCalories / maxCalories) * 100)));
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (gaugePercent / 100) * circumference;

  return (
    <section id="fitness-calculator" ref={sectionRef} className="py-6 md:py-10 px-4 sm:px-6 md:px-12 w-full relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 relative z-10">
        
        {/* Left: Input Options */}
        <div className="fitness-card flex-1 bg-white dark:bg-darkSlate/80 border border-creamBorder/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 bg-neonLime/30 text-darkSlate dark:text-creamBg px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                <Flame size={16} className="text-darkSlate dark:text-neonLime" /> Fitness & Calorie Prep
              </div>
              <HeartPulse size={24} className="text-slateTeal dark:text-neonLime animate-pulse" />
            </div>

            {/* ECG Heartbeat SVG Wave Trace */}
            <svg className="w-full h-8 mb-2 opacity-30 text-slateTeal dark:text-neonLime" viewBox="0 0 400 40" fill="none" stroke="currentColor">
              <path
                ref={ecgPathRef}
                d="M0,20 L100,20 L110,5 L120,35 L130,10 L140,25 L150,20 L400,20"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="600"
                strokeDashoffset="600"
              />
            </svg>
            
            <h2 className="font-condensed font-extrabold text-4xl sm:text-5xl uppercase text-darkSlate dark:text-creamBg tracking-wide mb-3">
              TREK CALORIE CALCULATOR
            </h2>
            <p className="font-sans text-darkSlate/70 dark:text-creamBg/70 text-xs sm:text-sm leading-relaxed mb-6">
              Enter your details below to estimate total energy expenditure, body fat burn, and training prep requirements.
            </p>

            {/* Trek Selection */}
            <div className="mb-5">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-darkSlate dark:text-creamBg mb-2">
                Select Your Trek Route
              </label>
              <select 
                value={selectedTrekId}
                onChange={(e) => setSelectedTrekId(e.target.value)}
                className="w-full bg-creamCard dark:bg-black/30 border border-creamBorder dark:border-white/10 rounded-xl px-4 py-3 font-sans text-sm font-semibold text-darkSlate dark:text-creamBg outline-none focus:border-darkSlate cursor-pointer transition-colors"
              >
                {treks.map(trek => (
                  <option key={trek.id} value={trek.id} className="text-darkSlate">
                    {trek.name} ({trek.days} days, {trek.difficulty})
                  </option>
                ))}
              </select>
            </div>

            {/* Weight Input */}
            <div className="mb-6">
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-darkSlate dark:text-creamBg mb-2">
                Body Weight
              </label>
              <div className="flex items-center gap-3">
                <input 
                  type="number" 
                  value={weightStr}
                  onChange={(e) => setWeightStr(e.target.value)}
                  className="flex-1 bg-creamCard dark:bg-black/30 border border-creamBorder dark:border-white/10 rounded-xl px-4 py-3 font-sans text-lg font-bold text-darkSlate dark:text-creamBg outline-none focus:border-darkSlate"
                />
                <div className="flex bg-creamCard dark:bg-black/30 rounded-xl p-1 border border-creamBorder/60 shrink-0">
                  <button 
                    onClick={() => setUnit('kg')}
                    className={`px-4 py-2 rounded-lg font-sans text-xs font-bold uppercase transition-all ${unit === 'kg' ? 'bg-neonLime text-black shadow-sm' : 'text-darkSlate/60 dark:text-creamBg/60'}`}
                  >
                    KG
                  </button>
                  <button 
                    onClick={() => setUnit('lbs')}
                    className={`px-4 py-2 rounded-lg font-sans text-xs font-bold uppercase transition-all ${unit === 'lbs' ? 'bg-neonLime text-black shadow-sm' : 'text-darkSlate/60 dark:text-creamBg/60'}`}
                  >
                    LBS
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              const el = document.getElementById('destinations');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full bg-slateTeal hover:bg-[#2b4453] text-white font-condensed font-extrabold text-lg uppercase tracking-wider py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            Explore Matching Treks <ArrowRight size={18} />
          </button>
        </div>

        {/* Right: Radial Score Gauge & Energy Output Results */}
        <div className="fitness-card flex-1 bg-slateTeal text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-white/70">
                ESTIMATED ENERGY EXPENDITURE
              </span>
              <Activity size={20} className="text-neonLime" />
            </div>

            {/* Total Calories + Radial Score Circle */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 bg-black/20 p-6 rounded-2xl border border-white/10">
              
              {/* Radial Circle Gauge */}
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" className="text-white/10" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-neonLime transition-all duration-1000 ease-out"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-condensed font-extrabold text-xl text-neonLime">{gaugePercent}%</span>
              </div>

              <div className="text-center sm:text-left">
                <p className="font-condensed font-extrabold text-5xl sm:text-6xl text-neonLime tracking-tight">
                  {totalCalories.toLocaleString()}
                </p>
                <p className="font-sans text-xs uppercase tracking-widest text-white/80 font-bold">
                  TOTAL KILOCALORIES BURNED
                </p>
              </div>
            </div>

            {/* Equivalent Burn Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center mb-6">
              <div className="bg-black/20 p-3.5 rounded-2xl border border-white/10 hover:scale-105 transition-transform">
                <p className="font-condensed font-extrabold text-2xl text-white">{marathons}</p>
                <p className="font-sans text-[10px] uppercase font-bold text-white/70 mt-0.5">Marathons</p>
              </div>
              <div className="bg-black/20 p-3.5 rounded-2xl border border-white/10 hover:scale-105 transition-transform">
                <p className="font-condensed font-extrabold text-2xl text-white">{bigMacs}</p>
                <p className="font-sans text-[10px] uppercase font-bold text-white/70 mt-0.5">Burgers</p>
              </div>
              <div className="bg-black/20 p-3.5 rounded-2xl border border-white/10 hover:scale-105 transition-transform">
                <p className="font-condensed font-extrabold text-2xl text-white">{fatBurned} <span className="text-xs font-normal">kg</span></p>
                <p className="font-sans text-[10px] uppercase font-bold text-white/70 mt-0.5">Fat Loss</p>
              </div>
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-2xl border border-white/10">
            <p className="font-sans text-xs text-white/80 leading-relaxed flex items-start gap-2">
              <Dumbbell size={16} className="text-neonLime shrink-0 mt-0.5" />
              <span>Recommended Prep: 3-4 months of cardiovascular stairs & weighted pack training prior to departure.</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FitnessCalculator;
