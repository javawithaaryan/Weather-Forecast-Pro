import { motion } from 'motion/react';
import type { HourlyForecast as HourlyForecastType } from '@/weather/types';
import { useState } from 'react';

interface HourlyForecastProps {
  forecast: HourlyForecastType[];
}

export function HourlyForecast({ forecast }: HourlyForecastProps) {
  const [activeTab, setActiveTab] = useState<'temperature' | 'precipitation'>(
    'temperature'
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="h-full"
    >
      <div className="glass-card rounded-[3rem] p-10 h-full shimmer-hover">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-bold text-white">Tactical Timeline</h3>

          <div className="flex gap-2 bg-black/50 p-1.5 rounded-2xl border border-white/10 glass-card">
            <button
              onClick={() => setActiveTab('temperature')}
              className={`px-6 py-2 text-[11px] font-bold rounded-xl uppercase tracking-widest transition-all ${
                activeTab === 'temperature'
                  ? 'bg-gradient-to-r from-neon-cyan/20 to-primary/20 border border-neon-cyan/40 text-white shadow-xl'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              Temperature
            </button>
            <button
              onClick={() => setActiveTab('precipitation')}
              className={`px-6 py-2 text-[11px] font-bold rounded-xl uppercase tracking-widest transition-all ${
                activeTab === 'precipitation'
                  ? 'bg-gradient-to-r from-neon-cyan/20 to-primary/20 border border-neon-cyan/40 text-white shadow-xl'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              Precipitation
            </button>
          </div>
        </div>

        {/* Hourly Cards */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-4">
          {forecast.map((hour, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`flex flex-col items-center justify-between min-w-[110px] py-8 px-6 rounded-[2.5rem] relative group shadow-2xl ${
                index === 0
                  ? 'glass-card border-neon-cyan/50 bg-neon-cyan/10'
                  : 'glass-card bg-black/40 border-white/5 hover:border-white/20'
              }`}
            >
              {index === 0 && (
                <div
                  className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-neon-cyan to-primary"
                  style={{
                    boxShadow: '0 0 15px #00f2ff',
                  }}
                />
              )}

              <span
                className={`text-sm font-bold tracking-widest uppercase ${
                  index === 0 ? 'text-neon-cyan' : 'text-white/40'
                }`}
              >
                {hour.time}
              </span>

              <div className="my-6">
                <WeatherIcon icon={hour.icon} isFirst={index === 0} />
              </div>

              <span className="text-3xl font-bold text-white">{hour.temp}°</span>
            </motion.div>
          ))}
        </div>

        {/* Sparkline Chart */}
        <div className="mt-8 h-24 w-full relative group">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 Q10,40 20,45 T40,30 T60,60 T80,20 T100,40"
              fill="none"
              stroke="url(#line-grad)"
              strokeWidth="4"
              style={{ filter: 'drop-shadow(0 0 12px rgba(0,242,255,0.8))' }}
            />
            <path
              d="M0,50 Q10,40 20,45 T40,30 T60,60 T80,20 T100,40 V100 H0 Z"
              fill="url(#area-grad)"
              opacity="0.4"
            />
            <defs>
              <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00f2ff" />
                <stop offset="100%" stopColor="#7c4dff" />
              </linearGradient>
              <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f2ff" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </motion.section>
  );
}

function WeatherIcon({
  icon,
  isFirst,
}: {
  icon: string;
  isFirst: boolean;
}) {
  const iconClass = `text-5xl ${
    isFirst
      ? 'text-sun-amber'
      : icon.includes('rain')
      ? 'text-rain-blue'
      : icon.includes('cloud')
      ? 'text-white/60'
      : 'text-accent'
  }`;

  return (
    <div className={iconClass} style={isFirst ? {
      filter: 'drop-shadow(0 0 15px rgba(255,184,0,0.6))'
    } : {}}>
      {getIconSvg(icon)}
    </div>
  );
}

function getIconSvg(icon: string) {
  return (
    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
    </svg>
  );
}
