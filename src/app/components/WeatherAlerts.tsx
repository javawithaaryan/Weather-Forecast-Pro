import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';
import type { WeatherAlert } from '@/weather/types';

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
  pressure: number;
  uvIndex: number;
}

export function WeatherAlerts({ alerts, pressure, uvIndex }: WeatherAlertsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex flex-col gap-8 h-full"
    >
      {/* Alert Card */}
      <div className="glass-card rounded-[3rem] p-8 border-red-500/30 bg-red-950/10 flex-1 relative overflow-hidden group shadow-[inset_0_0_40px_rgba(255,0,0,0.05)]">
        <div
          className="absolute top-0 left-0 w-full h-1.5 bg-red-500"
          style={{ boxShadow: '0 0 20px #ff0000' }}
        />

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-500/20 rounded-xl">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertTriangle
                className="w-6 h-6 text-red-500"
                style={{ filter: 'drop-shadow(0 0 15px rgba(255,0,0,0.8))' }}
              />
            </motion.div>
          </div>
          <h3 className="text-xl font-bold text-white tracking-wide">
            SYSTEM ALERT
          </h3>
        </div>

        {alerts.length === 0 ? (
          <p className="text-base text-white/50 font-medium leading-relaxed">
            No active weather alerts for your location.
          </p>
        ) : (
          <ul className="space-y-3">
            {alerts.map((alert) => (
              <li key={alert.type} className="text-sm text-red-100/90 leading-relaxed">
                <strong className="text-red-300">{alert.type}:</strong> {alert.message}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sensor Mesh Card */}
      <div className="glass-card rounded-[3rem] p-8 flex flex-col justify-between flex-1 group shimmer-hover">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-white/50 tracking-[0.3em] uppercase">
            Sensor Mesh
          </h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[10px] text-neon-cyan font-bold tracking-widest">
              ACTIVE
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-auto">
          <motion.div
            className="p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-neon-cyan/40 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-[10px] text-neon-cyan/60 block font-bold tracking-widest uppercase mb-1">
              Pressure
            </span>
            <span className="text-xl font-bold text-white">
              {pressure}{' '}
              <span className="text-sm font-normal opacity-40">hPa</span>
            </span>
          </motion.div>

          <motion.div
            className="p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-neon-cyan/40 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-[10px] text-sun-amber/60 block font-bold tracking-widest uppercase mb-1">
              UV Index
            </span>
            <span className="text-xl font-bold text-white">
              {uvIndex}{' '}
              <span className="text-sm font-normal opacity-40">L</span>
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
