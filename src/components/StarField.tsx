import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import './StarField.css';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleOffset: number;
  twinkleSpeed: number;
}

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 5000);
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.2,
        opacity: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.15 + 0.02,
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = theme === 'dark';
      const baseOpacity = isDark ? 1 : 0.25;

      starsRef.current.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const opacity = (star.opacity + twinkle * 0.3) * baseOpacity;
        const size = star.size + twinkle * 0.3;

        ctx.beginPath();
        ctx.arc(star.x, star.y, Math.max(0, size), 0, Math.PI * 2);

        if (isDark && star.size > 1.2) {
          // Glow for larger stars in dark mode
          const grd = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, size * 3);
          grd.addColorStop(0, `rgba(200, 220, 255, ${Math.max(0, opacity)})`);
          grd.addColorStop(1, 'rgba(200, 220, 255, 0)');
          ctx.fillStyle = grd;
          ctx.arc(star.x, star.y, size * 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(star.x, star.y, Math.max(0, size), 0, Math.PI * 2);
        }

        ctx.fillStyle = isDark
          ? `rgba(200, 220, 255, ${Math.max(0, opacity)})`
          : `rgba(100, 120, 200, ${Math.max(0, opacity * 0.5)})`;
        ctx.fill();

        // Slowly drift upward
        star.y -= star.speed;
        if (star.y < -2) {
          star.y = canvas.height + 2;
          star.x = Math.random() * canvas.width;
        }
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="star-field" aria-hidden="true" />;
};

export default StarField;
