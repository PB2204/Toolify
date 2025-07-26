'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function ViewportSizeChecker() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-full">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Viewport Size</CardTitle>
          <CardDescription>
            Your current browser viewport size. Resize the window to see it change.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div 
            key={`${size.width}x${size.height}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-6xl font-bold text-primary font-mono"
          >
            {size.width} x {size.height}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
