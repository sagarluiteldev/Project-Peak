import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const word1 = "PROJECT";
const word2 = "PEAK";

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance Animation for Mountain Logo
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.85, y: -25 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );

      // 2. Entrance Animation for Letters (Simultaneous Alternating Top/Bottom Reveal)
      if (titleRef.current) {
        const letters = titleRef.current.querySelectorAll('.preloader-letter');
        letters.forEach((letter, i) => {
          const initialYPercent = i % 2 === 0 ? -120 : 120;
          gsap.fromTo(
            letter,
            { yPercent: initialYPercent },
            {
              yPercent: 0,
              duration: 0.9,
              delay: 0.15,
              ease: 'power3.out',
            }
          );
        });
      }

      // 3. Smooth Exit Animation after short display
      gsap.to(preloaderRef.current, {
        yPercent: -100,
        duration: 1.0,
        delay: 1.3, // Holds for 1.3s then slides up cleanly
        ease: 'power4.inOut',
        onStart: () => {
          // Trigger hero section animations bit earlier as curtain begins sliding up
          if (onComplete) onComplete();
        },
      });

    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-creamCanvas dark:bg-darkSlate flex flex-col items-center justify-center px-4 overflow-hidden select-none"
    >
      <div className="flex flex-col items-center text-center max-w-4xl w-full">
        
        {/* Mountain SVG Logo */}
        <div ref={logoRef} className="mb-6 w-36 sm:w-48 md:w-56">
          <img
            src="/assets/mountain_logo.png"
            alt="Project Peak Mountain Logo"
            className="w-full h-auto object-contain dark:invert filter drop-shadow-md"
          />
        </div>

        {/* Hero Title 'PROJECT PEAK' with Letter Reveal */}
        <h1
          ref={titleRef}
          className="font-condensed font-extrabold text-[3.8rem] sm:text-[6.5rem] md:text-[9rem] lg:text-[11rem] tracking-tight uppercase leading-[0.85] text-darkSlate dark:text-creamBg flex flex-wrap justify-center items-center gap-x-[0.22em]"
        >
          {/* WORD 1: PROJECT */}
          <span className="inline-flex overflow-hidden py-3 px-1">
            {word1.split('').map((char, index) => (
              <span key={`p1-${index}`} className="inline-block px-[0.02em]">
                <span className="preloader-letter inline-block">
                  {char}
                </span>
              </span>
            ))}
          </span>

          {/* WORD 2: PEAK */}
          <span className="inline-flex overflow-hidden py-3 px-1">
            {word2.split('').map((char, index) => (
              <span key={`p2-${index}`} className="inline-block px-[0.02em]">
                <span className="preloader-letter inline-block">
                  {char}
                </span>
              </span>
            ))}
          </span>
        </h1>

      </div>
    </div>
  );
};

export default Preloader;
