import React, { useState, useEffect, useRef } from 'react';
import { X, Compass as CompassIcon, Navigation, RotateCcw, ShieldCheck, Zap } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Compass = ({ isOpen, onClose }) => {
  const { t } = useSettings();
  const [heading, setHeading] = useState(345);
  const [pitch, setPitch] = useState(4);
  const [roll, setRoll] = useState(-2);
  const [permissionState, setPermissionState] = useState('granted');
  const [isManual, setIsManual] = useState(false);
  const canvasRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  const requestPermission = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const result = await DeviceOrientationEvent.requestPermission();
        setPermissionState(result === 'granted' ? 'granted' : 'denied');
      } catch {
        setPermissionState('denied');
      }
    } else if ('DeviceOrientationEvent' in window) {
      setPermissionState('granted');
    } else {
      setPermissionState('granted'); // Fallback to interactive mode
    }
  };

  // Device orientation listener
  useEffect(() => {
    if (!isOpen || permissionState !== 'granted' || isManual) return;

    const handleOrientation = (e) => {
      let compassHeading = 0;
      if (e.webkitCompassHeading !== undefined) {
        compassHeading = e.webkitCompassHeading;
      } else if (e.alpha !== null) {
        compassHeading = 360 - e.alpha;
      }
      if (compassHeading) {
        setHeading(Math.round((compassHeading + 360) % 360));
      }
      if (e.beta !== null) setPitch(Math.round(e.beta));
      if (e.gamma !== null) setRoll(Math.round(e.gamma));
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation, true);
  }, [isOpen, permissionState, isManual]);

  // HD Vector Canvas Renderer with High DPI Scale
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // High-DPI Scaling for Retina Crispness
    const dpr = window.devicePixelRatio || 2;
    const displaySize = 340;
    canvas.width = displaySize * dpr;
    canvas.height = displaySize * dpr;
    ctx.scale(dpr, dpr);

    const center = displaySize / 2;
    const outerR = center - 12;
    const innerR = outerR - 28;

    ctx.clearRect(0, 0, displaySize, displaySize);

    // 1. Outer Metallic Bezel Ring
    const gradBezel = ctx.createRadialGradient(center, center, outerR - 10, center, center, outerR + 10);
    gradBezel.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
    gradBezel.addColorStop(0.5, 'rgba(20, 32, 42, 0.95)');
    gradBezel.addColorStop(1, 'rgba(0, 0, 0, 0.9)');

    ctx.beginPath();
    ctx.arc(center, center, outerR, 0, Math.PI * 2);
    ctx.fillStyle = gradBezel;
    ctx.fill();
    ctx.strokeStyle = 'rgba(204, 255, 0, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner Dish Background Gradient
    const dishGrad = ctx.createRadialGradient(center, center, 0, center, center, innerR);
    dishGrad.addColorStop(0, 'rgba(15, 25, 35, 0.98)');
    dishGrad.addColorStop(0.85, 'rgba(10, 18, 25, 0.95)');
    dishGrad.addColorStop(1, 'rgba(5, 10, 15, 0.98)');

    ctx.beginPath();
    ctx.arc(center, center, innerR, 0, Math.PI * 2);
    ctx.fillStyle = dishGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 2. Crosshair Grid Lines in Dish
    ctx.strokeStyle = 'rgba(204, 255, 0, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(center - innerR + 20, center);
    ctx.lineTo(center + innerR - 20, center);
    ctx.moveTo(center, center - innerR + 20);
    ctx.lineTo(center, center + innerR - 20);
    ctx.stroke();

    // 3. Azimuth Degree Ticks & Numbers (Rotates with Heading)
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate((-heading * Math.PI) / 180);

    for (let i = 0; i < 360; i += 2) {
      const rad = (i * Math.PI) / 180 - Math.PI / 2;
      const isCardinal = i % 90 === 0;
      const isMajor = i % 30 === 0;
      const isMedium = i % 10 === 0;

      let tickLen = 5;
      let strokeStyle = 'rgba(255, 255, 255, 0.2)';
      let lineWidth = 0.8;

      if (isCardinal) {
        tickLen = 14;
        strokeStyle = '#CCFF00';
        lineWidth = 2.5;
      } else if (isMajor) {
        tickLen = 10;
        strokeStyle = 'rgba(255, 255, 255, 0.7)';
        lineWidth = 1.8;
      } else if (isMedium) {
        tickLen = 7;
        strokeStyle = 'rgba(255, 255, 255, 0.4)';
        lineWidth = 1.2;
      }

      const r1 = innerR;
      const r2 = innerR - tickLen;

      ctx.beginPath();
      ctx.moveTo(r1 * Math.cos(rad), r1 * Math.sin(rad));
      ctx.lineTo(r2 * Math.cos(rad), r2 * Math.sin(rad));
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      // Degree numbers on 30° intervals
      if (isMajor && !isCardinal) {
        const textR = innerR - 22;
        ctx.font = '700 9px "Outfit", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${i}°`, textR * Math.cos(rad), textR * Math.sin(rad));
      }
    }

    // 4. Tactical 3D Cardinal Letter Markers
    const cardinals = [
      { letter: 'N', deg: 0, color: '#FF3B30', size: '18px' },
      { letter: 'E', deg: 90, color: '#CCFF00', size: '16px' },
      { letter: 'S', deg: 180, color: '#FFFFFF', size: '16px' },
      { letter: 'W', deg: 270, color: '#CCFF00', size: '16px' },
    ];

    cardinals.forEach(({ letter, deg, color, size }) => {
      const rad = (deg * Math.PI) / 180 - Math.PI / 2;
      const textR = innerR - 24;
      ctx.font = `900 ${size} "Bebas Neue", sans-serif`;
      ctx.fillStyle = color;
      ctx.shadowColor = color === '#FF3B30' ? 'rgba(255, 59, 48, 0.6)' : 'rgba(204, 255, 0, 0.3)';
      ctx.shadowBlur = 8;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(letter, textR * Math.cos(rad), textR * Math.sin(rad));
      ctx.shadowBlur = 0; // reset
    });

    ctx.restore(); // Restore heading rotation

    // 5. Fixed Top Alignment Reticle (Always points straight UP to current heading)
    ctx.beginPath();
    ctx.moveTo(center, center - innerR - 10);
    ctx.lineTo(center - 8, center - innerR + 4);
    ctx.lineTo(center + 8, center - innerR + 4);
    ctx.closePath();
    ctx.fillStyle = '#CCFF00';
    ctx.fill();
    ctx.shadowColor = 'rgba(204, 255, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 6. Modern 3D Dynamic Needle (Fixed pointing North relative to dial)
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate((-heading * Math.PI) / 180);

    const needleR = innerR - 44;

    // North Spear (Red Luminous)
    ctx.beginPath();
    ctx.moveTo(0, -needleR);
    ctx.lineTo(8, 0);
    ctx.lineTo(0, -6);
    ctx.closePath();
    ctx.fillStyle = '#FF3B30';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, -needleR);
    ctx.lineTo(-8, 0);
    ctx.lineTo(0, -6);
    ctx.closePath();
    ctx.fillStyle = '#D70015';
    ctx.fill();

    // South Spear (Cyan / Silver Metallic)
    ctx.beginPath();
    ctx.moveTo(0, needleR);
    ctx.lineTo(8, 0);
    ctx.lineTo(0, 6);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, needleR);
    ctx.lineTo(-8, 0);
    ctx.lineTo(0, 6);
    ctx.closePath();
    ctx.fillStyle = 'rgba(200, 210, 220, 0.5)';
    ctx.fill();

    ctx.restore();

    // 7. Metallic Central Pivot Cap
    ctx.beginPath();
    ctx.arc(center, center, 10, 0, Math.PI * 2);
    const capGrad = ctx.createLinearGradient(center - 10, center - 10, center + 10, center + 10);
    capGrad.addColorStop(0, '#FFFFFF');
    capGrad.addColorStop(0.5, '#486581');
    capGrad.addColorStop(1, '#0F172A');
    ctx.fillStyle = capGrad;
    ctx.fill();
    ctx.strokeStyle = '#CCFF00';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#CCFF00';
    ctx.fill();

  }, [heading, isOpen]);

  if (!isOpen) return null;

  const getDirection = (deg) => {
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round(deg / 22.5) % 16;
    return dirs[idx];
  };

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    setIsManual(true);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    startXRef.current = e.clientX;
    setHeading((prev) => (prev - deltaX + 360) % 360);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-[#0b131b]/90 border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl text-white"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-all text-white/80 hover:text-white cursor-pointer" 
          aria-label="Close compass"
        >
          <X size={18} />
        </button>

        {/* Top Header Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neonLime animate-ping" />
            <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-neonLime">
              {isManual ? 'MANUAL OVERRIDE' : 'TACTICAL HUD V3.4'}
            </span>
          </div>
          <span className="font-sans text-[10px] uppercase tracking-wider text-white/40 font-semibold flex items-center gap-1">
            <ShieldCheck size={12} className="text-neonLime" /> GPS & GYRO SYNCED
          </span>
        </div>

        <h2 className="font-condensed font-extrabold text-3xl sm:text-4xl text-creamBg text-center uppercase tracking-wide">
          {t('nav.compass')}
        </h2>
        <p className="font-sans text-xs text-creamBg/60 mb-6 text-center">
          Real-time high-definition Himalayan navigation sensor
        </p>

        {/* Compass Canvas Container */}
        <div className="flex flex-col items-center">
          <div className="relative group cursor-grab active:cursor-grabbing">
            <canvas 
              ref={canvasRef} 
              className="mx-auto transition-transform duration-100" 
              style={{ width: '340px', height: '340px' }} 
            />
          </div>

          {/* Digital Telemetry Display Bar */}
          <div className="w-full mt-6 bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div className="text-left">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-0.5">
                BEARING / AZIMUTH
              </span>
              <p className="font-condensed font-extrabold text-4xl text-neonLime tracking-tight flex items-baseline gap-2">
                {Math.round(heading)}°
                <span className="font-sans text-xs font-bold bg-neonLime/20 text-neonLime px-2.5 py-0.5 rounded-md border border-neonLime/30">
                  {getDirection(heading)}
                </span>
              </p>
            </div>

            <div className="text-right flex items-center gap-4">
              <div>
                <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-white/40 block">PITCH</span>
                <span className="font-condensed font-bold text-lg text-white">{pitch}°</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-white/40 block">ROLL</span>
                <span className="font-condensed font-bold text-lg text-white">{roll}°</span>
              </div>
            </div>
          </div>

          {/* Quick Presets & Sensor Reset Bar */}
          <div className="w-full flex items-center justify-between gap-2 mt-4">
            <div className="flex items-center gap-1.5">
              {[0, 90, 180, 270].map((deg) => (
                <button
                  key={deg}
                  onClick={() => { setHeading(deg); setIsManual(true); }}
                  className={`px-3 py-1.5 rounded-lg font-sans text-[11px] font-extrabold uppercase transition-all ${
                    Math.round(heading) === deg
                      ? 'bg-neonLime text-black shadow-sm'
                      : 'bg-white/5 text-white/70 hover:bg-white/15'
                  }`}
                >
                  {deg === 0 ? 'N 0°' : deg === 90 ? 'E 90°' : deg === 180 ? 'S 180°' : 'W 270°'}
                </button>
              ))}
            </div>

            {isManual && (
              <button
                onClick={() => { setIsManual(false); requestPermission(); }}
                className="p-2 rounded-lg bg-neonLime/20 text-neonLime hover:bg-neonLime hover:text-black transition-colors flex items-center gap-1 font-sans text-[10px] font-bold uppercase"
                title="Reset to Live Sensor"
              >
                <RotateCcw size={12} /> SYNC
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Compass;
