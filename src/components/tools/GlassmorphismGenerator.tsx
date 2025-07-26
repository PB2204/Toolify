'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import { SketchPicker } from 'react-color';

export default function GlassmorphismGenerator() {
  const [blur, setBlur] = useState(10);
  const [transparency, setTransparency] = useState(15);
  const [color, setColor] = useState('rgba(255, 255, 255, 1)');
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const rgbaColor = color.replace(/rgb/i, 'rgba').replace(')', `, ${transparency / 100})`);
  const glassStyle = {
    background: rgbaColor,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: `1px solid rgba(255, 255, 255, 0.2)`,
  };
  const cssCode = `background: ${rgbaColor};\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: 1px solid rgba(255, 255, 255, 0.2);`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: 'CSS copied to clipboard.' });
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Glassmorphism Generator</CardTitle>
          <CardDescription>Visually create and customize glassmorphism CSS effects.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Blur: {blur}px</Label>
            <Slider value={[blur]} onValueChange={(v) => setBlur(v[0])} min={0} max={50} />
          </div>
          <div className="space-y-2">
            <Label>Transparency: {transparency}%</Label>
            <Slider value={[transparency]} onValueChange={(v) => setTransparency(v[0])} min={0} max={100} />
          </div>
          <div>
            <Label>Base Color</Label>
            {isClient && <SketchPicker color={color} onChangeComplete={(c) => setColor(`rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`)} />}
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Card className="h-[300px] flex items-center justify-center p-4" style={{backgroundImage: 'url(https://placehold.co/600x400/ec4899/3b82f6.png)', backgroundSize: 'cover'}}>
            <div className="w-48 h-48 rounded-lg flex items-center justify-center text-center p-4" style={glassStyle}>
                <span className="text-white font-bold">Preview</span>
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
