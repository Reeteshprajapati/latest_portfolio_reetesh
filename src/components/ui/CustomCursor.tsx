import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isLight = theme === 'light';

  return (
    <>
      {/* Outer Spring Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-sky-400/60"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 16),
          y: mousePosition.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          scale: isMouseDown ? 0.8 : isHovered ? 1.25 : 1,
          borderColor: isHovered
            ? isLight
              ? '#6366F1'
              : '#38BDF8'
            : isLight
            ? 'rgba(99, 102, 241, 0.4)'
            : 'rgba(56, 189, 248, 0.4)',
          backgroundColor: isHovered
            ? isLight
              ? 'rgba(99, 102, 241, 0.08)'
              : 'rgba(56, 189, 248, 0.1)'
            : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.5 }}
      />

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full shadow-sm"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          width: 8,
          height: 8,
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isLight ? '#6366F1' : '#38BDF8',
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 800 }}
      />
    </>
  );
}
