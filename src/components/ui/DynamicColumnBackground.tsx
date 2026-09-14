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
      colorType: 'primary' | 'secondary' | 'accent';
    }

    const beams: Beam[] = [];
    const beamCount = Math.floor(numColumns * 1.4);

    for (let i = 0; i < beamCount; i++) {
      beams.push({
        col: Math.floor(Math.random() * numColumns),
        y: Math.random() * height,
        length: 100 + Math.random() * 180,
        speed: 1.0 + Math.random() * 2.2,
        opacity: 0.25 + Math.random() * 0.45,
        colorType: Math.random() > 0.6 ? 'primary' : Math.random() > 0.3 ? 'secondary' : 'accent',
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
            ? `rgba(99, 102, 241, ${0.15 + hoverIntensity * 0.35})`
            : 'rgba(203, 213, 225, 0.45)';
          ctx.lineWidth = hoverIntensity > 0 ? 1.5 : 1;
        } else {
          ctx.strokeStyle = hoverIntensity > 0
            ? `rgba(56, 189, 248, ${0.15 + hoverIntensity * 0.4})`
            : 'rgba(31, 41, 55, 0.35)';
          ctx.lineWidth = hoverIntensity > 0 ? 1.5 : 1;
        }

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 2. Draw animated moving light beams down/up the columns
      beams.forEach((beam) => {
        const x = beam.col * colWidth;
        const beamHeadY = beam.y;
        const distToMouse = Math.hypot(x - mouseX, beamHeadY - mouseY);
        const proximityBoost = Math.max(0, 1 - distToMouse / 250);

        const currentOpacity = Math.min(1, beam.opacity + proximityBoost * 0.5);

        // Colors
        let strokeColor: string;
        if (isLight) {
          if (beam.colorType === 'primary') strokeColor = `rgba(79, 70, 229, ${currentOpacity})`;
          else if (beam.colorType === 'secondary') strokeColor = `rgba(14, 165, 233, ${currentOpacity})`;
          else strokeColor = `rgba(16, 185, 129, ${currentOpacity})`;
        } else {
          if (beam.colorType === 'primary') strokeColor = `rgba(56, 189, 248, ${currentOpacity * 0.95})`;
          else if (beam.colorType === 'secondary') strokeColor = `rgba(52, 211, 153, ${currentOpacity * 0.95})`;
          else strokeColor = `rgba(168, 85, 247, ${currentOpacity * 0.95})`;
        }

        const gradient = ctx.createLinearGradient(x, beam.y - beam.length, x, beam.y);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(1, strokeColor);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = isLight ? (2 + proximityBoost) : (1.5 + proximityBoost);

        ctx.beginPath();
        ctx.moveTo(x, beam.y - beam.length);
        ctx.lineTo(x, beam.y);
        ctx.stroke();

        // Draw glowing head point
        ctx.fillStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(x, beam.y, isLight ? (3 + proximityBoost * 2) : (2.5 + proximityBoost * 2), 0, Math.PI * 2);
        ctx.fill();

        // Move beam down
        beam.y += beam.speed + proximityBoost * 1.5;
        if (beam.y - beam.length > height) {
          beam.y = -20;
          beam.col = Math.floor(Math.random() * numColumns);
          beam.speed = 1.0 + Math.random() * 2.2;
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

