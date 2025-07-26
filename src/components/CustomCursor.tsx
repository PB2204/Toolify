'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const cursorColors = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  '#39ff14',
  '#ffff00',
];

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof Element && (e.target.matches('a, button, [role=button], input[type=submit]'))) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
       if (e.target instanceof Element && (e.target.matches('a, button, [role=button], input[type=submit]'))) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    const colorInterval = setInterval(() => {
        setColorIndex(prevIndex => (prevIndex + 1) % cursorColors.length);
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <div
      className={cn(
        "hidden md:block fixed w-8 h-8 rounded-full border-2 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out z-[9999]",
        isHovering ? "scale-150" : "scale-100"
      )}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        borderColor: cursorColors[colorIndex],
        boxShadow: `0 0 15px ${cursorColors[colorIndex]}`,
      }}
    />
  );
}
