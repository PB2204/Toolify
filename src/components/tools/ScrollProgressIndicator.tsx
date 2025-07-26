'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Progress value={scrollProgress} className="fixed top-0 left-0 right-0 h-2 z-50 rounded-none" />
      <div className="w-full flex flex-col items-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Scroll Progress Indicator</CardTitle>
            <CardDescription>
              A progress bar at the top of the page indicates your scroll depth. Scroll down to see it in action!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[200vh] border-dashed border-2 rounded-md flex items-center justify-center p-4">
                 <p className="text-muted-foreground text-center">This area is intentionally very tall to demonstrate the scroll progress bar. Keep scrolling!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
