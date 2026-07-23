import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Thermometer, Wind, CloudRain, Sun, Cloud, Snowflake, Loader2, Gauge, ShieldAlert } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { name: 'Kathmandu', altitude: '1,400m', lat: 27.7172, lon: 85.3240, freezeAlt: '4,200m', uv: 'High (7)' },
  { name: 'Lukla', altitude: '2,860m', lat: 27.6861, lon: 86.7300, freezeAlt: '3,800m', uv: 'Extreme (9)' },
  { name: 'Namche Bazaar', altitude: '3,440m', lat: 27.8069, lon: 86.7140, freezeAlt: '3,500m', uv: 'Extreme (10)' },
  { name: 'EBC', altitude: '5,364m', lat: 27.9861, lon: 86.9226, freezeAlt: '2,900m', uv: 'Extreme (11+)' },
  { name: 'Pokhara', altitude: '827m', lat: 28.2096, lon: 83.9856, freezeAlt: '4,800m', uv: 'Moderate (5)' },
  { name: 'Thorong La', altitude: '5,416m', lat: 28.7936, lon: 83.9366, freezeAlt: '2,800m', uv: 'Extreme (11+)' },
];

const conditionIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rain: CloudRain,
  snow: Snowflake,
};

const mapWeatherCode = (code) => {
  if (code === 0) return 'sunny';
  if ([1, 2, 3, 45, 48].includes(code)) return 'cloudy';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  return 'sunny';
};

const WeatherWidget = () => {
  const [selected, setSelected] = useState(0);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const promises = locations.map(async (loc, index) => {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);
          if (!res.ok) throw new Error('API Error');
          const data = await res.json();
          return {
            index,
            temp: Math.round(data.current.temperature_2m),
            humidity: data.current.relative_humidity_2m,
            wind: Math.round(data.current.wind_speed_10m),
            condition: mapWeatherCode(data.current.weather_code)
          };
        });
        const results = await Promise.all(promises);
        
        if (isMounted) {
          const newData = {};
          results.forEach(res => {
            newData[res.index] = res;
          });
          setWeatherData(newData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch weather data", error);
        if (isMounted) setLoading(false);
      }
    };

    fetchWeather();
    return () => { isMounted = false; };
  }, []);

  const loc = locations[selected];
  const currentData = weatherData[selected];
  
  const temp = currentData ? currentData.temp : 0;
  const wind = currentData ? currentData.wind : 0;
  const humidity = currentData ? currentData.humidity : 0;
  const conditionStr = currentData ? currentData.condition : 'cloudy';
  
  const Icon = loading ? Loader2 : (conditionIcons[conditionStr] || Sun);

  // Meter calculations
  const windPercent = Math.min(100, Math.max(10, (wind / 60) * 100));
  const humidityPercent = Math.min(100, Math.max(10, humidity));

  return (
    <section id="weather-widget" ref={sectionRef} className="py-6 md:py-10 px-4 sm:px-6 md:px-12 w-full">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-8">
          <span className="bg-neonLime text-black px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest inline-block mb-2 shadow-sm">
            REAL-TIME TRAIL FORECAST
          </span>
          <h3 className="font-condensed font-extrabold text-4xl sm:text-5xl uppercase text-darkSlate dark:text-creamBg tracking-wide">
            LIVE TRAIL WEATHER CONDITIONS
          </h3>
        </div>
        
        {/* Location tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {locations.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`px-4 py-2 rounded-full font-sans text-xs font-extrabold uppercase tracking-wider transition-all ${
                i === selected 
                  ? 'bg-neonLime text-black shadow-md scale-105' 
                  : 'bg-creamCard dark:bg-black/20 text-darkSlate dark:text-creamBg hover:bg-black/10'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Weather card with Barometric Meter Gauges & Hover Height Extension */}
        <div
          ref={cardRef}
          className="bg-white dark:bg-darkSlate/80 border border-creamBorder/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col gap-6 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group cursor-pointer"
        >
          
          {loading && (
            <div className="absolute inset-0 bg-white/60 dark:bg-darkSlate/60 backdrop-blur-sm z-20 flex items-center justify-center">
              <Loader2 className="animate-spin text-darkSlate dark:text-neonLime" size={40} />
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left flex-1">
              <span className="font-sans text-xs font-bold text-darkSlate/50 dark:text-creamBg/50 uppercase tracking-widest block mb-1">
                Altitude: {loc.altitude}
              </span>
              <h4 className="font-condensed font-extrabold text-4xl text-darkSlate dark:text-creamBg uppercase mb-1">{loc.name}</h4>
              <p className="font-condensed font-extrabold text-6xl text-darkSlate dark:text-creamBg">{temp}°C</p>
            </div>
            
            <div className="flex justify-center flex-1">
              <Icon size={64} className={`text-darkSlate dark:text-neonLime transition-transform duration-500 group-hover:scale-110 ${loading ? 'animate-spin opacity-50' : ''}`} strokeWidth={1.5} />
            </div>

            {/* Barometric Meters */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-center flex-1 w-full">
              <div>
                <Wind size={20} className="text-slateTeal dark:text-neonLime mx-auto mb-1" />
                <p className="font-sans text-[11px] font-bold text-darkSlate/50 dark:text-creamBg/50 uppercase tracking-wider">Wind Speed</p>
                <p className="font-sans font-extrabold text-base text-darkSlate dark:text-creamBg mb-1.5">{wind} km/h</p>
                
                {/* Wind Barometer Meter Fill */}
                <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slateTeal dark:bg-neonLime rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${windPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <Thermometer size={20} className="text-slateTeal dark:text-neonLime mx-auto mb-1" />
                <p className="font-sans text-[11px] font-bold text-darkSlate/50 dark:text-creamBg/50 uppercase tracking-wider">Humidity</p>
                <p className="font-sans font-extrabold text-base text-darkSlate dark:text-creamBg mb-1.5">{humidity}%</p>
                
                {/* Humidity Meter Fill */}
                <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slateTeal dark:bg-neonLime rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${humidityPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hover Height Extension - Extra Barometric Trail Metrics */}
          <div className="max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 border-t border-creamBorder/50 dark:border-white/10 pt-4">
            <div className="grid grid-cols-3 gap-4 text-center text-xs">
              <div className="bg-creamCanvas dark:bg-black/20 p-3 rounded-2xl">
                <Gauge size={16} className="text-slateTeal dark:text-neonLime mx-auto mb-1" />
                <span className="font-sans text-[10px] uppercase font-semibold opacity-60 block">Freezing Level</span>
                <span className="font-sans font-bold text-darkSlate dark:text-creamBg">{loc.freezeAlt}</span>
              </div>
              <div className="bg-creamCanvas dark:bg-black/20 p-3 rounded-2xl">
                <Sun size={16} className="text-slateTeal dark:text-neonLime mx-auto mb-1" />
                <span className="font-sans text-[10px] uppercase font-semibold opacity-60 block">UV Index</span>
                <span className="font-sans font-bold text-darkSlate dark:text-creamBg">{loc.uv}</span>
              </div>
              <div className="bg-creamCanvas dark:bg-black/20 p-3 rounded-2xl">
                <ShieldAlert size={16} className="text-slateTeal dark:text-neonLime mx-auto mb-1" />
                <span className="font-sans text-[10px] uppercase font-semibold opacity-60 block">Trail Advisory</span>
                <span className="font-sans font-bold text-darkSlate dark:text-creamBg">Clear Passage</span>
              </div>
            </div>
          </div>

        </div>

        <p className="text-center mt-4 font-sans text-xs text-darkSlate/50 dark:text-creamBg/50">
          Powered by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">Open-Meteo API</a>.
        </p>
      </div>
    </section>
  );
};

export default WeatherWidget;
