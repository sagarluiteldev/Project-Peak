import React, { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { Sun, Cloud, Menu, X, Compass as CompassIcon } from 'lucide-react';
import gsap from 'gsap';

const Navbar = ({ onCompassOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency, language, setLanguage, t } = useSettings();
  const iconRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleThemeToggle = () => {
    gsap.to(iconRef.current, {
      rotation: '+=180',
      scale: 0.8,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      onComplete: toggleTheme
    });
  };

  const navLinks = [
    { href: '#destinations', label: t('nav.destinations') },
    { href: '#planner', label: 'Planner' },
    { href: '#features', label: t('nav.features') },
    { href: '#testimonials', label: t('nav.testimonials') },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3 w-full">
      <nav className="flex items-center justify-between px-5 py-3 md:px-6 md:py-4 rounded-2xl md:rounded-full transition-all duration-300 w-full max-w-7xl mx-auto bg-white/70 dark:bg-peakDeep/80 backdrop-blur-xl border border-black/5 dark:border-white/10 text-peakDeep dark:text-peakWhite shadow-lg">
        
        <a href="#" className="font-display text-xl md:text-2xl font-bold tracking-wider shrink-0">
          PROJECT PEAK
        </a>
        
        <div className="hidden md:flex gap-6 items-center font-sans tracking-wider text-xs uppercase font-semibold">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="hover-lift hover:text-neonLime transition-colors">{link.label}</a>
          ))}
        </div>
        
        <div className="flex items-center gap-2 md:gap-3">
          <select 
            className="hidden md:block bg-transparent border border-black/10 dark:border-white/15 rounded-lg px-2 py-1 cursor-pointer font-sans text-xs font-semibold uppercase transition-colors text-peakDeep dark:text-peakWhite"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            aria-label="Select currency"
          >
            <option value="NPR">🇳🇵 NPR</option>
            <option value="USD">🇺🇸 USD</option>
            <option value="EUR">🇪🇺 EUR</option>
          </select>

          <select 
            className="hidden md:block bg-transparent border border-black/10 dark:border-white/15 rounded-lg px-2 py-1 cursor-pointer font-sans text-xs font-semibold uppercase transition-colors text-peakDeep dark:text-peakWhite"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Select language"
          >
            <option value="EN">EN</option>
            <option value="FR">FR</option>
            <option value="DE">DE</option>
            <option value="ZH">中文</option>
          </select>

          {/* Compass button */}
          <button 
            onClick={onCompassOpen} 
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Open compass"
          >
            <CompassIcon size={18} />
          </button>

          <button 
            onClick={handleThemeToggle} 
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            <div ref={iconRef}>
              {theme === 'light' ? <Sun size={18} /> : <Cloud size={18} />}
            </div>
          </button>

          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <a href="#destinations" className="hidden md:flex magnetic-btn bg-peakGreen text-white px-5 py-2 rounded-full font-sans uppercase tracking-widest text-xs font-bold hover:shadow-lg hover:shadow-peakGreen/30 transition-all items-center">
            <span className="relative z-10">{t('nav.book')}</span>
          </a>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl bg-white/95 dark:bg-peakDeep/95 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/10 shadow-xl p-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
              className="font-sans text-lg font-semibold py-2 border-b border-black/5 dark:border-white/10 hover:text-neonLime transition-colors"
              onClick={() => setMobileOpen(false)}>{link.label}</a>
          ))}
          <button onClick={() => { onCompassOpen(); setMobileOpen(false); }}
            className="font-sans text-lg font-semibold py-2 border-b border-black/5 dark:border-white/10 hover:text-neonLime transition-colors text-left flex items-center gap-2">
            <CompassIcon size={18} /> Compass
          </button>
          
          <div className="flex gap-3 pt-2">
            <select className="flex-1 bg-transparent border border-black/10 dark:border-white/15 rounded-lg px-3 py-2 cursor-pointer font-sans text-sm font-semibold text-peakDeep dark:text-peakWhite"
              value={currency} onChange={(e) => setCurrency(e.target.value)} aria-label="Select currency">
              <option value="NPR">🇳🇵 NPR</option>
              <option value="USD">🇺🇸 USD</option>
              <option value="EUR">🇪🇺 EUR</option>
            </select>
            <select className="flex-1 bg-transparent border border-black/10 dark:border-white/15 rounded-lg px-3 py-2 cursor-pointer font-sans text-sm font-semibold text-peakDeep dark:text-peakWhite"
              value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Select language">
              <option value="EN">English</option>
              <option value="FR">Français</option>
              <option value="DE">Deutsch</option>
              <option value="ZH">中文</option>
            </select>
          </div>
          <a href="#destinations" className="bg-peakGreen text-white px-6 py-3 rounded-full font-sans uppercase tracking-widest text-sm font-bold text-center hover:shadow-lg transition-all"
            onClick={() => setMobileOpen(false)}>{t('nav.book')}</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
