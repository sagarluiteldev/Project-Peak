import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, AlertTriangle, ArrowRight, Backpack, ChevronLeft, Scale, Info } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const gearCategories = [
  {
    category: 'Essentials',
    items: [
      { name: 'Trekking backpack (40-60L)', essential: true, weight: 1.5, tip: 'Ergonomic hip harness & rain cover included' },
      { name: 'Daypack (20L)', essential: true, weight: 0.5, tip: 'For side trips to EBC or Gokyo Ri' },
      { name: 'Passport & permits copy', essential: true, weight: 0.1, tip: 'Store in waterproof Ziploc pouch' },
      { name: 'Travel insurance docs', essential: true, weight: 0.1, tip: 'Must explicitly cover search & high-altitude rescue up to 6000m' },
      { name: 'Cash (NPR & USD)', essential: true, weight: 0.1, tip: 'No ATMs on trail above Namche' },
    ]
  },
  {
    category: 'Clothing',
    items: [
      { name: 'Moisture-wicking base layers (x3)', essential: true, weight: 0.6, tip: 'Merino wool or synthetic, avoid cotton' },
      { name: 'Insulating fleece/down jacket', essential: true, weight: 0.8, tip: '800-fill down for cold mountain nights' },
      { name: 'Waterproof shell jacket', essential: true, weight: 0.4, tip: 'Gore-Tex breathable rating 20k+' },
      { name: 'Trekking pants (x2)', essential: true, weight: 0.8, tip: 'Quick-dry stretch fabric' },
      { name: 'Thermal underwear', essential: false, weight: 0.3, tip: 'For high passes & sleeping at Basecamp' },
      { name: 'Warm hat & sun hat', essential: true, weight: 0.2, tip: 'UV protection & fleece lining' },
      { name: 'Gloves (liner + waterproof)', essential: true, weight: 0.2, tip: 'Windproof outer shell' },
      { name: 'Warm socks (x5)', essential: true, weight: 0.4, tip: 'Merino wool heavy cushion' },
      { name: 'Gaiters', essential: false, weight: 0.3, tip: 'Keeps snow & dust out of boots' },
    ]
  },
  {
    category: 'Footwear',
    items: [
      { name: 'Broken-in trekking boots', essential: true, weight: 1.2, tip: 'Vibram sole & ankle support' },
      { name: 'Camp sandals/flip flops', essential: false, weight: 0.3, tip: 'For tea house relaxing after long day' },
      { name: 'Trekking poles (pair)', essential: true, weight: 0.5, tip: 'Carbon fiber or aluminum lock' },
    ]
  },
  {
    category: 'Gear & Equipment',
    items: [
      { name: 'Sleeping bag (-15°C rated)', essential: true, weight: 1.6, tip: 'Project Peak provides free rental if needed' },
      { name: 'Headlamp + spare batteries', essential: true, weight: 0.2, tip: 'Red light mode for lodge dorms' },
      { name: 'Sunglasses (UV400)', essential: true, weight: 0.1, tip: 'Category 3 or 4 glacier protection' },
      { name: 'Water bottle / hydration system', essential: true, weight: 0.3, tip: 'Insulated sleeve prevents freezing' },
      { name: 'Water purification tablets', essential: true, weight: 0.1, tip: 'Aquatabs or Katadyn BeFree' },
      { name: 'First aid kit', essential: true, weight: 0.4, tip: 'Diamox, blister tape & O2 saturation monitor' },
      { name: 'Sunscreen (SPF 50+)', essential: true, weight: 0.1, tip: 'High altitude UV protection' },
      { name: 'Lip balm with SPF', essential: false, weight: 0.05, tip: 'Prevents windburn' },
    ]
  },
  {
    category: 'Tech & Comfort',
    items: [
      { name: 'Camera / phone', essential: false, weight: 0.4, tip: 'Keep near body to preserve battery in cold' },
      { name: 'Power bank (20,000mAh+)', essential: false, weight: 0.4, tip: 'Tea house charging costs $3-5/hr' },
      { name: 'Earplugs & eye mask', essential: false, weight: 0.05, tip: 'For noisy lodge wooden walls' },
      { name: 'Snacks & energy bars', essential: false, weight: 0.5, tip: 'High calorie energy boost' },
      { name: 'Notebook & pen', essential: false, weight: 0.2, tip: 'Document your journey daily' },
    ]
  },
];

const allItemsArray = gearCategories.flatMap(c => c.items);
const STORAGE_KEY = 'projectpeak_gear_checklist';

const GearChecker = () => {
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelector('.gear-summary-card'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 92%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggleItem = (name) => {
    setChecked(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const totalItems = allItemsArray.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);

  const totalWeightStr = allItemsArray.reduce((acc, item) => checked[item.name] ? acc + item.weight : acc, 0).toFixed(1);
  const totalWeight = parseFloat(totalWeightStr);

  const resetAll = () => setChecked({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isHeavy = totalWeight > 10;
  const maxWeight = 16;

  return (
    <section id="gear-checker" ref={sectionRef} className="py-6 md:py-10 px-4 sm:px-6 md:px-12 w-full">
      <div 
        onClick={() => setIsOpen(true)}
        className="gear-summary-card max-w-[1600px] mx-auto bg-white dark:bg-darkSlate/80 border border-creamBorder/80 dark:border-white/10 rounded-3xl p-6 md:p-10 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col md:flex-row items-center gap-8 md:gap-12"
      >
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-neonLime/30 text-darkSlate dark:text-creamBg px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Backpack size={16} className="text-darkSlate dark:text-neonLime" /> Packing Checklist & Weight Budget
          </div>
          <h2 className="font-condensed font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase text-darkSlate dark:text-creamBg tracking-wide mb-3 group-hover:text-slateTeal dark:group-hover:text-neonLime transition-colors">
            GEAR & PACK WEIGHT ESTIMATOR
          </h2>
          <p className="font-sans text-darkSlate/70 dark:text-creamBg/70 text-xs sm:text-sm leading-relaxed mb-4">
            Interactive tactical inventory slots with real-time base weight calculation. Know whether you need a porter before heading to the trail!
          </p>
        </div>
        
        {/* Visual summary in the box */}
        <div className="w-full md:w-80 bg-creamCard dark:bg-black/30 rounded-2xl p-6 border border-creamBorder/60 relative overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
          <div className="flex justify-between items-center mb-1 relative z-10">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-darkSlate dark:text-creamBg">Est. Base Weight</span>
            <span className={`font-condensed text-2xl font-extrabold px-3 py-0.5 rounded-md ${isHeavy ? 'bg-amber-500 text-white' : 'bg-neonLime text-black'}`}>{totalWeight} KG</span>
          </div>
          <p className="font-sans text-[10px] text-darkSlate/50 dark:text-creamBg/50 mb-4 inline-flex items-center gap-1 uppercase tracking-wider relative z-10 font-semibold">
             <Scale size={11} /> Tactical Inventory Total
          </p>
          <div className="w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden relative z-10 mb-2">
            <div className={`h-full rounded-full transition-all duration-500 ease-out ${isHeavy ? 'bg-amber-500' : 'bg-neonLime'}`} style={{ width: `${Math.min(100, (totalWeight / maxWeight) * 100)}%` }}></div>
          </div>
          <p className="font-sans text-xs text-darkSlate/70 dark:text-creamBg/70 relative z-10 font-medium">
            {checkedCount} out of {totalItems} items packed
          </p>
          
          <div className="flex items-center justify-between mt-5 relative z-10 text-darkSlate dark:text-creamBg group-hover:text-slateTeal dark:group-hover:text-neonLime transition-colors">
             <span className="font-condensed text-lg font-extrabold uppercase tracking-widest">Open Checklist</span>
             <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[200] bg-creamCanvas dark:bg-darkSlate overflow-y-auto w-full h-full" data-lenis-prevent="true">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-20 relative min-h-full">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="absolute top-6 left-6 md:top-12 md:left-0 flex items-center gap-2 text-darkSlate/70 dark:text-creamBg/70 hover:text-darkSlate transition-colors font-sans font-bold uppercase tracking-wider text-xs mb-8"
            >
              <ChevronLeft size={18} />
              Back to Home
            </button>

            <div className="text-center mb-10 mt-12 md:mt-0">
              <h2 className="font-condensed font-extrabold text-4xl md:text-6xl text-darkSlate dark:text-creamBg uppercase tracking-wide mb-2">
                TACTICAL PACK WEIGHT ESTIMATOR
              </h2>
              <p className="font-sans text-darkSlate/70 dark:text-creamBg/70 text-xs sm:text-sm">
                Checklist and weight estimation saved automatically. Hover gear items for equipment tips.
              </p>
            </div>

            {/* Dashboard top area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-black/20 border border-creamBorder p-5 md:p-6 rounded-2xl shadow-sm flex flex-col justify-center">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-darkSlate dark:text-creamBg">Items Packed ({checkedCount}/{totalItems})</span>
                  <span className="font-condensed text-xl font-extrabold text-black bg-neonLime px-2.5 py-0.5 rounded">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-neonLime rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              <div className={`border p-5 md:p-6 rounded-2xl shadow-sm flex flex-col justify-center transition-colors ${
                isHeavy ? 'bg-amber-50 border-amber-200' : 'bg-white dark:bg-black/20 border-creamBorder'
              }`}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <Scale size={18} className={isHeavy ? 'text-amber-500' : 'text-slateTeal'} />
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-darkSlate dark:text-creamBg">
                      Estimated Weight
                    </span>
                  </div>
                  <span className={`font-condensed text-2xl font-extrabold px-2.5 py-0.5 rounded ${isHeavy ? 'bg-amber-500 text-white' : 'bg-neonLime text-black'}`}>{totalWeight} KG</span>
                </div>
                <div className="w-full h-3 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                  <div className={`h-full rounded-full transition-all duration-500 ease-out ${isHeavy ? 'bg-amber-500' : 'bg-neonLime'}`} style={{ width: `${Math.min(100, (totalWeight / maxWeight) * 100)}%` }}></div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-6">
              {gearCategories.map((cat, catIndex) => (
                <div key={catIndex} className="bg-white dark:bg-black/20 border border-creamBorder rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-condensed font-extrabold text-2xl uppercase text-darkSlate dark:text-creamBg">{cat.category}</h3>
                    <span className="font-sans text-xs font-bold text-darkSlate/60 dark:text-creamBg/60">
                      {cat.items.reduce((acc, item) => checked[item.name] ? acc + item.weight : acc, 0).toFixed(1)} kg
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {cat.items.map((item, itemIndex) => {
                      const isChecked = checked[item.name];
                      return (
                        <div key={itemIndex} className="relative group/item">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleItem(item.name); }}
                            className={`w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-left transition-all hover:bg-black/[0.04] dark:hover:bg-white/[0.05] ${isChecked ? 'opacity-60' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded shrink-0 flex items-center justify-center transition-all ${isChecked ? 'bg-neonLime text-black' : 'border-2 border-black/20 dark:border-white/20 group-hover/item:border-darkSlate'}`}>
                                {isChecked && <Check size={14} className="text-black" strokeWidth={3} />}
                              </div>
                              <span className={`font-sans text-xs font-medium ${isChecked ? 'line-through text-darkSlate/50 dark:text-creamBg/50' : 'text-darkSlate dark:text-creamBg'}`}>
                                {item.name}
                              </span>
                              {item.essential && (
                                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded">Required</span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="font-sans text-[11px] font-bold text-darkSlate/40 dark:text-creamBg/40">{item.weight} kg</span>
                              <Info size={14} className="text-darkSlate/30 dark:text-creamBg/30 group-hover/item:text-slateTeal dark:group-hover/item:text-neonLime transition-colors" />
                            </div>
                          </button>

                          {/* Hover Tooltip Preview */}
                          <div className="pointer-events-none absolute right-4 top-full mt-1 z-30 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 bg-darkSlate text-white text-[11px] px-3 py-1.5 rounded-lg shadow-xl max-w-xs whitespace-normal font-sans border border-white/10">
                            {item.tip}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Reset */}
            <div className="text-center mt-8 pb-12">
              <button onClick={(e) => { e.stopPropagation(); resetAll(); }} className="font-sans text-xs font-bold text-darkSlate/50 dark:text-creamBg/50 hover:text-red-600 transition-colors uppercase tracking-wider">
                Reset checklist & weight
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GearChecker;
