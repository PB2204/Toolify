'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

export default function BorderRadiusGenerator() {
  const [allCorners, setAllCorners] = useState(25);
  const [topLeft, setTopLeft] = useState(25);
  const [topRight, setTopRight] = useState(25);
  const [bottomRight, setBottomRight] = useState(25);
  const [bottomLeft, setBottomLeft] = useState(25);
  const { toast } = useToast();

  const borderRadius = `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;

  const handleAllCornersChange = (value: number) => {
    setAllCorners(value);
    setTopLeft(value);
    setTopRight(value);
    setBottomLeft(value);
    setBottomRight(value);
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: 'CSS copied to clipboard.' });
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Border Radius Generator</CardTitle>
          <CardDescription>Visually create and customize CSS border radius.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>All Corners: {allCorners}px</Label>
            <Slider value={[allCorners]} onValueChange={(v) => handleAllCornersChange(v[0])} min={0} max={200} />
          </div>
          <div className="space-y-2">
            <Label>Top Left: {topLeft}px</Label>
            <Slider value={[topLeft]} onValueChange={(v) => setTopLeft(v[0])} min={0} max={200} />
          </div>
          <div className="space-y-2">
            <Label>Top Right: {topRight}px</Label>
            <Slider value={[topRight]} onValueChange={(v) => setTopRight(v[0])} min={0} max={200} />
          </div>
          <div className="space-y-2">
            <Label>Bottom Right: {bottomRight}px</Label>
            <Slider value={[bottomRight]} onValueChange={(v) => setBottomRight(v[0])} min={0} max={200} />
          </div>
          <div className="space-y-2">
            <Label>Bottom Left: {bottomLeft}px</Label>
            <Slider value={[bottomLeft]} onValueChange={(v) => setBottomLeft(v[0])} min={0} max={200} />
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Card className="h-[300px] flex items-center justify-center">
            <div className="w-64 h-64 bg-primary rounded-lg flex items-center justify-center text-center p-4" style={{ borderRadius }}>
                <span className="text-primary-foreground">Preview</span>
            </div>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>CSS Code</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="relative">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                        <code>border-radius: {borderRadius};</code>
                    </pre>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => handleCopy(`border-radius: ${borderRadius};`)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}