import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Send, Sparkles } from 'lucide-react';
import { askWeatherXAI } from '@/services/geminiService';
import { useWeather } from '@/context/WeatherContext';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { VoiceWaveform } from '@/voice/VoiceWaveform';

const QUICK_PROMPTS = [
  'What should I wear tonight?',
  'Will it rain during my trip?',
  'Best time for outdoor activities?',
  'How is the AQI for breathing?',
];

export function WeatherXAI() {
  const { bundle } = useWeather();
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState(
    'Ask me anything about weather, travel, outfits, or outdoor plans.',
  );
  const voiceRef = useRef<ReturnType<typeof useVoiceAssistant> | null>(null);
  const lastCityRef = useRef<string>('');

  const sendPrompt = useCallback(
    async (prompt: string) => {
      if (!prompt.trim() || !bundle) return;
      setMessage('');
      voiceRef.current?.setThinking(true);
      const response = await askWeatherXAI(prompt, {
        weather: bundle.current,
        airQuality: bundle.airQuality,
      });
      setReply(response);
      voiceRef.current?.setThinking(false);
      voiceRef.current?.speak(response);
    },
    [bundle],
  );

  const voice = useVoiceAssistant({
    onTranscript: (text) => {
      void sendPrompt(text);
    },
  });
  voiceRef.current = voice;

  // Automatically explain and describe the weather when a new location is searched or loaded
  useEffect(() => {
    if (!bundle) return;
    const currentCity = bundle.current.city;

    const autoExplain = async () => {
      voice.setThinking(true);
      const prompt = `Provide an interactive, friendly, futuristic weather summary for ${currentCity}. Describe the current weather temperature, conditions, humidity, wind speed, and give a helpful tip for outfits or outdoor travel. Speak directly to the user.`;
      
      const response = await askWeatherXAI(prompt, {
        weather: bundle.current,
        airQuality: bundle.airQuality,
      });
      
      setReply(response);
      voice.setThinking(false);

      // Speak aloud on location search, but only if the city actually changed and it's not the initial run
      if (lastCityRef.current && lastCityRef.current !== currentCity) {
        voice.speak(response);
      }
      lastCityRef.current = currentCity;
    };

    void autoExplain();
  }, [bundle?.current.city]);

  if (!bundle) return null;

  return (
    <motion.section
      id="weather-x-ai"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full h-full"
    >
      <div className="glass-card rounded-[3.5rem] p-10 h-full flex flex-col border-neon-cyan/20 relative overflow-hidden">
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div className="flex items-center gap-6">
            <motion.div
              className="w-24 h-24 rounded-full shrink-0"
              style={{
                background: 'radial-gradient(circle at 40% 40%, #00f2ff, #7c4dff, #20005f)',
                boxShadow: '0 0 40px rgba(0, 242, 255, 0.5)',
              }}
              animate={
                voice.state === 'listening'
                  ? { scale: [1, 1.1, 1], boxShadow: '0 0 55px rgba(0, 242, 255, 0.8)' }
                  : voice.state === 'thinking'
                    ? { rotate: 360, scale: [1, 0.95, 1], boxShadow: '0 0 40px rgba(124, 77, 255, 0.6)' }
                    : voice.state === 'speaking'
                      ? { scale: [1, 1.15, 1], boxShadow: '0 0 60px rgba(124, 77, 255, 0.8)' }
                      : {}
              }
              transition={
                voice.state === 'thinking'
                  ? { duration: 2, repeat: Infinity, ease: 'linear' }
                  : { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
              }
            />
            <div>
              <h3 className="text-2xl font-bold text-white text-glow">Weather X AI</h3>
              <p className="text-sm text-neon-cyan font-bold tracking-widest uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {voice.state === 'listening'
                  ? 'Listening…'
                  : voice.state === 'thinking'
                    ? 'Analyzing…'
                    : voice.state === 'speaking'
                      ? 'Speaking…'
                      : 'Intelligence Active'}
              </p>
            </div>
          </div>
          <VoiceWaveform
            level={voice.audioLevel}
            active={voice.state === 'listening' || voice.state === 'speaking'}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={reply.slice(0, 48)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card bg-gradient-to-br from-white/5 to-transparent rounded-3xl p-6 border-white/10 mb-6 flex-grow"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-neon-cyan tracking-widest uppercase">
                AI Summary
              </span>
              <button
                type="button"
                onClick={() => voice.speak(reply)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-neon-cyan/40 text-neon-cyan transition-all flex items-center justify-center shrink-0 cursor-pointer"
                title="Speak weather description"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
            </div>
            <p className="text-base leading-relaxed text-white/90 mt-3">{reply}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap gap-2 mb-6">
          {QUICK_PROMPTS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => void sendPrompt(q)}
              className="px-4 py-2 text-xs glass-card bg-black/40 border-white/10 rounded-full hover:border-neon-cyan/40 text-white/80"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="glass-card bg-black/60 border-white/10 rounded-2xl p-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              voice.state === 'listening' ? voice.stopListening() : voice.startListening()
            }
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              voice.state === 'listening' ? 'bg-neon-cyan text-background' : 'bg-white/5 text-white'
            }`}
            aria-label="Voice input"
          >
            {voice.state === 'listening' ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <input
            className="flex-1 bg-transparent px-3 text-white outline-none placeholder:text-white/30"
            placeholder="Ask Weather X AI…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && void sendPrompt(message)}
          />
          <button
            type="button"
            onClick={() => void sendPrompt(message)}
            className="w-12 h-12 bg-gradient-to-r from-neon-cyan to-primary text-background rounded-xl flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
