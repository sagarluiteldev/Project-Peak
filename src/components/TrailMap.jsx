import React, { useEffect, useRef } from 'react';
import { X, MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { trekRoutes } from '../data/routes';

const TrailMap = ({ isOpen, onClose, trekName }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !mapRef.current || !trekName) return;

    const route = trekRoutes[trekName];
    if (!route) return;

    // Destroy previous map instance if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create map
    const map = L.map(mapRef.current, {
      center: route.center,
      zoom: route.zoom,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    // Custom icon
    const markerIcon = L.divIcon({
      html: `<div style="width:12px;height:12px;background:#166534;border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
      className: 'custom-marker',
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    // Start icon
    const startIcon = L.divIcon({
      html: `<div style="width:16px;height:16px;background:#166534;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
      className: 'custom-marker',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    // End icon
    const endIcon = L.divIcon({
      html: `<div style="width:18px;height:18px;background:#dc2626;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
      className: 'custom-marker',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    // Add markers
    route.waypoints.forEach((wp, i) => {
      const icon = i === 0 ? startIcon : i === route.waypoints.length - 1 ? endIcon : markerIcon;
      L.marker([wp[0], wp[1]], { icon })
        .addTo(map)
        .bindPopup(`<strong style="font-family:'Syne',sans-serif">${wp[2]}</strong>`);
    });

    // Draw trail line
    const latlngs = route.waypoints.map(wp => [wp[0], wp[1]]);
    L.polyline(latlngs, {
      color: '#166534',
      weight: 3,
      opacity: 0.8,
      dashArray: '10, 6',
    }).addTo(map);

    // Fit bounds
    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [40, 40] });

    // Invalidate size after render
    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, trekName]);

  if (!isOpen) return null;

  const route = trekRoutes[trekName];
  const crowdColors = { green: '#16a34a', yellow: '#eab308', red: '#dc2626' };
  const crowdLabels = { green: 'Low Traffic', yellow: 'Moderate Traffic', red: 'High Traffic' };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-peakDark border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] relative flex flex-col" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/10">
          <div>
            <h2 className="font-display font-bold text-xl text-peakDeep dark:text-peakWhite">{trekName}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-sans text-xs text-peakDeep/50 dark:text-peakWhite/50">
                {route?.waypoints.length} waypoints
              </span>
              {route && (
                <span className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider" style={{ color: crowdColors[route.crowd] }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: crowdColors[route.crowd] }}></span>
                  {crowdLabels[route.crowd]}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Close map">
            <X size={20} className="text-peakDeep dark:text-peakWhite" />
          </button>
        </div>

        {/* Map */}
        <div ref={mapRef} className="flex-1 min-h-[400px] md:min-h-[500px]" />

        {/* Waypoint list */}
        <div className="px-6 py-4 border-t border-black/5 dark:border-white/10 max-h-48 overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            {route?.waypoints.map((wp, i) => (
              <span key={i} className="flex items-center gap-1 px-3 py-1 rounded-full bg-creamCard dark:bg-black/20 font-sans text-xs text-darkSlate dark:text-creamBg border border-creamBorder/50">
                <MapPin size={10} className="text-slateTeal dark:text-neonLime" />
                {wp[2]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailMap;
