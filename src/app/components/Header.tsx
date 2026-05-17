import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { useWeather } from '@/context/WeatherContext';

export function Header() {
  const { useGeolocation, bundle } = useWeather();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-5 backdrop-blur-xl border-b border-white/5"
    >
      <div className="flex items-center gap-4">
        <motion.div
          className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-neon-cyan flex items-center justify-center"
          style={{ boxShadow: '0 0 25px rgba(0,242,255,0.4)' }}
          animate={{
            boxShadow: [
              '0 0 25px rgba(0,242,255,0.4)',
              '0 0 35px rgba(0,242,255,0.6)',
              '0 0 25px rgba(0,242,255,0.4)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
        </motion.div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white text-glow">
            Weather Forecast Pro
          </h1>
          {bundle && (
            <p className="text-[10px] text-white/40 tracking-widest uppercase">
              {bundle.current.city}, {bundle.current.country}
            </p>
          )}
        </div>
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={useGeolocation}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card bg-white/5 border border-white/10 hover:border-neon-cyan/50 text-sm text-white"
      >
        <MapPin className="w-4 h-4 text-neon-cyan" />
        <span className="hidden sm:inline">Location</span>
      </motion.button>
    </motion.header>
  );
}
