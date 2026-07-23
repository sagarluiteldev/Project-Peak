import React from 'react';

const ElevationProfile = ({ itinerary }) => {
  if (!itinerary || itinerary.length === 0) return null;

  const getAltNumber = (altStr) => {
    if (!altStr) return 0;
    const num = altStr.replace(/[^0-9]/g, '');
    return parseInt(num, 10) || 0;
  };

  const data = itinerary.map(day => ({
    day: day.day,
    name: day.place,
    alt: getAltNumber(day.alt),
    originalAlt: day.alt
  }));

  const svgWidth = 800;
  const svgHeight = 250;
  const paddingX = 40;
  const paddingY = 40;

  const minAlt = Math.max(0, Math.min(...data.map(d => d.alt)) - 500);
  const maxAlt = Math.max(...data.map(d => d.alt)) + 300;

  const scaleX = (svgWidth - paddingX * 2) / Math.max(1, (data.length - 1));
  const scaleY = (svgHeight - paddingY * 2) / (maxAlt - minAlt);

  const pathD = data.map((d, i) => {
    const x = paddingX + (i * scaleX);
    const y = svgHeight - paddingY - ((d.alt - minAlt) * scaleY);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const areaD = `${pathD} L ${paddingX + ((data.length - 1) * scaleX)} ${svgHeight - paddingY} L ${paddingX} ${svgHeight - paddingY} Z`;

  return (
    <div className="w-full mt-6 mb-6 relative group">
      <div className="flex justify-between items-center mb-2 px-1 md:hidden">
        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-darkSlate/50 dark:text-creamBg/50">Elevation Profile</span>
        <span className="text-[10px] font-sans font-extrabold text-neonLime italic">Swipe →</span>
      </div>
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="min-w-[650px] md:min-w-full bg-creamCard dark:bg-black/30 border border-creamBorder/70 rounded-2xl p-4">
          <h4 className="hidden md:block font-condensed font-extrabold text-xl uppercase text-darkSlate dark:text-creamBg mb-4 text-center">ELEVATION PROFILE & ROUTE GAIN</h4>
        
        <svg id="elevation-profile-svg" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto drop-shadow-sm overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#CCFF00" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#CCFF00" />
              <stop offset="50%" stopColor="#355264" />
              <stop offset="100%" stopColor="#CCFF00" />
            </linearGradient>
          </defs>

          <path d={areaD} fill="url(#areaGradient)" />
          <path d={pathD} fill="none" stroke="url(#lineGradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

          {data.map((d, i) => {
            const x = paddingX + (i * scaleX);
            const y = svgHeight - paddingY - ((d.alt - minAlt) * scaleY);
            
            return (
              <g key={i} className="hover:opacity-100 transition-opacity cursor-pointer group/point">
                <line x1={x} y1={y} x2={x} y2={svgHeight - paddingY} stroke="#355264" strokeWidth="1" strokeDasharray="4 4" className="opacity-40" />
                <circle cx={x} cy={y} r="15" fill="transparent" />
                <circle cx={x} cy={y} r="5" fill="#CCFF00" className="opacity-0 group-hover/point:opacity-40" />
                <circle cx={x} cy={y} r="4" fill="#CCFF00" stroke="#1C2933" strokeWidth="2" />
                
                <g className="opacity-0 group-hover/point:opacity-100 transition-opacity pointer-events-none">
                  <rect x={x - 65} y={y - 55} width="130" height="40" rx="6" fill="#1C2933" />
                  <polygon points={`${x - 5},${y - 15} ${x + 5},${y - 15} ${x},${y - 8}`} fill="#1C2933" />
                  <text x={x} y={y - 38} textAnchor="middle" fill="#CCFF00" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                    {d.name.length > 18 ? d.name.substring(0, 18) + '...' : d.name}
                  </text>
                  <text x={x} y={y - 23} textAnchor="middle" fill="#F4F0E8" fontSize="10" fontFamily="sans-serif">
                    Day {d.day} • {d.originalAlt}
                  </text>
                </g>

                {(i === 0 || i === data.length - 1 || i % 2 !== 0) && (
                   <text x={x} y={svgHeight - paddingY + 20} textAnchor="middle" fill="currentColor" className="text-darkSlate/60 dark:text-creamBg/60 font-sans text-[10px] font-bold" opacity="0.8">
                     D{d.day}
                   </text>
                )}
              </g>
            );
          })}
        </svg>
        </div>
      </div>
    </div>
  );
};

export default ElevationProfile;
