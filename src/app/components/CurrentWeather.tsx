import { motion } from 'motion/react';
import { Wind, Droplets } from 'lucide-react';
import type { CurrentWeather as CurrentWeatherType } from '@/weather/types';

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  const WeatherIcon = getWeatherIconComponent(weather.icon);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full"
    >
      <div className="glass-card rounded-[3.5rem] p-12 h-full flex flex-col justify-between group relative shimmer-hover">
        {/* Large Weather Icon */}
        <div className="absolute top-12 right-12 opacity-80 group-hover:opacity-100 transition-all duration-1000 transform group-hover:scale-110 group-hover:rotate-6">
          <WeatherIcon className="w-60 h-60 text-accent/40" style={{
            filter: 'drop-shadow(0 0 60px rgba(255,182,136,0.5))'
          }} />
        </div>

        {/* Location and Status */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              className="px-5 py-2 bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan text-xs font-bold tracking-[0.3em] rounded-full uppercase flex items-center gap-3"
              animate={{
                borderColor: ['rgba(0,242,255,0.4)', 'rgba(0,242,255,0.8)', 'rgba(0,242,255,0.4)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-neon-cyan"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Live Sat-Com Feed
            </motion.div>
          </div>

          <motion.h2
            className="text-8xl font-bold text-white mb-6 text-glow tracking-tighter"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {weather.city}
          </motion.h2>
          <p className="text-3xl text-muted-foreground font-light opacity-90">
            {weather.description} • Low humidity levels • UV {weather.uvIndex}
          </p>
        </div>

        {/* Temperature Display */}
        <div className="flex items-end justify-between relative z-10 mt-12">
          <div className="flex items-baseline gap-6">
            <motion.span
              className="text-[180px] font-bold leading-none tracking-tighter temp-glow"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, type: 'spring' }}
            >
              {weather.temp}°
            </motion.span>
            <div className="flex flex-col gap-4 pb-8">
              <span className="text-neon-cyan text-4xl font-bold text-glow">C</span>
              <div className="w-12 h-[3px] bg-white/20" />
              <span className="text-white/30 text-4xl font-medium">F</span>
            </div>
          </div>

          {/* Weather Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              className="glass-card bg-black/30 border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center min-w-[180px] hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Wind className="w-10 h-10 text-neon-cyan mb-3" />
              </motion.div>
              <span className="text-xs text-neon-cyan/70 tracking-widest uppercase font-bold mb-1">
                Wind Speed
              </span>
              <span className="text-3xl font-bold text-white">
                {weather.windSpeed}{' '}
                <span className="text-lg text-white/50 font-normal">mph</span>
              </span>
            </motion.div>

            <motion.div
              className="glass-card bg-black/30 border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center min-w-[180px] hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                <Droplets className="w-10 h-10 text-sun-amber mb-3" />
              </motion.div>
              <span className="text-xs text-sun-amber/70 tracking-widest uppercase font-bold mb-1">
                Moisture
              </span>
              <span className="text-3xl font-bold text-white">
                {weather.humidity}
                <span className="text-lg text-white/50 font-normal">%</span>
              </span>
            </motion.div>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className="shimmer-hover absolute inset-0 pointer-events-none" />
      </div>
    </motion.section>
  );
}

function getWeatherIconComponent(icon: string) {
  return ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
    return (
      <div className={className} style={style}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          {icon === 'wb_sunny' && (
            <>
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
          {icon !== 'wb_sunny' && <circle cx="12" cy="12" r="10" />}
        </svg>
      </div>
    );
  };
}
