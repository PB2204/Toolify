'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SketchPicker, ColorResult } from 'react-color';
import { Button } from '@/components/ui/button';
import convert from 'color-convert';

export default function ColorPickerPalette() {
  const [currentColor, setCurrentColor] = useState('#6366F1');
  const [palette, setPalette] = useState<string[]>([]);
  const { toast } = useToast();

  const handleColorChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
  };
  
  const generatePalette = () => {
    const newPalette = [currentColor];
    const [h, s, l] = convert.hex.hsl(currentColor);

    for (let i = 1; i <= 4; i++) {
        const newLightness = Math.min(100, l + i * 15);
        newPalette.unshift('#' + convert.hsl.hex([h, s, newLightness]));
    }
    for (let i = 1; i <= 4; i++) {
        const newLightness = Math.max(0, l - i * 15);
        newPalette.push('#' + convert.hsl.hex([h, s, newLightness]));
    }
    
    setPalette(newPalette);
  };
  
  useState(generatePalette);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: `${text} copied to clipboard.` });
  };
  
  const colorValues = useMemo(() => {
    if (!currentColor) return null;
    const hex = currentColor;
    const rgb = convert.hex.rgb(hex).join(', ');
    const hsl = convert.hex.hsl(hex).join(', ');
    return { hex, rgb, hsl };
  }, [currentColor]);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Color Picker & Palette</CardTitle>
          <CardDescription>
            Pick a color, get its values, and generate a monochromatic palette.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center gap-4">
                 <SketchPicker
                    color={currentColor}
                    onChangeComplete={handleColorChange}
                    disableAlpha
                    width="100%"
                    className="!shadow-none !bg-transparent !p-0"
                 />
                 {colorValues && (
                    <Card className="w-full p-4 space-y-2">
                        {Object.entries(colorValues).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center text-sm">
                                <span className="font-bold uppercase">{key}:</span>
                                <span className="font-mono">{value}</span>
                                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleCopy(value)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </Card>
                 )}
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Generated Palette</h3>
                     <Button onClick={generatePalette} size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Generate
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    {palette.map((color, index) => (
                        <div key={index} className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: color }} />
                            <div className="flex-1 font-mono text-sm">{color}</div>
                            <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => handleCopy(color)}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}