'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import { SketchPicker } from 'react-color';

export default function BoxShadowGenerator() {
  const [horizontalOffset, setHorizontalOffset] = useState(10);
  const [verticalOffset, setVerticalOffset] = useState(10);
  const [blurRadius, setBlurRadius] = useState(20);
  const [spreadRadius, setSpreadRadius] = useState(5);
  const [color, setColor] = useState('rgba(0,0,0,0.2)');
  const [isInset, setIsInset] = useState(false);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const boxShadow = `${isInset ? 'inset ' : ''}${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${color}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: 'CSS copied to clipboard.' });
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Box Shadow Generator</CardTitle>
          <CardDescription>Visually create and customize CSS box shadows.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Horizontal Offset: {horizontalOffset}px</Label>
            <Slider value={[horizontalOffset]} onValueChange={(v) => setHorizontalOffset(v[0])} min={-50} max={50} />
          </div>
          <div className="space-y-2">
            <Label>Vertical Offset: {verticalOffset}px</Label>
            <Slider value={[verticalOffset]} onValueChange={(v) => setVerticalOffset(v[0])} min={-50} max={50} />
          </div>
          <div className="space-y-2">
            <Label>Blur Radius: {blurRadius}px</Label>
            <Slider value={[blurRadius]} onValueChange={(v) => setBlurRadius(v[0])} min={0} max={100} />
          </div>
          <div className="space-y-2">
            <Label>Spread Radius: {spreadRadius}px</Label>
            <Slider value={[spreadRadius]} onValueChange={(v) => setSpreadRadius(v[0])} min={-50} max={50} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="inset" checked={isInset} onCheckedChange={(checked) => setIsInset(!!checked)} />
            <Label htmlFor="inset">Inset</Label>
          </div>
          <div>
            <Label>Shadow Color</Label>
            {isClient && <SketchPicker color={color} onChangeComplete={(c) => setColor(`rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`)} />}
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Card className="h-[300px] flex items-center justify-center">
            <div className="w-48 h-48 bg-background rounded-lg flex items-center justify-center text-center p-4" style={{ boxShadow }}>
                Preview
            </div>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>CSS Code</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="relative">
                    <pre className="bg-primary/5 p-4 rounded-md overflow-x-auto">
                        <code>box-shadow: {boxShadow};</code>
                    </pre>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => handleCopy(`box-shadow: ${boxShadow};`)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
