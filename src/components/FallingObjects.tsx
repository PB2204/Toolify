'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const lightColors = [
    'rgba(0, 191, 255, 0.6)', // Sky Blue
    'rgba(0, 255, 255, 0.6)', // Bright Cyan
    'rgba(179, 136, 255, 0.6)', // Light Purple
    'rgba(0, 242, 169, 0.6)', // Aqua Green
    'rgba(255, 230, 0, 0.6)', // Bright Yellow
    'rgba(255, 107, 107, 0.6)', // Coral Pink
    'rgba(255, 159, 28, 0.6)', // Neon Orange
    'rgba(255, 60, 172, 0.6)', // Hot Pink
];

const darkColors = [
    'rgba(0, 255, 255, 0.7)',     // Neon Blue
    'rgba(255, 0, 255, 0.7)',     // Neon Pink
    'rgba(57, 255, 20, 0.7)',      // Neon Green
    'rgba(255, 255, 0, 0.7)',     // Yellow Accent
];

interface FallingObject {
    id: number;
    left: string;
    animationDuration: string;
    animationDelay: string;
    size: string;
}

export function FallingObjects() {
  const { resolvedTheme } = useTheme();
  const [objects, setObjects] = useState<FallingObject[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
        const generatedObjects = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 5}s`,
            animationDelay: `${Math.random() * 5}s`,
            size: `${10 + Math.random() * 20}px`,
        }));
        setObjects(generatedObjects);
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }
  
  const colors = resolvedTheme === 'dark' ? darkColors : lightColors;

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden" aria-hidden="true">
      {objects.map((obj) => (
        <div
          key={obj.id}
          className="absolute rounded-full"
          style={{
            left: obj.left,
            width: obj.size,
            height: obj.size,
            backgroundColor: colors[obj.id % colors.length],
            animationName: 'fall',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDuration: obj.animationDuration,
            animationDelay: obj.animationDelay,
            filter: 'blur(5px)',
          }}
        />
      ))}
    </div>
  );
}
