'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import { SketchPicker } from 'react-color';

export default function NeumorphismGenerator() {
  const [distance, setDistance] = useState(10);
  const [blur, setBlur] = useState(20);
  const [intensity, setIntensity] = useState(5);
  const [color, setColor] = useState('#e0e0e0');
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lightShadow = `-${distance}px -${distance}px ${blur}px rgba(255, 255, 255, ${intensity / 10})`;
  const darkShadow = `${distance}px ${distance}px ${blur}px rgba(0, 0, 0, ${intensity / 100})`;
  const neumorphismStyle = {
    background: color,
    boxShadow: `${lightShadow}, ${darkShadow}`
  };
  const cssCode = `background: ${color};\nbox-shadow: ${lightShadow},\n            ${darkShadow};`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: 'CSS copied to clipboard.' });
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Neumorphism Generator</CardTitle>
          <CardDescription>Visually create and customize Neumorphism CSS effects.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Distance: {distance}px</Label>
            <Slider value={[distance]} onValueChange={(v) => setDistance(v[0])} min={1} max={50} />
          </div>
           <div className="space-y-2">
            <Label>Blur: {blur}px</Label>
            <Slider value={[blur]} onValueChange={(v) => setBlur(v[0])} min={1} max={100} />
          </div>
          <div className="space-y-2">
            <Label>Intensity: {intensity}%</Label>
            <Slider value={[intensity]} onValueChange={(v) => setIntensity(v[0])} min={1} max={100} />
          </div>
          <div>
            <Label>Base Color</Label>
            {isClient && <SketchPicker color={color} onChangeComplete={(c) => setColor(c.hex)} />}
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Card className="h-[300px] flex items-center justify-center p-4" style={{background: color}}>
            <div className="w-48 h-48 rounded-lg flex items-center justify-center text-center p-4" style={neumorphismStyle}>
                <span className="font-bold" style={{color: '#6d6d6d'}}>Preview</span>
            </div>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>CSS Code</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="relative">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                        <code>{cssCode}</code>
                    </pre>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => handleCopy(cssCode)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
