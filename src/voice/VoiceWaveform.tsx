import { motion } from 'motion/react';

interface VoiceWaveformProps {
  level: number;
  active: boolean;
}

export function VoiceWaveform({ level, active }: VoiceWaveformProps) {
  const bars = 12;

  return (
    <div className="flex items-end justify-center gap-1 h-12" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => {
        const height = active ? 8 + level * 28 * (0.5 + Math.sin(i * 0.8) * 0.5) : 4;
        return (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-neon-cyan to-primary"
            animate={{ height }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}
