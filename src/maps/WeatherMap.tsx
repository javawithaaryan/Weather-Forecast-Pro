import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'motion/react';
import L from 'leaflet';
import { Plus, Minus, Layers } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import type { Coordinates } from '@/weather/types';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface WeatherMapProps {
  coord: Coordinates;
  city: string;
  description: string;
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

interface MapControlsProps {
  onToggleLayer: () => void;
}

function MapControls({ onToggleLayer }: MapControlsProps) {
  const map = useMap();
  return (
    <div className="leaflet-bottom leaflet-right !m-0 !p-0">
      <div className="flex flex-col gap-3 m-10">
        <button
          type="button"
          onClick={() => map.zoomIn()}
          className="w-12 h-12 rounded-xl glass-card bg-black/90 border border-white/20 flex items-center justify-center text-white hover:text-neon-cyan"
          aria-label="Zoom in"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => map.zoomOut()}
          className="w-12 h-12 rounded-xl glass-card bg-black/90 border border-white/20 flex items-center justify-center text-white hover:text-neon-cyan"
          aria-label="Zoom out"
        >
          <Minus className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={onToggleLayer}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan to-primary text-background flex items-center justify-center"
          aria-label="Toggle map layer"
        >
          <Layers className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export function WeatherMap({ coord, city, description }: WeatherMapProps) {
  const [layer, setLayer] = useState<'standard' | 'dark'>('dark');
  const center: [number, number] = [coord.lat, coord.lon];

  const tileUrl =
    layer === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="h-full"
      id="weather-map"
    >
      <div className="glass-card border-neon-cyan/20 rounded-[3.5rem] p-4 h-full relative overflow-hidden min-h-[480px]">
        <div className="absolute top-10 left-10 z-[1000] flex flex-col gap-3 pointer-events-none">
          <h3 className="text-3xl font-bold text-white text-glow tracking-tighter">
            Weather Intelligence Map
          </h3>
          <div className="flex items-center gap-3 px-4 py-1.5 bg-black/80 backdrop-blur-xl rounded-xl border border-neon-cyan/40 w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-[11px] text-neon-cyan font-bold tracking-[0.3em] uppercase">
              Live Radar Active
            </span>
          </div>
        </div>

        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent z-[500] pointer-events-none"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        <MapContainer
          center={center}
          zoom={10}
          className="w-full h-full min-h-[460px] rounded-[3rem] z-0"
          zoomControl={false}
        >
          <TileLayer attribution="© OpenStreetMap" url={tileUrl} />
          <Marker position={center}>
            <Popup>
              <strong>{city}</strong>
              <br />
              {description}
            </Popup>
          </Marker>
          <MapController center={center} />
          <MapControls onToggleLayer={() => setLayer((l) => (l === 'dark' ? 'standard' : 'dark'))} />
        </MapContainer>

        <div className="absolute bottom-10 left-10 z-[1000] font-mono text-[10px] text-neon-cyan/70 tracking-widest uppercase bg-black/50 p-3 rounded-xl backdrop-blur-md pointer-events-none">
          LAT: {coord.lat.toFixed(4)}° · LON: {coord.lon.toFixed(4)}°
        </div>
      </div>
    </motion.section>
  );
}
