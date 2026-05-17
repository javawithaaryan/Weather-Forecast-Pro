import { motion } from 'motion/react';
import { Plus, Minus, Layers } from 'lucide-react';

export function TacticalRadar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="h-full"
    >
      <div className="glass-card border-neon-cyan/20 rounded-[3.5rem] p-4 h-full relative overflow-hidden min-h-[500px] group">
        {/* Header */}
        <div className="absolute top-12 left-12 z-30 flex flex-col gap-4">
          <h3 className="text-4xl font-bold text-white text-glow tracking-tighter">
            Tactical Radar X
          </h3>
          <div className="flex items-center gap-3 px-4 py-1.5 bg-black/80 backdrop-blur-xl rounded-xl border border-neon-cyan/40 w-fit">
            <motion.span
              className="w-2.5 h-2.5 rounded-full bg-neon-cyan"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[11px] text-neon-cyan font-bold tracking-[0.3em] uppercase">
              SYSTEM MASTER LINK ACTIVE
            </span>
          </div>
        </div>

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 z-10 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 242, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.2) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Scan Line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent z-20"
          style={{ boxShadow: '0 0 15px #00f2ff' }}
          animate={{
            top: ['-5%', '105%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Radar Pulse */}
        <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-[150px] h-[150px] rounded-full border border-neon-cyan/50"
            style={{
              boxShadow: 'inset 0 0 30px rgba(0,242,255,0.3)',
            }}
            animate={{
              scale: [0, 2.5],
              opacity: [1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <div
            className="absolute w-3 h-3 bg-neon-cyan rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ boxShadow: '0 0 15px #00f2ff' }}
          />
        </div>

        {/* Radar Image */}
        <div className="w-full h-full rounded-[3rem] overflow-hidden relative">
          <motion.div
            className="w-full h-full bg-gradient-to-br from-neon-cyan/10 via-primary/10 to-storm-indigo/10 opacity-80 mix-blend-screen"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Simulated Radar Visualization */}
            <div className="w-full h-full relative">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-20 h-20 rounded-full bg-neon-cyan/20"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                    filter: 'blur(10px)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 120px rgba(5,5,8,0.95)' }}
          />
        </div>

        {/* Controls */}
        <div className="absolute bottom-12 right-12 flex flex-col gap-4 z-30">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-2xl glass-card bg-black/90 border-white/20 flex items-center justify-center hover:text-neon-cyan transition-all"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-2xl glass-card bg-black/90 border-white/20 flex items-center justify-center hover:text-neon-cyan transition-all"
          >
            <Minus className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-cyan to-primary text-background border-none flex items-center justify-center shadow-2xl"
          >
            <Layers className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Coordinates */}
        <div className="absolute bottom-12 left-12 z-30 font-mono text-[11px] text-neon-cyan/70 flex flex-col gap-1 tracking-widest uppercase bg-black/40 p-4 rounded-xl backdrop-blur-md">
          <span>LAT: 37.7749° N</span>
          <span>LON: 122.4194° W</span>
          <span>ELEV: 52FT</span>
          <div className="mt-2 text-white/30 text-[9px]">
            System Build 0.1v
          </div>
        </div>
      </div>
    </motion.section>
  );
}
