import { motion } from 'motion/react';
import type { DailyForecast } from '@/weather/types';

interface SevenDayForecastProps {
  forecast: DailyForecast[];
}

export function SevenDayForecast({ forecast }: SevenDayForecastProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="h-full"
    >
      <div className="glass-card rounded-[3.5rem] p-10 h-full shimmer-hover">
        <h3 className="text-2xl font-bold text-white mb-10">Orbital Projection</h3>

        <div className="flex flex-col gap-3">
          {forecast.map((day, index) => {
            const tempRange = day.tempHigh - day.tempLow;
            const minTemp = 0;
            const maxTemp = 40;
            const leftPercent = ((day.tempLow - minTemp) / (maxTemp - minTemp)) * 100;
            const widthPercent = (tempRange / (maxTemp - minTemp)) * 100;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                className={`flex items-center justify-between py-5 px-6 rounded-[2rem] cursor-pointer group transition-all ${
                  index < forecast.length - 1 ? 'border-b border-white/10' : ''
                }`}
              >
                <span
                  className={`font-bold w-24 text-lg group-hover:text-neon-cyan transition-colors ${
                    index === 0 ? 'text-white' : 'text-white/80'
                  }`}
                >
                  {day.day}
                </span>

                <div className={`text-3xl ${getWeatherIconColor(day.icon)}`}>
                  {getWeatherIconElement(day.icon)}
                </div>

                <div className="flex items-center flex-1 justify-end gap-6">
                  <span className="text-base text-white/40 font-medium">
                    {day.tempLow}°
                  </span>

                  <div className="w-40 h-3 bg-black/60 rounded-full relative overflow-hidden border border-white/10">
                    <motion.div
                      className="absolute h-full bg-gradient-to-r from-neon-cyan via-primary to-sun-amber rounded-full shadow-lg"
                      initial={{ width: 0 }}
                      animate={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                      }}
                      transition={{ duration: 1, delay: 0.2 + 0.1 * index }}
                    />
                  </div>

                  <span className="text-xl font-bold text-white">
                    {day.tempHigh}°
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function getWeatherIconColor(icon: string): string {
  if (icon.includes('sunny')) return 'text-sun-amber';
  if (icon.includes('rain')) return 'text-rain-blue';
  if (icon.includes('cloud')) return 'text-white/40';
  return 'text-white/60';
}

function getWeatherIconElement(icon: string) {
  const style = icon.includes('sunny') ? {
    filter: 'drop-shadow(0 0 10px rgba(255,184,0,0.5))'
  } : icon.includes('rain') ? {
    filter: 'drop-shadow(0 0 10px rgba(0,184,240,0.4))'
  } : {};

  return (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" style={style}>
      <circle cx="12" cy="12" r="5" />
    </svg>
  );
}
