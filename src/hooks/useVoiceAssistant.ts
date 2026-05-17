import { useCallback, useEffect, useRef, useState } from 'react';

type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface UseVoiceAssistantOptions {
  onTranscript?: (text: string) => void;
}

type SpeechRecognitionCtor = new () => SpeechRecognition;

function getSpeechRecognition(): SpeechRecognitionCtor | null {
  const w = window as Window & {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function useVoiceAssistant({ onTranscript }: UseVoiceAssistantOptions = {}) {
  const [state, setState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  onTranscriptRef.current = onTranscript;

  useEffect(() => {
    // Preload SpeechSynthesis voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    const Ctor = getSpeechRecognition();
    if (!Ctor) return;

    const recognition = new Ctor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setState('listening');
    recognition.onend = () => setState((s) => (s === 'listening' ? 'idle' : s));
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join('');
      setTranscript(text);
      const last = event.results[event.results.length - 1];
      if (last?.isFinal && text.trim()) {
        onTranscriptRef.current?.(text.trim());
        setState('thinking');
      }
    };
    recognition.onerror = (e) => {
      console.warn('Speech recognition error/interrupted:', e);
      setState('idle');
    };

    recognitionRef.current = recognition;
    return () => recognition.abort();
  }, []);

  useEffect(() => {
    if (state !== 'listening' && state !== 'speaking') {
      setAudioLevel(0);
      return;
    }
    const id = setInterval(() => setAudioLevel(0.25 + Math.random() * 0.75), 120);
    return () => clearInterval(id);
  }, [state]);

  const startListening = useCallback(() => {
    try {
      if (recognitionRef.current) {
        window.speechSynthesis.cancel(); // Stop talking when listening starts
        recognitionRef.current.start();
      }
    } catch {
      /* already started */
    }
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setState('idle');
  }, []);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    // Clean markdown bold, asterisks, URLs, emoji shortcodes and special characters for natural speech
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/:\w+:/g, '')
      .replace(/[-_~]/g, ' ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.1; // Slightly faster for high-energy cute speech
    utterance.pitch = 1.3; // Higher pitch for a cute, responsive tone
    utterance.volume = 0.95; // Premium clear output

    const voices = window.speechSynthesis.getVoices();
    
    // Intelligent female voice finder (Zira, Samantha, Hazel, Heather, Karen, etc.)
    const getFemaleVoice = () => {
      const femaleVoices = voices.filter(voice => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        return (
          name.includes('female') || 
          name.includes('woman') || 
          name.includes('zira') || 
          name.includes('samantha') || 
          name.includes('karen') || 
          name.includes('susan') ||
          name.includes('hazel') ||
          name.includes('heather') ||
          name.includes('linda') ||
          name.includes('melissa') ||
          (lang.includes('en') && (voice as any).gender === 'female')
        );
      });
      
      const englishFemale = femaleVoices.find(v => v.lang.toLowerCase().includes('en'));
      return englishFemale || femaleVoices[0] || voices.find(v => v.lang.includes('en')) || voices[0];
    };

    if (voices.length > 0) {
      const preferred = getFemaleVoice();
      if (preferred) utterance.voice = preferred;
    }

    utterance.onstart = () => setState('speaking');
    utterance.onend = () => setState('idle');
    utterance.onerror = () => setState('idle');
    
    window.speechSynthesis.speak(utterance);
  }, []);

  const setThinking = useCallback((thinking: boolean) => {
    setState(thinking ? 'thinking' : 'idle');
  }, []);

  return {
    state,
    transcript,
    audioLevel,
    startListening,
    stopListening,
    speak,
    setThinking,
    supported: Boolean(getSpeechRecognition() && window.speechSynthesis),
  };
}
