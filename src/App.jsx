import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Destinations from './components/Destinations';
import LogisticsCards from './components/LogisticsCards';
import FeaturesBox from './components/FeaturesBox';
import ItineraryPlanner from './components/ItineraryPlanner';
import PermitDashboard from './components/PermitDashboard';
import GearChecker from './components/GearChecker';
import FitnessCalculator from './components/FitnessCalculator';
import WeatherWidget from './components/WeatherWidget';
import Testimonials from './components/Testimonials';
import StatementBanner from './components/StatementBanner';
import Footer from './components/Footer';
import Compass from './components/Compass';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OfflineDashboard from './components/OfflineDashboard';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
});

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

const sections = [
  { id: 'hero', label: 'Top' },
  { id: 'bento', label: 'Regions' },
  { id: 'destinations', label: 'Treks' },
  { id: 'logistics', label: 'Logistics' },
  { id: 'itinerary-planner', label: 'Planner' },
  { id: 'weather-widget', label: 'Weather' },
  { id: 'permit-dashboard', label: 'Permits' },
  { id: 'gear-checker', label: 'Gear' },
  { id: 'fitness-calculator', label: 'Fitness' },
  { id: 'testimonials', label: 'Reviews' }
];

const InteractiveTimeline = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 w-8 z-[80] hidden lg:flex flex-col items-center gap-4 py-4">
      {sections.map(({ id, label }, index) => {
        const isActive = activeSection === id;
        return (
          <div key={id} className="relative group w-full flex justify-center">
            <div className={`absolute right-6 top-1/2 -translate-y-1/2 bg-darkSlate text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${isActive ? 'bg-neonLime text-black' : ''}`}>
              {label}
            </div>
            
            {index > 0 && <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-darkSlate/10 dark:bg-white/10" />}
            
            <button
              onClick={() => scrollToSection(id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 relative z-10 ${isActive ? 'bg-neonLime scale-150 shadow-[0_0_8px_rgba(204,255,0,0.8)]' : 'bg-darkSlate/20 dark:bg-white/20 hover:bg-darkSlate/40'}`}
              aria-label={`Scroll to ${label}`}
            />
          </div>
        );
      })}
    </div>
  );
};

function App() {
  const [compassOpen, setCompassOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', refreshScrollTrigger);

    return () => {
      window.removeEventListener('load', refreshScrollTrigger);
      lenis.destroy();
    };
  }, []);

  if (!isOnline) {
    return <OfflineDashboard />;
  }

  return (
    <div className="min-h-screen bg-creamCanvas text-darkSlate dark:bg-[#121c27] dark:text-creamBg relative selection:bg-neonLime selection:text-black">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-neonLime focus:text-black focus:px-4 focus:py-2 focus:rounded font-bold">
        Skip to content
      </a>

      <InteractiveTimeline />
      <Navbar onCompassOpen={() => setCompassOpen(true)} />
      <Compass isOpen={compassOpen} onClose={() => setCompassOpen(false)} />

      <div className="w-full">
        <main id="main-content">
          <Hero ready={!loading} />
          
          <div id="bento">
            <BentoGrid />
          </div>

          <Destinations />

          <div id="logistics">
            <LogisticsCards />
          </div>

          <div id="itinerary-planner">
            <ItineraryPlanner />
          </div>

          <FeaturesBox />

          <div id="weather-widget">
            <WeatherWidget />
          </div>

          <div id="permit-dashboard">
            <PermitDashboard />
          </div>

          <div id="gear-checker">
            <GearChecker />
          </div>

          <div id="fitness-calculator">
            <FitnessCalculator />
          </div>

          <div id="testimonials">
            <Testimonials />
          </div>

          <StatementBanner />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
