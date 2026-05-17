import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart, Shield, Activity, Sparkles } from 'lucide-react';
import type { AirQuality, CurrentWeather } from '@/weather/types';
import {
  computeWellnessScore,
  generateHealthInsights,
} from '@/services/healthIntelligence';

interface HealthIntelligenceProps {
  weather: CurrentWeather;
  airQuality: AirQuality;
}

const severityStyles = {
  good: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  moderate: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
  warning: 'border-orange-500/30 bg-orange-500/10 text-orange-200',
  critical: 'border-red-500/40 bg-red-500/10 text-red-300',
};

export function HealthIntelligence({ weather, airQuality }: HealthIntelligenceProps) {
  const wellness = useMemo(
    () => computeWellnessScore(weather, airQuality),
    [weather, airQuality],
  );
  const insights = useMemo(
    () => generateHealthInsights(weather, airQuality),
    [weather, airQuality],
  );

  return (
    <motion.section
      id="health"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="glass-card rounded-[3rem] p-10 border-neon-cyan/15"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
        <div>
          <p className="text-neon-cyan text-xs font-bold tracking-[0.35em] uppercase mb-2">
            Health & Weather Intelligence
          </p>
          <h2 className="text-3xl font-bold text-white text-glow">
            Environmental Wellness Dashboard
          </h2>
        </div>
        <div className="flex items-center gap-6 glass-card bg-black/30 rounded-2xl px-8 py-5 border-white/10">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#00f2ff"
                strokeWidth="3"
                strokeDasharray={`${wellness.score} 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
              {wellness.score}
            </span>
          </div>
          <div>
            <p className="text-sm text-white/50 uppercase tracking-widest">Wellness Score</p>
            <p className="text-2xl font-bold text-neon-cyan">{wellness.label}</p>
            <p className="text-sm text-white/70 mt-1 max-w-xs">{wellness.summary}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-2xl border p-5 ${severityStyles[insight.severity]}`}
          >
            <div className="flex items-center gap-2 mb-3">
              {insight.category === 'Activity' && <Activity className="w-4 h-4" />}
              {insight.category === 'Respiratory' && <Shield className="w-4 h-4" />}
              {insight.category === 'Skin' && <Sparkles className="w-4 h-4" />}
              {!['Activity', 'Respiratory', 'Skin'].includes(insight.category) && (
                <Heart className="w-4 h-4" />
              )}
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                {insight.category}
              </span>
            </div>
            <h4 className="font-bold text-white mb-2">{insight.title}</h4>
            <p className="text-sm leading-relaxed opacity-90">{insight.message}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
