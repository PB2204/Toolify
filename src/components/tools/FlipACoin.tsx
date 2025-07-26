'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Circle, Crown } from 'lucide-react';

export default function FlipACoin() {
  const [result, setResult] = useState<'Heads' | 'Tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setResult(null);
    setTimeout(() => {
      const flip = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setResult(flip);
      setIsFlipping(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Flip a Coin</CardTitle>
          <CardDescription>Click the button to flip a virtual coin.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-40 flex items-center justify-center">
            <AnimatePresence>
              {isFlipping && (
                <motion.div
                  className="text-primary"
                  animate={{ rotate: [0, 360, 720] }}
                  transition={{ duration: 1, ease: 'linear' }}
                >
                  <Circle className="h-32 w-32" />
                </motion.div>
              )}
              {result && (
                <motion.div
                  initial={{ scale: 0, rotateY: 180 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  exit={{ scale: 0 }}
                  className="text-center"
                >
                  {result === 'Heads' ? 
                    <Crown className="h-32 w-32 text-amber-400" /> : 
                    <Circle className="h-32 w-32 text-slate-400" />
                  }
                  <p className="text-3xl font-bold mt-4">{result}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Button onClick={handleFlip} disabled={isFlipping} size="lg">
            {isFlipping ? 'Flipping...' : 'Flip Coin'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
