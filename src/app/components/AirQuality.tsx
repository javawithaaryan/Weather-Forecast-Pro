import { motion } from 'motion/react';
import { Info } from 'lucide-react';
import type { AirQuality as AirQualityType } from '@/weather/types';

interface AirQualityProps {
  airQuality: AirQualityType;
}

export function AirQuality({ airQuality }: AirQualityProps) {
  const percentage = airQuality.aqi ? (airQuality.aqi / 5) * 100 : 0;
  const circumference = 2 * Math.PI * 44;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="h-full"
    >
      <div className="glass-card rounded-[3rem] p-10 h-full flex flex-col items-center shimmer-hover group">
        <div className="w-full flex justify-between items-center mb-10">
          <h3 className="text-2xl font-bold text-white">Atmospheric Health</h3>
          <Info className="w-6 h-6 text-neon-cyan" />
        </div>

        {/* Circular Progress */}
        <motion.div
          className="relative w-56 h-56 flex items-center justify-center"
          animate={{ scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="url(#aqi-gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
              style={{
                filter: 'drop-shadow(0 0 20px rgba(0,242,255,0.8))',
              }}
            />
            <defs>
              <linearGradient id="aqi-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cdbdff" />
                <stop offset="100%" stopColor="#00f2ff" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute flex flex-col items-center">
            <motion.span
              className="text-6xl font-bold text-white tracking-tighter text-glow"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
            >
              {airQuality.aqi}
            </motion.span>
            <span className="text-sm font-bold text-neon-cyan tracking-[0.3em] uppercase mt-2">
              {airQuality.level}
            </span>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-12 w-full grid grid-cols-2 gap-6">
          <motion.div
            className="glass-card bg-black/30 p-5 rounded-2xl text-center border-white/5"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-[11px] text-neon-cyan/70 uppercase font-bold mb-1 tracking-widest">
              PM2.5
            </p>
            <p className="text-xl font-bold text-white">
              {airQuality.pm25}{' '}
              <span className="text-xs font-normal text-white/50">μg/m³</span>
            </p>
          </motion.div>

          <motion.div
            className="glass-card bg-black/30 p-5 rounded-2xl text-center border-white/5"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-[11px] text-sun-amber/70 uppercase font-bold mb-1 tracking-widest">
              O3
            </p>
            <p className="text-xl font-bold text-white">
              {airQuality.o3}{' '}
              <span className="text-xs font-normal text-white/50">ppb</span>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
