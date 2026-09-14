import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function DynamicColumnBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;

    // Number of columns based on screen width
    const numColumns = Math.max(14, Math.floor(width / 80));
    const colWidth = width / numColumns;

    // Beams travelling along columns
    interface Beam {
      col: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      colorType: 'violet' | 'cyan' | 'amber' | 'emerald' | 'rose';
    }

    const beams: Beam[] = [];
    const beamCount = Math.floor(numColumns * 1.5);
    const colorTypes: ('violet' | 'cyan' | 'amber' | 'emerald' | 'rose')[] = ['violet', 'cyan', 'amber', 'emerald', 'rose'];

    for (let i = 0; i < beamCount; i++) {
      beams.push({
        col: Math.floor(Math.random() * numColumns),
        y: Math.random() * height,
        length: 120 + Math.random() * 200,
        speed: 1.2 + Math.random() * 2.5,
        opacity: 0.35 + Math.random() * 0.5,
        colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)],
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = theme === 'light';

      // 1. Draw static subtle column grid lines with mouse proximity effect
      for (let i = 0; i <= numColumns; i++) {
        const x = i * colWidth;
        const distToMouse = Math.abs(x - mouseX);
        const hoverIntensity = Math.max(0, 1 - distToMouse / 220);

        if (isLight) {
          ctx.strokeStyle = hoverIntensity > 0
            ? `rgba(99, 102, 241, ${0.2 + hoverIntensity * 0.4})`
            : 'rgba(203, 213, 225, 0.4)';
          ctx.lineWidth = hoverIntensity > 0 ? 1.5 : 1;
        } else {
          ctx.strokeStyle = hoverIntensity > 0
            ? `rgba(168, 85, 247, ${0.2 + hoverIntensity * 0.45})`
            : 'rgba(31, 41, 55, 0.35)';
          ctx.lineWidth = hoverIntensity > 0 ? 1.5 : 1;
        }

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 2. Draw animated moving light beams down/up the columns with vibrant distinct colors
      beams.forEach((beam) => {
        const x = beam.col * colWidth;
        const beamHeadY = beam.y;
        const distToMouse = Math.hypot(x - mouseX, beamHeadY - mouseY);
        const proximityBoost = Math.max(0, 1 - distToMouse / 250);

        const currentOpacity = Math.min(1, beam.opacity + proximityBoost * 0.4);

        // Vibrant Color Palettes
        let strokeColor: string;
        if (isLight) {
          switch (beam.colorType) {
            case 'violet': strokeColor = `rgba(147, 51, 234, ${currentOpacity})`; break;  // Rich Violet
            case 'cyan': strokeColor = `rgba(6, 182, 212, ${currentOpacity})`; break;    // Vivid Cyan
            case 'amber': strokeColor = `rgba(217, 119, 6, ${currentOpacity})`; break;   // Warm Amber
            case 'emerald': strokeColor = `rgba(16, 185, 129, ${currentOpacity})`; break;// Electric Emerald
            case 'rose': strokeColor = `rgba(225, 29, 72, ${currentOpacity})`; break;    // Coral Rose
          }
        } else {
          switch (beam.colorType) {
            case 'violet': strokeColor = `rgba(192, 132, 252, ${currentOpacity * 0.95})`; break;// Neon Purple
            case 'cyan': strokeColor = `rgba(56, 189, 248, ${currentOpacity * 0.95})`; break;  // Electric Cyan
            case 'amber': strokeColor = `rgba(251, 191, 36, ${currentOpacity * 0.95})`; break; // Glowing Gold
            case 'emerald': strokeColor = `rgba(52, 211, 153, ${currentOpacity * 0.95})`; break;// Bright Emerald
            case 'rose': strokeColor = `rgba(244, 63, 94, ${currentOpacity * 0.95})`; break;   // Neon Rose
          }
        }

        const gradient = ctx.createLinearGradient(x, beam.y - beam.length, x, beam.y);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(1, strokeColor);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = isLight ? (2 + proximityBoost * 1.5) : (1.8 + proximityBoost * 1.5);

        ctx.beginPath();
        ctx.moveTo(x, beam.y - beam.length);
        ctx.lineTo(x, beam.y);
        ctx.stroke();

        // Draw glowing head point
        ctx.fillStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(x, beam.y, isLight ? (3.5 + proximityBoost * 2) : (3 + proximityBoost * 2), 0, Math.PI * 2);
        ctx.fill();

        // Move beam down
        beam.y += beam.speed + proximityBoost * 1.5;
        if (beam.y - beam.length > height) {
          beam.y = -20;
          beam.col = Math.floor(Math.random() * numColumns);
          beam.speed = 1.2 + Math.random() * 2.5;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 opacity-90"
    />
  );
}

