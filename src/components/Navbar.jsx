import React, { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { Sun, Cloud, Menu, X, Compass as CompassIcon, Search } from 'lucide-react';
import gsap from 'gsap';

const Navbar = ({ onCompassOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency, language, setLanguage, t } = useSettings();
  const iconRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchExpanded, setSearchExpanded] = useState(false);

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
    { href: '#destinations', label: t('nav.treks') },
    { href: '#itinerary-planner', label: t('nav.planner') },
    { href: '#permit-dashboard', label: t('nav.permits') },
    { href: '#gear-checker', label: t('nav.gear') },
    { href: '#weather-widget', label: t('nav.weather') },
    { href: '#testimonials', label: t('nav.reviews') },
  ];

  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 bg-creamCanvas/90 dark:bg-darkSlate/90 backdrop-blur-md border border-creamBorder/70 dark:border-white/10 px-6 md:px-8 py-4 md:py-5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all">
      <div className="flex items-center justify-between w-full">
        
        {/* Brand Logo (Unchanged PROJECT PEAK) */}
        <a href="#" className="font-condensed text-2xl md:text-3xl font-extrabold tracking-wider shrink-0 text-darkSlate dark:text-creamBg uppercase flex items-center gap-2 md:gap-3 group">
          <img
            src="/assets/mountain_logo.png"
            alt="Mountain Logo"
            className="w-9 h-9 md:w-12 md:h-12 object-contain dark:invert transition-transform group-hover:scale-110"
          />
          <span className="flex items-baseline pt-1">PROJECT PEAK</span>
        </a>
        
        {/* Center Nav Links */}
        <div className={`hidden lg:flex items-center font-sans tracking-wider text-xs uppercase font-bold text-darkSlate/80 dark:text-creamBg/80 transition-all duration-500 ${searchExpanded ? 'gap-3 xl:gap-6' : 'gap-6 xl:gap-8'}`}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="hover:text-black dark:hover:text-neonLime transition-colors whitespace-nowrap">
              {link.label}
            </a>
          ))}
        </div>
        
        {/* Right Utility Bar & Search Capsule */}
        <div className="flex items-center gap-3">
          
          {/* Search Icon / Expanding Input */}
          <div 
            className="hidden md:flex items-center bg-black/5 dark:bg-white/10 rounded-full border border-creamBorder/60 dark:border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
            style={{ width: searchExpanded ? '200px' : '36px', height: '36px' }}
          >
            <button 
              onClick={() => setSearchExpanded(!searchExpanded)}
              className="w-9 h-9 flex items-center justify-center shrink-0 hover:text-neonLime transition-colors text-darkSlate dark:text-creamBg"
              aria-label="Toggle Search"
            >
              {searchExpanded ? <X size={16} /> : <Search size={16} />}
            </button>
            <input
              type="text"
              placeholder={t('nav.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent font-sans text-xs text-darkSlate dark:text-creamBg placeholder:text-darkSlate/40 dark:placeholder:text-creamBg/40 focus:outline-none transition-opacity duration-500 delay-100 ${searchExpanded ? 'opacity-100 w-full pr-3' : 'opacity-0 w-0'}`}
              style={{ pointerEvents: searchExpanded ? 'auto' : 'none' }}
            />
          </div>

          <div className="hidden md:flex items-center gap-2">
            
            {/* Currency Selector */}
            <div className="relative group">
              <select 
                className="appearance-none bg-transparent hover:bg-neonLime hover:text-black hover:border-neonLime border border-creamBorder/60 dark:border-white/15 rounded-full pl-3 pr-6 py-1.5 cursor-pointer font-sans text-[11px] font-bold uppercase tracking-wider text-darkSlate dark:text-creamBg transition-all outline-none"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                aria-label="Select currency"
              >
                <option value="NPR" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">NPR</option>
                <option value="USD" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">USD</option>
                <option value="EUR" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">EUR</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-darkSlate/60 dark:text-creamBg/60 group-hover:text-black transition-colors">
                <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

            {/* Language Selector */}
            <div className="relative group">
              <select 
                className="appearance-none bg-transparent hover:bg-neonLime hover:text-black hover:border-neonLime border border-creamBorder/60 dark:border-white/15 rounded-full pl-3 pr-6 py-1.5 cursor-pointer font-sans text-[11px] font-bold uppercase tracking-wider text-darkSlate dark:text-creamBg transition-all outline-none"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select language"
              >
                <option value="EN" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">EN</option>
                <option value="FR" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">FR</option>
                <option value="DE" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">DE</option>
                <option value="ZH" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">ZH</option>
                <option value="ES" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">ES</option>
                <option value="NO" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">NO</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-darkSlate/60 dark:text-creamBg/60 group-hover:text-black transition-colors">
                <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

            <button 
              onClick={onCompassOpen} 
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Open compass"
              title="Interactive Compass"
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
          </div>

          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="lg:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[calc(100%+1rem)] left-0 right-0 bg-creamCanvas dark:bg-darkSlate border border-creamBorder dark:border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col gap-4 z-[55]">
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
               className="font-condensed text-2xl font-extrabold uppercase py-2 border-b border-creamBorder/50 dark:border-white/10 hover:text-slateTeal transition-colors"
               onClick={() => setMobileOpen(false)}>{link.label}</a>
          ))}
          <button onClick={() => { onCompassOpen(); setMobileOpen(false); }}
                  className="font-sans text-sm font-bold uppercase py-2 border-b border-creamBorder/50 dark:border-white/10 text-left flex items-center gap-2">
            <CompassIcon size={18} /> {t('nav.compass')}
          </button>
          
          <button onClick={() => { handleThemeToggle(); setMobileOpen(false); }}
                  className="font-sans text-sm font-bold uppercase py-2 border-b border-creamBorder/50 dark:border-white/10 text-left flex items-center gap-2">
            {theme === 'light' ? <Sun size={18} /> : <Cloud size={18} />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
          
          <div className="flex gap-3 pt-2">
            <div className="relative flex-1 group">
              <select className="w-full appearance-none bg-transparent hover:bg-neonLime hover:text-black hover:border-neonLime border border-creamBorder/60 dark:border-white/15 rounded-lg pl-3 pr-6 py-2 cursor-pointer font-sans text-xs font-bold uppercase tracking-wider text-darkSlate dark:text-creamBg transition-all outline-none"
                      value={currency} onChange={(e) => setCurrency(e.target.value)} aria-label="Select currency">
                <option value="NPR" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">NPR</option>
                <option value="USD" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">USD</option>
                <option value="EUR" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">EUR</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-darkSlate/60 dark:text-creamBg/60 group-hover:text-black transition-colors">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

            <div className="relative flex-1 group">
              <select className="w-full appearance-none bg-transparent hover:bg-neonLime hover:text-black hover:border-neonLime border border-creamBorder/60 dark:border-white/15 rounded-lg pl-3 pr-6 py-2 cursor-pointer font-sans text-xs font-bold uppercase tracking-wider text-darkSlate dark:text-creamBg transition-all outline-none"
                      value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Select language">
                <option value="EN" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">English</option>
                <option value="FR" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">Français</option>
                <option value="DE" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">Deutsch</option>
                <option value="ZH" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">中文</option>
                <option value="ES" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">Español</option>
                <option value="NO" className="bg-creamCanvas dark:bg-darkSlate text-darkSlate dark:text-creamBg">Norsk</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-darkSlate/60 dark:text-creamBg/60 group-hover:text-black transition-colors">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <a href="#destinations" className="bg-neonLime text-black px-6 py-3 rounded-full font-condensed uppercase tracking-widest text-lg font-extrabold text-center shadow-md transition-all mt-2"
             onClick={() => setMobileOpen(false)}>{t('nav.explore')}</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
