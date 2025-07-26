'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

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

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      className={cn(
        "hidden md:block fixed w-8 h-8 rounded-full border-2 border-primary pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-in-out z-[9999]",
        "shadow-[0_0_15px_hsl(var(--primary)),inset_0_0_10px_hsl(var(--primary))]",
        isHovering ? "scale-150" : "scale-100"
      )}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
}
