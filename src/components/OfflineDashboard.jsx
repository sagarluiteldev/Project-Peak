import React, { useState } from 'react';
import Compass from './Compass';
import { treks } from '../data/treks';
import { Map, Mountain, Compass as CompassIcon, WifiOff } from 'lucide-react';
import TrailMap from './TrailMap';

const OfflineDashboard = () => {
  const [activeTab, setActiveTab] = useState('compass');
  const [mapOpen, setMapOpen] = useState(false);
  const [mapTrek, setMapTrek] = useState('');

  return (
    <div className="min-h-screen bg-darkSlate text-white font-sans flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neonLime/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center z-10 bg-darkSlate/50 backdrop-blur-md">
        <div>
          <h1 className="font-condensed font-extrabold text-3xl tracking-wider uppercase text-creamBg">PROJECT PEAK</h1>
          <div className="flex items-center gap-2 text-red-400 text-xs mt-1 font-bold tracking-widest uppercase">
            <WifiOff size={14} /> Offline Mode Active
          </div>
        </div>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          <button
            onClick={() => setActiveTab('compass')}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${activeTab === 'compass' ? 'bg-neonLime text-black font-extrabold' : 'text-white/50 hover:text-white'}`}
          >
            <CompassIcon size={14} /> Compass
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${activeTab === 'routes' ? 'bg-neonLime text-black font-extrabold' : 'text-white/50 hover:text-white'}`}
          >
            <Map size={14} /> Routes
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col z-10 overflow-y-auto">
        {activeTab === 'compass' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="text-center mb-8 max-w-md">
              <h2 className="text-4xl font-condensed font-extrabold uppercase mb-2">Find Your Way</h2>
              <p className="text-white/60 text-xs font-medium">Use your device's built-in sensors to navigate offline.</p>
            </div>
            
            <div className="relative w-full max-w-[400px] aspect-square">
              <Compass isOpen={true} isInline={true} onClose={() => {}} />
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-12 max-w-7xl mx-auto w-full">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-condensed font-extrabold uppercase mb-2">Saved Routes</h2>
              <p className="text-white/60 max-w-2xl text-xs md:text-sm">Select a route below to view its offline GPS trail.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treks.map(trek => (
                <div key={trek.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
                     onClick={() => { setMapTrek(trek.name); setMapOpen(true); }}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-condensed font-extrabold text-2xl uppercase">{trek.name}</h3>
                    <span className="bg-neonLime text-black px-2.5 py-1 rounded text-[10px] uppercase font-extrabold tracking-wider">{trek.days} Days</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-white/60 mb-6 font-medium">
                    <span className="flex items-center gap-1"><Mountain size={14} className="text-neonLime" /> Altitude: {trek.altitude}</span>
                  </div>

                  <button className="w-full py-3 bg-neonLime hover:bg-[#b8e600] text-black rounded-full font-condensed font-extrabold text-base uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md">
                    <Map size={16} /> View Saved Map
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <TrailMap isOpen={mapOpen} onClose={() => setMapOpen(false)} trekName={mapTrek} />
    </div>
  );
};

export default OfflineDashboard;
