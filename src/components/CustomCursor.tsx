'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const cursorColors = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  '#39ff14',
  '#ffff00',
];

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  const mousePos = useRef({ x: -100, y: -100 });
  const circlePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
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

    const animate = (time: number) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            
            circlePos.current.x += (mousePos.current.x - circlePos.current.x) * 0.1 * deltaTime * 0.1;
            circlePos.current.y += (mousePos.current.y - circlePos.current.y) * 0.1 * deltaTime * 0.1;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`;
            }
             if (circleRef.current) {
                circleRef.current.style.transform = `translate(${circlePos.current.x}px, ${circlePos.current.y}px)`;
            }
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }
    
    requestRef.current = requestAnimationFrame(animate);

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
      if(requestRef.current) {
          cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  const currentColor = cursorColors[colorIndex];

  return (
    <>
      <div
        id="cursor-dot"
        ref={dotRef}
        className={cn(
          'hidden md:block w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2'
        )}
        style={{ backgroundColor: currentColor }}
      />
      <div
        id="cursor-circle"
        ref={circleRef}
        className={cn(
          "hidden md:block w-8 h-8 rounded-full border-2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200",
          isHovering ? "scale-150" : "scale-100"
        )}
        style={{ 
          borderColor: currentColor,
          boxShadow: `0 0 10px ${currentColor}`,
        }}
      />
    </>
  );
}
