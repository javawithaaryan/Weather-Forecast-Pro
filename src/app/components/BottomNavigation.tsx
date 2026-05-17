import { motion } from 'motion/react';
import { Cloud, Map, Heart, Sparkles } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { id: 'hero', icon: Cloud, label: 'Weather' },
  { id: 'weather-map', icon: Map, label: 'Map' },
  { id: 'health', icon: Heart, label: 'Health' },
  { id: 'weather-x-ai', icon: Sparkles, label: 'AI' },
] as const;

export function BottomNavigation() {
  const [active, setActive] = useState<string>('hero');

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-6 pt-3 bg-background/60 backdrop-blur-3xl border-t border-white/10">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => scrollTo(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-neon-cyan' : 'text-white/40 hover:text-white/70'
            }`}
            whileTap={{ scale: 0.92 }}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[9px] font-bold tracking-widest uppercase">{item.label}</span>
          </motion.button>
        );
      })}
    </nav>
  );
}
