import { useEffect, useMemo, useRef } from 'react';
import type { WeatherCondition } from '@/weather/types';
import '@/animations/effects.css';

interface WeatherReactiveBackgroundProps {
  condition: WeatherCondition;
  isNight?: boolean;
}

export function WeatherReactiveBackground({
  condition,
  isNight = false,
}: WeatherReactiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);

  const palette = useMemo(() => {
    const base: Record<WeatherCondition, string[]> = {
      clear: isNight
        ? ['#1e1b4b', '#4f00d0', '#0a0a0c']
        : ['#ff8a00', '#FFB800', '#0a0a0c'],
      cloudy: ['#6366f1', '#494455', '#0a0a0c'],
      rainy: ['#004d66', '#001B4B', '#0a0a0c'],
      thunderstorm: ['#1a0a2e', '#4f00d0', '#0a0a0c'],
      snowy: ['#70d2ff', '#cac3d8', '#1e1b4b'],
      foggy: ['#494455', '#333535', '#0a0a0c'],
    };
    return base[condition];
  }, [condition, isNight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const colors =
      condition === 'rainy' || condition === 'thunderstorm'
        ? ['rgba(0, 184, 240,']
        : condition === 'snowy'
          ? ['rgba(255, 255, 255,']
          : isNight
            ? ['rgba(205, 189, 255,', 'rgba(0, 242, 255,']
            : ['rgba(255, 184, 0,', 'rgba(0, 242, 255,'];

    const count = condition === 'clear' ? 80 : condition === 'snowy' ? 100 : 120;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.3,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY:
          condition === 'rainy'
            ? Math.random() * 4 + 3
            : condition === 'snowy'
              ? Math.random() * 1 + 0.5
              : (Math.random() - 0.5) * 0.2 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    resize();
    let frame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y =
            condition === 'rainy' || condition === 'snowy'
              ? -10
              : Math.random() * canvas.height;
        }
        ctx.fillStyle = `${p.color} ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, condition === 'snowy' ? p.size * 2 : p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      frame = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      if (!fogRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      fogRef.current.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    };
    document.addEventListener('mousemove', handleMouse);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouse);
    };
  }, [condition, isNight]);

  const rainDrops = condition === 'rainy' || condition === 'thunderstorm';
  const snowFlakes = condition === 'snowy';

  return (
    <div className="animated-bg fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${palette[0]}33 0%, ${palette[2]} 70%)`,
        }}
      />

      <div
        className="absolute w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-35 top-[-10%] left-[-10%] animate-mesh"
        style={{
          background: `radial-gradient(circle, ${palette[0]}, transparent 70%)`,
          mixBlendMode: 'screen',
        }}
      />
      <div
        className="absolute w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-35 bottom-[-10%] right-[-10%] animate-mesh"
        style={{
          background: `radial-gradient(circle, ${palette[1]}, transparent 70%)`,
          mixBlendMode: 'screen',
          animationDirection: 'reverse',
        }}
      />

      {condition === 'clear' && !isNight && <div className="weather-sun-rays opacity-40" />}
      {condition === 'thunderstorm' && <div className="weather-lightning-overlay" />}
      {isNight && condition === 'clear' && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 20% 30%, white, transparent),
              radial-gradient(1px 1px at 60% 70%, white, transparent),
              radial-gradient(1px 1px at 80% 20%, white, transparent)`,
            backgroundSize: '200px 200px',
          }}
        />
      )}

      {rainDrops &&
        Array.from({ length: 40 }).map((_, i) => (
          <span
            key={`rain-${i}`}
            className="weather-rain-drop"
            style={{
              left: `${(i * 2.5) % 100}%`,
              animationDuration: `${0.6 + (i % 5) * 0.15}s`,
              animationDelay: `${(i % 10) * 0.1}s`,
            }}
          />
        ))}

      {snowFlakes &&
        Array.from({ length: 35 }).map((_, i) => (
          <span
            key={`snow-${i}`}
            className="weather-snow-flake"
            style={{
              left: `${(i * 3) % 100}%`,
              width: `${3 + (i % 4)}px`,
              height: `${3 + (i % 4)}px`,
              animationDuration: `${4 + (i % 6)}s`,
              animationDelay: `${(i % 8) * 0.3}s`,
            }}
          />
        ))}

      <div
        ref={fogRef}
        className="fixed inset-0 pointer-events-none transition-[background-position] duration-300"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, rgba(5,5,8,0.75) 100%)',
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-50 pointer-events-none" />
    </div>
  );
}
