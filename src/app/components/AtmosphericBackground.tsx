import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  reset: (canvas: HTMLCanvasElement) => void;
  update: (canvas: HTMLCanvasElement) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export function AtmosphericBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const fog = fogRef.current;
    if (!canvas || !fog) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class ParticleClass implements Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 0;
      color: string = '';

      constructor() {
        this.reset(canvas!);
      }

      reset(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25 - 0.15;
        this.opacity = Math.random() * 0.4 + 0.1;
        const colors = ['rgba(0, 242, 255,', 'rgba(255, 184, 0,', 'rgba(205, 189, 255,'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX;
        this.y += this.speedY;
        if (
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height
        ) {
          this.reset(canvas);
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `${this.color} ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color.replace(',', ')');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      resize();
      for (let i = 0; i < 120; i++) {
        particles.push(new ParticleClass());
      }
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(canvas);
        p.draw(ctx);
      });
      requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!fog) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      fog.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    };

    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', handleMouseMove);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="animated-bg fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden">
      {/* Mesh Blobs */}
      <div
        className="absolute w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-40 top-[-10%] left-[-10%]"
        style={{
          background: 'radial-gradient(circle, #ff8a00, transparent 70%)',
          animation: 'mesh 25s infinite alternate ease-in-out',
          mixBlendMode: 'screen',
        }}
      />
      <div
        className="absolute w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-40 bottom-[-10%] right-[-10%]"
        style={{
          background: 'radial-gradient(circle, #4f00d0, transparent 70%)',
          animation: 'mesh 25s infinite alternate ease-in-out',
          animationDelay: '-5s',
          animationDirection: 'reverse',
          mixBlendMode: 'screen',
        }}
      />
      <div
        className="absolute w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-40 top-[30%] left-[30%]"
        style={{
          background: 'radial-gradient(circle, #004d66, transparent 70%)',
          animation: 'mesh 25s infinite alternate ease-in-out',
          animationDelay: '-10s',
          mixBlendMode: 'screen',
        }}
      />

      {/* Fog Overlay */}
      <div
        ref={fogRef}
        className="fixed inset-0 pointer-events-none transition-[background-position] duration-300 ease-out"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, rgba(5,5,8,0.8) 100%)',
        }}
      />

      {/* Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40 pointer-events-none"
      />
    </div>
  );
}
