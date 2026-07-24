import React, { useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { treks } from '../data/treks';

gsap.registerPlugin(ScrollTrigger);

const word1 = "PROJECT";
const word2 = "PEAK";

const Hero = ({ ready = true }) => {
  const { t } = useSettings();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const miniImages = treks.slice(0, 6).map(trek => trek.image);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!titleRef.current) return;
      const letters = titleRef.current.querySelectorAll('.hero-letter');
      const frames = heroRef.current.querySelectorAll('.mini-frame, .mobile-frame');
      const taglineBtn = heroRef.current.querySelectorAll('.hero-tagline, .hero-btn');
      
      // Set initial hidden states immediately to prevent FOUC while preloader is active
      gsap.set(letters, { scale: 0.8, opacity: 0 });
      gsap.set(frames, { scale: 0, opacity: 0 });
      gsap.set(taglineBtn, { y: 30, opacity: 0 });

      // Only play animations if the preloader is finished (ready is true)
      if (!ready) return;

      // --- 1. Master Opening Animation Timeline ---
      const tl = gsap.timeline();
      
      // Letters fade and scale in
      tl.to(letters, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.04,
        ease: 'expo.out',
      }, 0);

      // Elastic pop-in for frames - starting bit earlier
      tl.to(frames, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.06,
        ease: 'elastic.out(1, 0.7)',
      }, 0.05);

      // Fade in tagline and button smoothly
      tl.to(taglineBtn, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
      }, 0.15);

      // --- 2. Scroll-Triggered Parallax ---
      const desktopFrames = heroRef.current.querySelectorAll('.mini-frame');
      desktopFrames.forEach((frame, i) => {
        const yMove = i % 2 === 0 ? -120 : 120;
        gsap.to(frame, {
          y: yMove,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          }
        });
      });

      // Mobile top frame
      const mobileTopFrame = heroRef.current.querySelector('.mobile-frame-top');
      if (mobileTopFrame) {
        gsap.to(mobileTopFrame, {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          }
        });
      }

      // Mobile bottom frames (left & right) animate together with exact same animation
      const mobileBottomFrames = heroRef.current.querySelectorAll('.mobile-frame-bottom');
      if (mobileBottomFrames.length > 0) {
        gsap.to(mobileBottomFrames, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          }
        });
      }

      // Subtle parallax for the main title text
      gsap.to(titleRef.current, {
        y: 80,
        scale: 0.95,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
      
    }, heroRef);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="hero" ref={heroRef} className="min-h-[100dvh] flex flex-col justify-center items-center pt-32 md:pt-40 lg:pt-48 pb-8 px-4 sm:px-6 md:px-12 w-full text-center overflow-hidden select-none">
      
      {/* Massive Editorial Header Title with Masked Overflow and Mini Image Frames */}
      <h1
        ref={titleRef}
        className="font-condensed font-extrabold text-[4.6rem] xs:text-[5.4rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] xl:text-[15.5rem] tracking-tight uppercase leading-[0.85] text-darkSlate dark:text-creamBg my-2 flex flex-wrap justify-center items-center gap-x-[0.22em] relative z-10"
      >
        {/* Mini Image Frames (Absolute to the H1) - Hidden on Mobile */}
        <div className="mini-frame hidden md:block absolute -top-[35%] -left-[2%] w-[14%] aspect-square rounded-2xl overflow-hidden shadow-xl z-[-1] border-4 border-white/80 dark:border-darkSlate/80">
          <img src={miniImages[0]} alt="Trek 1" className="w-full h-full object-cover" />
        </div>
        <div className="mini-frame hidden md:block absolute -top-[32%] -right-[6%] w-[13%] aspect-square rounded-2xl overflow-hidden shadow-2xl z-20 border-4 border-white/80 dark:border-darkSlate/80">
          <img src={miniImages[1]} alt="Trek 2" className="w-full h-full object-cover" />
        </div>
        <div className="mini-frame hidden md:block absolute -bottom-[32%] left-[2%] w-[12%] aspect-square rounded-2xl overflow-hidden shadow-lg z-20 border-4 border-white/80 dark:border-darkSlate/80">
          <img src={miniImages[2]} alt="Trek 3" className="w-full h-full object-cover" />
        </div>
        <div className="mini-frame hidden md:block absolute -bottom-[38%] -right-[2%] w-[14%] aspect-square rounded-2xl overflow-hidden shadow-xl z-[-1] border-4 border-white/80 dark:border-darkSlate/80">
          <img src={miniImages[3]} alt="Trek 4" className="w-full h-full object-cover" />
        </div>
        <div className="mini-frame hidden md:block absolute -top-[45%] left-[45%] w-[12%] aspect-square rounded-2xl overflow-hidden shadow-lg z-[-1] border-4 border-white/80 dark:border-darkSlate/80">
          <img src={miniImages[4]} alt="Trek 5" className="w-full h-full object-cover" />
        </div>
        <div className="mini-frame hidden md:block absolute -bottom-[45%] right-[35%] w-[13%] aspect-square rounded-2xl overflow-hidden shadow-2xl z-20 border-4 border-white/80 dark:border-darkSlate/80">
          <img src={miniImages[5]} alt="Trek 6" className="w-full h-full object-cover" />
        </div>

        {/* WORD 1: PROJECT - Masked container prevents letters from bleeding into text below */}
        <span className="inline-flex overflow-hidden py-3 px-1 relative z-10">
          {word1.split('').map((char, index) => {
            return (
              <span key={`w1-${index}`} className="inline-block px-[0.02em]">
                <span className="hero-letter inline-block">
                  {char}
                </span>
              </span>
            );
          })}
        </span>

        {/* WORD 2: PEAK - Masked container prevents letters from bleeding into text below */}
        <span className="inline-flex overflow-hidden py-3 px-1 relative z-10">
          {word2.split('').map((char, index) => {
            return (
              <span key={`w2-${index}`} className="inline-block px-[0.02em]">
                <span className="hero-letter inline-block">
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      </h1>

      {/* Mobile-Only Bento Stack - Bottom left & bottom right frames synced */}
      <div className="md:hidden grid grid-cols-2 gap-3 sm:gap-4 mt-8 w-full max-w-full px-1 sm:px-0 mx-auto z-20">
        <div className="mobile-frame mobile-frame-top col-span-2 aspect-[2.1/1] rounded-2xl overflow-hidden shadow-xl border-2 border-white/80 dark:border-darkSlate/80">
          <img src={miniImages[0]} alt="Trek Mobile 1" className="w-full h-full object-cover" />
        </div>
        <div className="mobile-frame mobile-frame-bottom aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white/80 dark:border-darkSlate/80">
          <img src={miniImages[1]} alt="Trek Mobile 2" className="w-full h-full object-cover" />
        </div>
        <div className="mobile-frame mobile-frame-bottom aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white/80 dark:border-darkSlate/80">
          <img src={miniImages[2]} alt="Trek Mobile 3" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Nature Statement Tagline & Electric Neon Lime Pill Button */}
      <div className="max-w-3xl mx-auto mt-12 md:mt-48 flex flex-col items-center text-center relative z-20">
        <p className="hero-tagline text-darkSlate/80 dark:text-creamBg/80 font-sans text-sm sm:text-base md:text-lg leading-relaxed mb-8 font-semibold">
          {t('hero.natureDesc')}
        </p>

        {/* Electric Neon Lime Pill Button */}
        <a
          href="#destinations"
          className="hero-btn magnetic-btn bg-neonLime hover:bg-[#b8e600] text-black font-condensed font-extrabold text-xl md:text-2xl tracking-widest uppercase px-10 py-3.5 sm:px-14 sm:py-4 rounded-full shadow-[0_10px_35px_rgba(204,255,0,0.35)] hover:scale-105 transition-all flex items-center gap-3"
        >
          <span>{t('hero.cta')}</span>
          <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>

    </section>
  );
};

export default Hero;
