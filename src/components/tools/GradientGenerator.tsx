'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw } from 'lucide-react';
import { SketchPicker } from 'react-color';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function GradientGenerator() {
  const [color1, setColor1] = useState('rgba(72, 61, 139, 1)');
  const [color2, setColor2] = useState('rgba(190, 148, 232, 1)');
  const [angle, setAngle] = useState(90);
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const { toast } = useToast();

  const gradient = `${type}-gradient(${type === 'linear' ? `${angle}deg` : 'circle'}, ${color1}, ${color2})`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: 'CSS copied to clipboard.' });
  };
  
  const randomizeColors = () => {
    const randomColor1 = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
    const randomColor2 = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
    setColor1(randomColor1);
    setColor2(randomColor2);
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Gradient Generator</CardTitle>
          <CardDescription>Visually create and customize CSS gradients.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                 <Select value={type} onValueChange={(v) => setType(v as any)}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                    </SelectContent>
                </Select>
                 <Button onClick={randomizeColors} variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4"/>
                    Randomize
                </Button>
            </div>
         
            {type === 'linear' && (
                <div className="space-y-2">
                    <Label>Angle: {angle}deg</Label>
                    <Slider value={[angle]} onValueChange={(v) => setAngle(v[0])} min={0} max={360} />
                </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Color 1</Label>
                    <SketchPicker color={color1} onChangeComplete={(c) => setColor1(`rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`)} />
                </div>
                 <div>
                    <Label>Color 2</Label>
                    <SketchPicker color={color2} onChangeComplete={(c) => setColor2(`rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`)} />
                </div>
            </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Card className="h-[300px] flex items-center justify-center" style={{ background: gradient }}>
            <span className="text-primary-foreground font-bold bg-black/20 p-2 rounded-md">Preview</span>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>CSS Code</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="relative">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                        <code>background: {gradient};</code>
                    </pre>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => handleCopy(`background: ${gradient};`)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
