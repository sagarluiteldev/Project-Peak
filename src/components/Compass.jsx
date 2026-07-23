import React, { useState, useEffect, useRef } from 'react';
import { X, Compass as CompassIcon } from 'lucide-react';

const Compass = ({ isOpen, onClose }) => {
  const [heading, setHeading] = useState(0);
  const [permissionState, setPermissionState] = useState('prompt');
  const canvasRef = useRef(null);

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
      setPermissionState('unsupported');
    }
  };

  useEffect(() => {
    if (!isOpen || permissionState !== 'granted') return;

    const handleOrientation = (e) => {
      let compassHeading = 0;
      if (e.webkitCompassHeading !== undefined) {
        compassHeading = e.webkitCompassHeading;
      } else if (e.alpha !== null) {
        compassHeading = 360 - e.alpha;
      }
      setHeading(Math.round(compassHeading));
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation, true);
  }, [isOpen, permissionState]);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const center = size / 2;
    const radius = center - 30;

    ctx.clearRect(0, 0, size, size);

    ctx.beginPath();
    ctx.arc(center, center, radius + 15, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(53, 82, 100, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(53, 82, 100, 0.4)';
    ctx.lineWidth = 3;
    ctx.stroke();

    for (let i = 0; i < 360; i += 5) {
      const radAngle = ((i - heading) * Math.PI) / 180 - Math.PI / 2;
      const isMajor = i % 30 === 0;
      const isCardinal = i % 90 === 0;
      const innerR = radius - (isCardinal ? 20 : isMajor ? 14 : 8);

      ctx.beginPath();
      ctx.moveTo(center + innerR * Math.cos(radAngle), center + innerR * Math.sin(radAngle));
      ctx.lineTo(center + radius * Math.cos(radAngle), center + radius * Math.sin(radAngle));
      ctx.strokeStyle = isCardinal ? '#355264' : isMajor ? 'rgba(53, 82, 100, 0.7)' : 'rgba(53, 82, 100, 0.3)';
      ctx.lineWidth = isCardinal ? 3 : isMajor ? 2 : 1;
      ctx.stroke();

      if (isMajor && !isCardinal) {
        const textR = radius - 30;
        ctx.font = '12px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = 'rgba(53, 82, 100, 0.7)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${i}°`, center + textR * Math.cos(radAngle), center + textR * Math.sin(radAngle));
      }
    }

    const cardinals = [
      { letter: 'N', deg: 0, color: '#dc2626' },
      { letter: 'E', deg: 90, color: '#355264' },
      { letter: 'S', deg: 180, color: '#355264' },
      { letter: 'W', deg: 270, color: '#355264' },
    ];
    cardinals.forEach(({ letter, deg, color }) => {
      const radAngle = ((deg - heading) * Math.PI) / 180 - Math.PI / 2;
      const textR = radius - 34;
      ctx.font = 'bold 20px "Bebas Neue", sans-serif';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(letter, center + textR * Math.cos(radAngle), center + textR * Math.sin(radAngle));
    });

    const northAngle = (-heading * Math.PI) / 180 - Math.PI / 2;
    const needleLen = radius - 50;

    ctx.beginPath();
    ctx.moveTo(center + needleLen * Math.cos(northAngle), center + needleLen * Math.sin(northAngle));
    ctx.lineTo(center + 12 * Math.cos(northAngle + Math.PI / 2), center + 12 * Math.sin(northAngle + Math.PI / 2));
    ctx.lineTo(center, center);
    ctx.lineTo(center + 12 * Math.cos(northAngle - Math.PI / 2), center + 12 * Math.sin(northAngle - Math.PI / 2));
    ctx.closePath();
    ctx.fillStyle = '#dc2626';
    ctx.fill();

    const southAngle = northAngle + Math.PI;
    ctx.beginPath();
    ctx.moveTo(center + (needleLen * 0.6) * Math.cos(southAngle), center + (needleLen * 0.6) * Math.sin(southAngle));
    ctx.lineTo(center + 10 * Math.cos(southAngle + Math.PI / 2), center + 10 * Math.sin(southAngle + Math.PI / 2));
    ctx.lineTo(center, center);
    ctx.lineTo(center + 10 * Math.cos(southAngle - Math.PI / 2), center + 10 * Math.sin(southAngle - Math.PI / 2));
    ctx.closePath();
    ctx.fillStyle = 'rgba(53, 82, 100, 0.4)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(center, center, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#355264';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(center, center, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#CCFF00';
    ctx.fill();

  }, [heading, isOpen]);

  if (!isOpen) return null;

  const getDirection = (deg) => {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return dirs[Math.round(deg / 45) % 8];
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-creamCanvas dark:bg-darkSlate border border-creamBorder rounded-3xl p-8 max-w-md w-full relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Close compass">
          <X size={20} className="text-darkSlate dark:text-creamBg" />
        </button>
        <h2 className="font-condensed font-extrabold text-3xl text-darkSlate dark:text-creamBg mb-1 text-center uppercase tracking-wide">Trail Compass</h2>
        <p className="font-sans text-xs text-darkSlate/60 dark:text-creamBg/60 mb-6 text-center">
          Real-time directional gyroscope sensor
        </p>

        <div className="flex flex-col items-center">
          {permissionState === 'prompt' && (
            <div className="text-center py-6">
              <CompassIcon size={48} className="text-darkSlate dark:text-neonLime mx-auto mb-4" />
              <p className="font-sans text-xs text-darkSlate/70 dark:text-creamBg/70 mb-6">
                Grant access to device sensors to calibrate compass.
              </p>
              <button onClick={requestPermission} className="bg-neonLime text-black px-8 py-3 rounded-full font-condensed font-extrabold text-lg uppercase tracking-wider hover:bg-[#b8e600] transition-colors shadow-md">
                Enable Compass
              </button>
            </div>
          )}

          {permissionState === 'denied' && (
            <div className="text-center py-6">
              <p className="font-sans text-xs text-darkSlate/70 dark:text-creamBg/70">
                Compass access was denied. Please check your browser orientation permissions.
              </p>
            </div>
          )}

          {permissionState === 'unsupported' && (
            <div className="text-center py-4">
              <canvas ref={canvasRef} width={300} height={300} className="mx-auto" />
              <p className="font-condensed font-extrabold text-4xl text-darkSlate dark:text-creamBg mt-4">{heading}° <span className="bg-neonLime text-black px-2 py-0.5 rounded text-lg">{getDirection(heading)}</span></p>
            </div>
          )}

          {permissionState === 'granted' && (
            <>
              <canvas ref={canvasRef} width={300} height={300} className="mx-auto" />
              <p className="font-condensed font-extrabold text-4xl text-darkSlate dark:text-creamBg mt-4">
                {heading}° <span className="bg-neonLime text-black px-2 py-0.5 rounded text-lg">{getDirection(heading)}</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compass;
