import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, MessageCircle, ArrowRight, ShieldCheck, Mountain } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`Thank you, ${firstName || 'Explorer'}! You have subscribed to Project Peak updates.`);
    setEmail('');
    setFirstName('');
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/9779801234567?text=${encodeURIComponent("Hi Project Peak team! I have a question about your treks.")}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="w-full select-none overflow-hidden">
      
      {/* 1. Realistic Himalayan Mountain Range Silhouette SVG (Single Layer Sketched Peaks) */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mb-1 relative h-24 sm:h-36 md:h-48">
        <svg
          className="w-full h-full text-slateTeal dark:text-darkSlate fill-current relative z-10"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          {/* Main Solid Mountain Silhouette Path */}
          <path d="M0,160 L0,105 L35,102 L70,95 L110,88 L140,78 L170,70 L195,74 L215,82 L240,76 L265,65 L290,48 L310,24 L325,38 L345,52 L375,66 L410,75 L435,78 L455,62 L475,56 L490,66 L510,76 L530,72 L550,64 L575,54 L605,48 L630,56 L650,42 L675,28 L700,32 L720,24 L745,14 L770,10 L790,26 L815,44 L840,56 L865,62 L890,48 L915,42 L940,55 L965,40 L995,20 L1020,32 L1055,48 L1090,62 L1130,68 L1175,76 L1220,80 L1270,84 L1320,82 L1370,88 L1440,92 L1440,160 Z" />

          {/* Inner Ridge Details for Sketched Rock Facet Effect */}
          <path
            d="M310,24 L340,68 M310,24 L270,60 M770,10 L800,50 M770,10 L730,40 M995,20 L1030,58 M995,20 L960,50"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-white/20 dark:text-white/15"
            fill="none"
          />
        </svg>
      </div>

      {/* 2. Main Footer Container matching Site Palette (slateTeal / darkSlate) */}
      <div className="bg-slateTeal dark:bg-darkSlate text-creamBg pt-8 pb-12 px-6 sm:px-10 md:px-16 border-t border-white/10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 items-stretch">
          
          {/* Column 1: Left Navigation & Social Icons */}
          <div className="md:pr-10 md:border-r md:border-white/15 flex flex-col justify-between space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6 group cursor-pointer">
                <img
                  src="/assets/mountain_logo.png"
                  alt="Project Peak Logo"
                  className="w-9 h-9 md:w-10 md:h-10 object-contain brightness-0 invert transition-transform group-hover:scale-110"
                />
                <span className="font-condensed font-extrabold text-2xl md:text-3xl uppercase tracking-wider text-creamBg">
                  PROJECT PEAK
                </span>
              </div>

              <ul className="font-sans text-sm font-semibold space-y-3 text-creamBg/85">
                <li>
                  <a href="#hero" className="hover:text-neonLime transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#destinations" className="hover:text-neonLime transition-colors">Expeditions & Treks</a>
                </li>
                <li>
                  <a href="#permit-dashboard" className="hover:text-neonLime transition-colors">Permits & Logistics</a>
                </li>
                <li>
                  <a href="#weather-widget" className="hover:text-neonLime transition-colors">Weather & Trail Advisory</a>
                </li>
                <li>
                  <a href="https://wa.me/9779801234567" target="_blank" rel="noreferrer" className="hover:text-neonLime transition-colors">Join Our Team</a>
                </li>
              </ul>
            </div>

            {/* Circular Social Media Icons */}
            <div className="flex items-center gap-3 pt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-neonLime hover:text-black hover:border-neonLime transition-all hover:scale-110"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-neonLime hover:text-black hover:border-neonLime transition-all hover:scale-110"
              >
                <Instagram size={18} />
              </a>
              <a
                onClick={openWhatsApp}
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-neonLime hover:text-black hover:border-neonLime transition-all hover:scale-110 cursor-pointer"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-neonLime hover:text-black hover:border-neonLime transition-all hover:scale-110"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Center Newsletter Subscription */}
          <div className="md:px-10 md:border-r md:border-white/15 flex flex-col justify-center text-center items-center">
            <h3 className="font-condensed text-3xl sm:text-4xl text-creamBg font-extrabold uppercase tracking-wide mb-2">
              GET EXPEDITION UPDATES
            </h3>
            <p className="font-sans text-xs text-creamBg/75 max-w-sm mb-6 leading-relaxed">
              Subscribe to our newsletter to receive live Himalayan trail conditions, permit advisories, and exclusive trek announcements.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
              <div>
                <input
                  type="email"
                  required
                  placeholder="*Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 font-sans text-xs text-creamBg placeholder:text-creamBg/50 focus:outline-none focus:border-neonLime transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="*First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="flex-1 bg-black/20 border border-white/20 rounded-xl px-4 py-3 font-sans text-xs text-creamBg placeholder:text-creamBg/50 focus:outline-none focus:border-neonLime transition-colors"
                />
                <button
                  type="submit"
                  className="bg-neonLime hover:bg-[#b8e600] text-black font-condensed font-extrabold text-sm uppercase tracking-wider px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-all shrink-0 cursor-pointer"
                >
                  SIGN UP
                </button>
              </div>
            </form>
          </div>

          {/* Column 3: Right Contact & Accreditation */}
          <div className="md:pl-10 flex flex-col justify-between space-y-6 text-left md:text-right items-start md:items-end">
            <div>
              <button
                onClick={openWhatsApp}
                className="font-condensed font-extrabold text-xl uppercase tracking-wide text-creamBg hover:text-neonLime transition-colors inline-flex items-center gap-2 mb-4 group cursor-pointer"
              >
                <span>Send Us A Message</span>
                <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform text-neonLime" />
              </button>

              <div className="font-sans text-sm text-creamBg/90 space-y-1">
                <p className="font-bold text-base tracking-wide text-neonLime">(977)-980-1234567</p>
                <p className="text-xs text-creamBg/70 leading-relaxed max-w-xs md:ml-auto">
                  285 Thamel Marg, Ward 26<br />
                  Kathmandu, NP 44600, Nepal
                </p>
              </div>
            </div>

            {/* Official Accreditation Seal Emblem */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2.5 border border-white/20 rounded-2xl px-4 py-2.5 bg-black/20">
                <ShieldCheck size={22} className="text-neonLime shrink-0" />
                <div className="text-left font-sans text-[10px] uppercase font-bold tracking-wider leading-tight text-creamBg/90">
                  <span>NTB & TAAN ACCREDITED</span>
                  <span className="block text-creamBg/50 text-[9px]">Expedition License #4820</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Sub-Footer Bottom Bar */}
      <div className="bg-[#1c2b33] dark:bg-[#0b1217] border-t border-white/10 py-4 px-6 sm:px-10 md:px-16 text-[11px] font-sans text-creamBg/50 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div>
          © {new Date().getFullYear()} Project Peak Expeditions Ltd. All Rights Reserved.
        </div>
        <div className="flex items-center gap-6 font-semibold">
          <a href="#" className="hover:text-neonLime transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-neonLime transition-colors">Terms of Service</a>
          <span className="text-creamBg/40">Website By Project Peak</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
