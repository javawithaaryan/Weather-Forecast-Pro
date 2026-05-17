import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { useState } from 'react';

export function OmniCore() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full h-full"
    >
      <div className="glass-card rounded-[3.5rem] p-12 h-full flex flex-col border-neon-cyan/20 relative shimmer-hover shadow-[inset_0_0_60px_rgba(0,242,255,0.05)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-8">
            {/* Omni Core Orb */}
            <motion.div
              className="w-40 h-40 rounded-full relative"
              style={{
                background: 'radial-gradient(circle at 40% 40%, #00f2ff, #7c4dff, #20005f)',
                filter: 'drop-shadow(0 0 30px rgba(0, 242, 255, 0.6))',
              }}
              animate={{
                background: [
                  'radial-gradient(circle at 40% 40%, #00f2ff, #7c4dff, #20005f)',
                  'radial-gradient(circle at 40% 40%, #FFB800, #FF8A00, #4f00d0)',
                  'radial-gradient(circle at 40% 40%, #00b8f0, #00455c, #001B4B)',
                  'radial-gradient(circle at 40% 40%, #00f2ff, #7c4dff, #20005f)',
                ],
                filter: [
                  'drop-shadow(0 0 30px rgba(0, 242, 255, 0.6))',
                  'drop-shadow(0 0 40px rgba(255, 184, 0, 0.6))',
                  'drop-shadow(0 0 35px rgba(0, 184, 240, 0.6))',
                  'drop-shadow(0 0 30px rgba(0, 242, 255, 0.6))',
                ],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              <motion.div
                className="absolute inset-[-20px] rounded-full border-2 border-white/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-[-40px] rounded-full border-2 border-white/5"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.05, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              />
            </motion.div>

            <div>
              <h3 className="text-3xl font-bold text-white text-glow mb-2">
                Omni-Core Pro X
              </h3>
              <p className="text-sm text-neon-cyan font-bold tracking-widest uppercase">
                Intuitive Intelligence Active
              </p>
            </div>
          </div>
        </div>

        {/* AI Brief */}
        <div className="flex-grow flex flex-col gap-6 mb-10">
          <motion.div
            className="glass-card bg-gradient-to-br from-white/5 to-white/0 border-white/10 rounded-3xl p-8 shadow-2xl relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute -top-3 -left-3 px-4 py-1 bg-neon-cyan text-background text-[10px] font-bold rounded-lg tracking-widest">
              CORE_BRIEF
            </div>
            <p className="text-lg leading-relaxed text-white/95 font-medium italic">
              "Weather conditions are optimal for outdoor activities until 6 PM. A
              minor pressure drop expected at 8 PM might trigger slight winds.
              Recommendation: Carry a light layer for the transition into evening."
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">
                  Lifestyle Impact
                </span>
                <span className="text-neon-cyan font-bold">
                  Peak Commute Comfort
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                <div className="w-2 h-2 rounded-full bg-neon-cyan/30" />
                <div className="w-2 h-2 rounded-full bg-neon-cyan/30" />
              </div>
            </div>
          </motion.div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 glass-card bg-black/40 hover:bg-neon-cyan/20 border-white/10 hover:border-neon-cyan/50 text-sm font-bold tracking-wide rounded-full transition-all text-white/80 hover:text-white"
            >
              "Optimal wear for tonight?"
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 glass-card bg-black/40 hover:bg-primary/20 border-white/10 hover:border-primary/50 text-sm font-bold tracking-wide rounded-full transition-all text-white/80 hover:text-white"
            >
              "Tahoe trajectory?"
            </motion.button>
          </div>
        </div>

        {/* Input Field */}
        <div className="relative glass-card bg-black/60 border-white/10 rounded-2xl p-3 flex items-center group focus-within:border-neon-cyan/50">
          <input
            className="w-full bg-transparent border-none text-lg focus:ring-0 px-6 text-white placeholder:text-white/30 outline-none"
            placeholder="Interface with Omni-Core..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            className="w-14 h-14 bg-gradient-to-r from-neon-cyan via-primary to-storm-indigo text-white rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.4)]"
          >
            <Send className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Shimmer Effect */}
        <div className="shimmer-hover absolute inset-0 pointer-events-none" />
      </div>
    </motion.section>
  );
}
