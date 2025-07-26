'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft, Expand, Shrink } from 'lucide-react';
import { Button } from '../ui/button';

export default function ViewportUnitsConverter() {
  const [pixels, setPixels] = useState('100');
  const [vw, setVw] = useState('');
  const [vh, setVh] = useState('');
  const [viewportWidth, setViewportWidth] = useState(1920);
  const [viewportHeight, setViewportHeight] = useState(1080);
  
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (isClient) {
        setViewportWidth(window.innerWidth);
        setViewportHeight(window.innerHeight);
    }
  }, [isClient]);

  useEffect(() => {
    const num = parseFloat(pixels);
    if (!isNaN(num)) {
      setVw(((num / viewportWidth) * 100).toFixed(4));
      setVh(((num / viewportHeight) * 100).toFixed(4));
    }
  }, [pixels, viewportWidth, viewportHeight]);
  
  const useCurrentViewport = () => {
    setViewportWidth(window.innerWidth);
    setViewportHeight(window.innerHeight);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Pixel ↔ Viewport Unit Converter</CardTitle>
        <CardDescription>Convert pixels to viewport width (vw) and height (vh).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="viewport-width">Viewport Width (px)</Label>
            <Input id="viewport-width" type="number" value={viewportWidth} onChange={e => setViewportWidth(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="viewport-height">Viewport Height (px)</Label>
            <Input id="viewport-height" type="number" value={viewportHeight} onChange={e => setViewportHeight(Number(e.target.value))} />
          </div>
        </div>
        <Button onClick={useCurrentViewport} variant="outline" size="sm">Use Current Viewport</Button>
        <div className="grid md:grid-cols-3 gap-4 items-center">
            <div className="space-y-2">
                <Label htmlFor="pixels-input">Pixels (px)</Label>
                <Input
                    id="pixels-input"
                    type="number"
                    value={pixels}
                    onChange={e => setPixels(e.target.value)}
                    placeholder="e.g. 100"
                    className="text-lg"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="vw-output">Viewport Width (vw)</Label>
                <Input
                    id="vw-output"
                    readOnly
                    value={vw}
                    className="bg-muted text-lg font-mono"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="vh-output">Viewport Height (vh)</Label>
                <Input
                    id="vh-output"
                    readOnly
                    value={vh}
                    className="bg-muted text-lg font-mono"
                />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
