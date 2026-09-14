import { motion } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
}

export function Magnet({
  children,
  padding = 100,
  strength = 1,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    const distance = Math.sqrt(distX * distX + distY * distY);
    const maxDistance = Math.max(rect.width, rect.height) / 2 + padding;

    if (distance < maxDistance) {
      setX(distX / strength);
      setY(distY / strength);
    }
  };

  const handleMouseLeave = () => {
    setX(0);
    setY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
      }}
      style={{
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
}
