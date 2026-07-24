import React, { useState, useRef, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarDays, Mountain, Gauge, ArrowRight, ArrowLeft, CheckCircle, Footprints, TrendingUp, Clock, Timer, CalendarRange, Download, Users, Bed, Backpack } from 'lucide-react';
import ElevationProfile from './ElevationProfile';
import { treks, crowdColors, crowdLabels } from '../data/treks';

gsap.registerPlugin(ScrollTrigger);

const steps = ['difficulty', 'duration', 'interests', 'accommodation', 'extras'];

const accommodations = [
  { id: 'teahouse', label: 'Tea House Lodge', desc: 'Basic but cozy mountain lodges', priceAdd: 0 },
  { id: 'camping', label: 'Camping Trek', desc: 'Full camping setup with crew', priceAdd: 300 },
  { id: 'luxury', label: 'Luxury Lodge', desc: 'Best available rooms & hot showers', priceAdd: 600 },
];

const extras = [
  { id: 'porter', label: 'Porter Service', price: 200 },
  { id: 'insurance', label: 'Helicopter Rescue Insurance', price: 150 },
  { id: 'photo', label: 'Professional Photography', price: 350 },
  { id: 'gear', label: 'Full Gear Rental Package', price: 120 },
];

const OptionButton = ({ selected, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-4 rounded-xl border-2 font-sans text-sm font-semibold transition-all text-left ${
      selected ? 'border-darkSlate bg-neonLime text-black font-extrabold shadow-sm scale-[1.02]' : 'border-creamBorder/70 bg-white/60 dark:bg-black/20 text-darkSlate dark:text-creamBg hover:border-darkSlate/50 hover:scale-[1.01]'
    }`}
  >
    {children}
  </button>
);

const ItineraryPlanner = () => {
  const { convertPrice, t } = useSettings();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    difficulty: '', duration: '', interests: [],
    accommodation: 'teahouse', extras: [],
  });
  const [results, setResults] = useState(null);
  const [selectedTrek, setSelectedTrek] = useState(null);
  const sectionRef = useRef(null);
  const itineraryRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (itineraryRef.current) {
        gsap.fromTo(
          itineraryRef.current,
          { opacity: 0, scale: 0.95, y: 35 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const selectOption = (key, value) => setAnswers(prev => ({ ...prev, [key]: value }));
  const toggleInterest = (interest) => {
    setAnswers(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest]
    }));
  };
  const toggleExtra = (id) => {
    setAnswers(prev => ({
      ...prev,
      extras: prev.extras.includes(id) ? prev.extras.filter(e => e !== id) : [...prev.extras, id]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      const filtered = treks.filter(trek => {
        const diffMatch = !answers.difficulty || trek.difficulty === answers.difficulty;
        const daysMatch = !answers.duration || (
          answers.duration === 'short' ? trek.days <= 7 :
          answers.duration === 'medium' ? trek.days > 7 && trek.days <= 14 :
          trek.days > 14
        );
        return diffMatch && daysMatch;
      });
      setResults(filtered.length > 0 ? filtered : treks.slice(0, 3));
    }
  };

  const prevStep = () => {
    if (selectedTrek) { setSelectedTrek(null); return; }
    if (results) { setResults(null); return; }
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({ difficulty: '', duration: '', interests: [], accommodation: 'teahouse', extras: [] });
    setResults(null);
    setSelectedTrek(null);
  };

  const getTotalPrice = (trek) => {
    const accPrice = accommodations.find(a => a.id === answers.accommodation)?.priceAdd || 0;
    const extrasPrice = answers.extras.reduce((sum, id) => sum + (extras.find(e => e.id === id)?.price || 0), 0);
    return trek.price + accPrice + extrasPrice;
  };

  const generatePDF = async (trek) => {
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      const total = getTotalPrice(trek);

      doc.setFontSize(20);
      doc.text(`Project Peak - ${trek.name} Itinerary`, 14, 20);

      doc.setFontSize(11);
      doc.text(`Duration: ${trek.days} Days`, 14, 30);
      doc.text(`Max Altitude: ${trek.altitude}`, 14, 37);
      doc.text(`Total Estimated Cost: $${total} USD`, 14, 44);

      let y = 58;
      doc.setFontSize(14);
      doc.text('Day-by-Day Route Overview', 14, y);
      y += 8;

      doc.setFontSize(10);
      trek.itinerary.forEach((day) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(`Day ${day.day} [${day.alt}]: ${day.place}`, 14, y);
        y += 5;
        doc.text(`   ${day.desc}`, 14, y);
        y += 8;
      });

      doc.save(`ProjectPeak_${trek.name.replace(/\s+/g, '_')}_Itinerary.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF", err);
    }
  };

  return (
    <section id="itinerary-planner" ref={sectionRef} className="py-6 md:py-10 px-4 sm:px-6 md:px-12 w-full">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-8">
          <span className="bg-neonLime text-black px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest inline-block mb-2 shadow-sm">
            {t('planner.badge')}
          </span>
          <h2 className="font-condensed font-extrabold text-4xl sm:text-5xl uppercase text-darkSlate dark:text-creamBg tracking-wide">
            {t('planner.title')}
          </h2>
        </div>

        {/* Progress Dots */}
        {!results && !selectedTrek && (
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-neonLime shadow-[0_0_10px_rgba(204,255,0,0.8)]' : i < currentStep ? 'w-4 bg-neonLime/60' : 'w-4 bg-black/10 dark:bg-white/10'}`}></div>
            ))}
          </div>
        )}

        <div ref={itineraryRef} className="relative bg-white dark:bg-darkSlate/90 border border-creamBorder/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl overflow-hidden">

          {/* Step 1: Difficulty */}
          {!results && !selectedTrek && currentStep === 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Gauge size={22} className="text-darkSlate dark:text-neonLime" />
                <h3 className="font-condensed font-extrabold text-2xl uppercase text-darkSlate dark:text-creamBg">What's your fitness level?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <OptionButton selected={answers.difficulty === 'easy'} onClick={() => selectOption('difficulty', 'easy')}>
                  <div className="flex items-center gap-2 mb-1"><Footprints size={18} /> Easy</div>
                  <span className="font-normal text-xs opacity-70">Scenic walks, 3-5 hrs/day</span>
                </OptionButton>
                <OptionButton selected={answers.difficulty === 'moderate'} onClick={() => selectOption('difficulty', 'moderate')}>
                  <div className="flex items-center gap-2 mb-1"><TrendingUp size={18} /> Moderate</div>
                  <span className="font-normal text-xs opacity-70">Challenging trails, 5-7 hrs/day</span>
                </OptionButton>
                <OptionButton selected={answers.difficulty === 'hard'} onClick={() => selectOption('difficulty', 'hard')}>
                  <div className="flex items-center gap-2 mb-1"><Mountain size={18} /> Hard</div>
                  <span className="font-normal text-xs opacity-70">High altitude, 7+ hrs/day</span>
                </OptionButton>
              </div>
            </div>
          )}

          {/* Step 2: Duration */}
          {!results && !selectedTrek && currentStep === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CalendarDays size={22} className="text-darkSlate dark:text-neonLime" />
                <h3 className="font-condensed font-extrabold text-2xl uppercase text-darkSlate dark:text-creamBg">How many days do you have?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <OptionButton selected={answers.duration === 'short'} onClick={() => selectOption('duration', 'short')}>
                  <div className="flex items-center gap-2 mb-1"><Timer size={18} /> Under 7 days</div>
                  <span className="font-normal text-xs opacity-70">Quick adventures</span>
                </OptionButton>
                <OptionButton selected={answers.duration === 'medium'} onClick={() => selectOption('duration', 'medium')}>
                  <div className="flex items-center gap-2 mb-1"><Clock size={18} /> 7–14 days</div>
                  <span className="font-normal text-xs opacity-70">Classic treks</span>
                </OptionButton>
                <OptionButton selected={answers.duration === 'long'} onClick={() => selectOption('duration', 'long')}>
                  <div className="flex items-center gap-2 mb-1"><CalendarRange size={18} /> 14+ days</div>
                  <span className="font-normal text-xs opacity-70">Epic expeditions</span>
                </OptionButton>
              </div>
            </div>
          )}

          {/* Step 3: Interests */}
          {!results && !selectedTrek && currentStep === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Mountain size={22} className="text-darkSlate dark:text-neonLime" />
                <h3 className="font-condensed font-extrabold text-2xl uppercase text-darkSlate dark:text-creamBg">What interests you most?</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {['mountains', 'culture', 'sunrise', 'offbeat', 'diversity'].map(interest => (
                  <button key={interest} onClick={() => toggleInterest(interest)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all capitalize ${answers.interests.includes(interest) ? 'bg-neonLime text-black' : 'bg-black/5 dark:bg-white/10 text-darkSlate dark:text-creamBg hover:bg-black/10'}`}>
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Accommodation */}
          {!results && !selectedTrek && currentStep === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Bed size={22} className="text-darkSlate dark:text-neonLime" />
                <h3 className="font-condensed font-extrabold text-2xl uppercase text-darkSlate dark:text-creamBg">Choose your stay</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {accommodations.map(acc => (
                  <OptionButton key={acc.id} selected={answers.accommodation === acc.id} onClick={() => selectOption('accommodation', acc.id)}>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="font-bold">{acc.label}</div>
                        <span className="font-normal text-xs opacity-70">{acc.desc}</span>
                      </div>
                      {acc.priceAdd > 0 && <span className="font-bold text-xs bg-darkSlate text-white px-2.5 py-1 rounded">+{convertPrice(acc.priceAdd)}</span>}
                    </div>
                  </OptionButton>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Extras */}
          {!results && !selectedTrek && currentStep === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Backpack size={22} className="text-darkSlate dark:text-neonLime" />
                <h3 className="font-condensed font-extrabold text-2xl uppercase text-darkSlate dark:text-creamBg">Add-ons (optional)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {extras.map(extra => (
                  <button key={extra.id} onClick={() => toggleExtra(extra.id)}
                    className={`px-5 py-4 rounded-xl border-2 font-sans text-sm text-left transition-all ${answers.extras.includes(extra.id) ? 'border-darkSlate bg-neonLime text-black font-extrabold' : 'border-creamBorder/70 bg-white/60 dark:bg-black/20'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{extra.label}</span>
                      <span className="font-bold text-xs">+{convertPrice(extra.price)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {results && !selectedTrek && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle size={22} className="text-darkSlate dark:text-neonLime" />
                <h3 className="font-condensed font-extrabold text-3xl uppercase text-darkSlate dark:text-creamBg">Your Recommended Treks</h3>
              </div>
              <div className="flex flex-col gap-4">
                {results.map((trek, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-creamBorder/80 bg-creamCard/50 dark:bg-black/20 hover:border-darkSlate transition-colors">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-condensed font-extrabold text-2xl text-darkSlate dark:text-creamBg">{trek.name}</h4>
                          <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold" style={{ color: crowdColors[trek.crowd] }}>
                            <span className="w-2 h-2 rounded-full" style={{ background: crowdColors[trek.crowd] }}></span>
                            {crowdLabels[trek.crowd]}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-darkSlate/70 dark:text-creamBg/70 font-medium">
                          {trek.days} days · Altitude: {trek.altitude} · <span className="capitalize font-bold">{trek.difficulty}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-sans font-extrabold text-lg text-darkSlate dark:text-creamBg">{convertPrice(getTotalPrice(trek))}</span>
                        <button onClick={() => setSelectedTrek(trek)} className="bg-neonLime text-black px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider hover:bg-[#b8e600] transition-colors flex items-center gap-2 shadow-sm">
                          View Itinerary <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Itinerary View */}
          {selectedTrek && (
            <div ref={itineraryRef}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-condensed font-extrabold text-3xl text-darkSlate dark:text-creamBg uppercase">{selectedTrek.name}</h3>
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold" style={{ color: crowdColors[selectedTrek.crowd] }}>
                      <Users size={12} />
                      {crowdLabels[selectedTrek.crowd]}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-darkSlate/60 dark:text-creamBg/60">
                    {selectedTrek.days} days · Altitude: {selectedTrek.altitude} · {accommodations.find(a => a.id === answers.accommodation)?.label}
                  </p>
                </div>
                <button onClick={() => generatePDF(selectedTrek)} className="flex items-center gap-2 bg-darkSlate text-white dark:bg-creamBg dark:text-darkSlate px-5 py-2 rounded-full font-sans text-xs font-extrabold uppercase tracking-wider hover:opacity-90 transition-opacity">
                  <Download size={14} /> Download PDF
                </button>
              </div>

              {/* Price breakdown */}
              <div className="bg-creamCard dark:bg-black/30 rounded-2xl p-5 mb-6 font-sans text-xs border border-creamBorder/70">
                <div className="flex justify-between text-darkSlate/70 dark:text-creamBg/70 mb-1">
                  <span>Base trek price</span><span>{convertPrice(selectedTrek.price)}</span>
                </div>
                {accommodations.find(a => a.id === answers.accommodation)?.priceAdd > 0 && (
                  <div className="flex justify-between text-darkSlate/70 dark:text-creamBg/70 mb-1">
                    <span>{accommodations.find(a => a.id === answers.accommodation)?.label}</span>
                    <span>+{convertPrice(accommodations.find(a => a.id === answers.accommodation)?.priceAdd)}</span>
                  </div>
                )}
                {answers.extras.map(id => {
                  const ex = extras.find(e => e.id === id);
                  return ex ? (
                    <div key={id} className="flex justify-between text-darkSlate/70 dark:text-creamBg/70 mb-1">
                      <span>{ex.label}</span><span>+{convertPrice(ex.price)}</span>
                    </div>
                  ) : null;
                })}
                <div className="flex justify-between font-bold text-sm text-darkSlate dark:text-creamBg pt-2 border-t border-creamBorder mt-2">
                  <span>Total Package Price</span><span className="font-extrabold">{convertPrice(getTotalPrice(selectedTrek))}</span>
                </div>
              </div>

              {/* Elevation Profile */}
              <ElevationProfile itinerary={selectedTrek.itinerary} />

              {/* Day-by-day */}
              <div className="flex flex-col gap-0 mt-6">
                {selectedTrek.itinerary.map((day, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className={`w-3.5 h-3.5 rounded-full shrink-0 border-2 ${i === 0 ? 'bg-neonLime border-black' : i === selectedTrek.itinerary.length - 1 ? 'bg-red-500 border-black' : 'bg-creamCanvas dark:bg-darkSlate border-darkSlate'}`}></div>
                      {i < selectedTrek.itinerary.length - 1 && <div className="w-0.5 flex-1 bg-darkSlate/20 dark:bg-white/20"></div>}
                    </div>
                    <div className="pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-sans text-xs font-extrabold text-darkSlate dark:text-neonLime uppercase tracking-wider">Day {day.day}</span>
                        <span className="font-sans text-[10px] text-darkSlate/50 dark:text-creamBg/50 font-semibold">{day.alt}</span>
                      </div>
                      <h4 className="font-condensed font-extrabold text-xl text-darkSlate dark:text-creamBg mb-0.5">{day.place}</h4>
                      <p className="font-sans text-xs text-darkSlate/70 dark:text-creamBg/70">{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Book CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button onClick={() => generatePDF(selectedTrek)} className="flex-1 flex items-center justify-center gap-2 bg-darkSlate text-white px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors">
                  <Download size={16} /> Save PDF
                </button>
                <button onClick={() => {
                  const msg = `Hi! I'd like to book the *${selectedTrek.name}* trek (${selectedTrek.days} days, ${convertPrice(getTotalPrice(selectedTrek))}, ${accommodations.find(a => a.id === answers.accommodation)?.label}). My itinerary is ready!`;
                  window.open(`https://wa.me/9779801234567?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                }} className="flex-1 bg-neonLime text-black px-6 py-3 rounded-full font-condensed font-extrabold text-lg uppercase tracking-wider hover:bg-[#b8e600] transition-colors text-center shadow-md">
                  Book This Trek
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          {!selectedTrek && (
            <div className="flex justify-between mt-8 pt-6 border-t border-creamBorder">
              <button onClick={currentStep === 0 && !results ? undefined : prevStep}
                className={`flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider transition-colors ${currentStep === 0 && !results ? 'opacity-30 cursor-not-allowed' : 'hover:text-black'}`}
                disabled={currentStep === 0 && !results}>
                <ArrowLeft size={16} /> Back
              </button>
              {results ? (
                <button onClick={reset} className="font-sans text-xs font-bold uppercase tracking-wider text-darkSlate hover:underline">Start Over</button>
              ) : (
                <button onClick={nextStep}
                  className="bg-neonLime text-black px-6 py-2.5 rounded-full font-condensed font-extrabold text-lg uppercase tracking-widest flex items-center gap-2 hover:bg-[#b8e600] transition-colors shadow-sm">
                  {currentStep === steps.length - 1 ? 'Find Treks' : 'Next'} <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}

          {selectedTrek && (
            <div className="flex justify-between mt-6 pt-4 border-t border-creamBorder">
              <button onClick={prevStep} className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-darkSlate hover:text-black transition-colors">
                <ArrowLeft size={16} /> Back to Results
              </button>
              <button onClick={reset} className="font-sans text-xs font-bold uppercase tracking-wider text-darkSlate hover:underline">Start Over</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItineraryPlanner;
