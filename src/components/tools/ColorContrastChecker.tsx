'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, X } from 'lucide-react';

// Function to parse hex color and return RGB values
const parseHex = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

// Function to calculate luminance
const getLuminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// Function to calculate contrast ratio
const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = parseHex(color1);
  const rgb2 = parseHex(color2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);

  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};

export default function ColorContrastChecker() {
  const [color1, setColor1] = useState('#ffffff');
  const [color2, setColor2] = useState('#483d8b');

  const contrastRatio = getContrastRatio(color1, color2);
  const aaPass = contrastRatio >= 4.5;
  const aaaPass = contrastRatio >= 7;

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Color Contrast Checker</CardTitle>
          <CardDescription>
            Check if your color combinations meet WCAG accessibility standards.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color1">Text Color</Label>
              <Input id="color1" type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="h-12" />
              <Input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color2">Background Color</Label>
              <Input id="color2" type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="h-12" />
              <Input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} />
            </div>
          </div>
          
          <div className="p-8 rounded-lg text-center" style={{ backgroundColor: color2, color: color1 }}>
            <h3 className="text-3xl font-bold">Preview Text</h3>
            <p>This is how your text will look on the background.</p>
          </div>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-center">Contrast Ratio: {contrastRatio.toFixed(2)}:1</CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-2 gap-4">
              <div className={`flex items-center justify-center p-4 rounded-md ${aaPass ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}`}>
                {aaPass ? <Check className="mr-2" /> : <X className="mr-2" />}
                <span className="font-bold">AA: {aaPass ? 'Pass' : 'Fail'}</span>
              </div>
              <div className={`flex items-center justify-center p-4 rounded-md ${aaaPass ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}`}>
                {aaaPass ? <Check className="mr-2" /> : <X className="mr-2" />}
                <span className="font-bold">AAA: {aaaPass ? 'Pass' : 'Fail'}</span>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
