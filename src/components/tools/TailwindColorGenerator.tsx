'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SketchPicker, ColorResult } from 'react-color';
import convert from 'color-convert';
import { Button } from '../ui/button';

// Based on https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
const shadeSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export default function TailwindColorGenerator() {
  const [baseColor, setBaseColor] = useState('#3b82f6'); // Tailwind's blue-500
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleColorChange = (color: ColorResult) => {
    setBaseColor(color.hex);
  };
  
  const generatePalette = (hex: string) => {
    const [h, s, l] = convert.hex.hsl(hex);
    const palette: { shade: number; hex: string }[] = [];

    shadeSteps.forEach(shade => {
        let newL;
        if (shade < 500) {
            newL = l + (100 - l) * (1 - shade / 500);
        } else if (shade > 500) {
            newL = l * (1 - (shade - 500) / 500);
        } else {
            newL = l;
        }
        
        let newS = s;
        if(shade < 500) {
            newS = s * (1 - (500 - shade) / 500 * 0.4);
        }

        const newHex = '#' + convert.hsl.hex([h, Math.min(100, newS), Math.min(100, newL)]);
        palette.push({ shade, hex: newHex });
    });

    return palette;
  };

  const palette = useMemo(() => generatePalette(baseColor), [baseColor]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: `${text} copied to clipboard.` });
  };
  
  const handleCopyAll = () => {
    const textToCopy = palette.map(p => `'${p.shade}': '${p.hex}'`).join(',\n');
    navigator.clipboard.writeText(`{\n${textToCopy}\n}`);
    toast({ title: 'Copied!', description: 'Full palette copied to clipboard.' });
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="lg:col-span-1 flex flex-col items-center">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Tailwind Color Generator</CardTitle>
                <CardDescription>
                    Pick a base color to generate a Tailwind-style palette.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isClient && (
                    <SketchPicker
                        color={baseColor}
                        onChangeComplete={handleColorChange}
                        disableAlpha
                        presetColors={['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']}
                    />
                 )}
            </CardContent>
        </Card>
      
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Generated Palette</CardTitle>
                        <Button onClick={handleCopyAll} variant="outline" size="sm">Copy All</Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-1">
                    {palette.map(({shade, hex}) => (
                        <div key={shade} className="flex items-center gap-2 group p-1 rounded-md hover:bg-muted">
                            <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: hex }} />
                            <div className="w-12 font-semibold">{shade}</div>
                            <div className="flex-1 font-mono text-sm">{hex}</div>
                            <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => handleCopy(hex)}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
