import { useEffect, useRef } from "react";

interface ParticlesProps {
  theme: "dark" | "light";
}

export default function Particles({ theme }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas.parentElement || document.body);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Attract lightly to mouse if active
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            this.x += (dx / dist) * 0.3;
            this.y += (dy / dist) * 0.3;
          }
        }
      }

      draw(c: CanvasRenderingContext2D, t: "dark" | "light") {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const color = t === "dark" ? `rgba(99, 102, 241, ${this.alpha})` : `rgba(79, 70, 229, ${this.alpha * 0.7})`;
        c.fillStyle = color;
        c.fill();
      }
    }

    const count = Math.min(60, Math.floor((width * height) / 15000));
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    const mouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const mouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", mouseMove);
    document.body.addEventListener("mouseleave", mouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw standard mesh lines between particles close to each other
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw(ctx, theme);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineOpacity = (1 - dist / 100) * 0.12;
            const lineColor = theme === "dark" ? `rgba(139, 92, 246, ${lineOpacity})` : `rgba(99, 102, 241, ${lineOpacity})`;
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", mouseMove);
      document.body.removeEventListener("mouseleave", mouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      id="neural-particles-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
    />
  );
}
