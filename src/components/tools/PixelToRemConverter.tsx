'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PixelToRemConverter() {
  const [pixels, setPixels] = useState('16');
  const [rems, setRems] = useState('1');
  const [baseSize, setBaseSize] = useState(16);

  const handlePixelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPixels(val);
    const num = parseFloat(val);
    if (!isNaN(num) && baseSize > 0) {
      setRems((num / baseSize).toString());
    } else {
      setRems('');
    }
  };

  const handleRemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRems(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setPixels((num * baseSize).toString());
    } else {
      setPixels('');
    }
  };
  
  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setBaseSize(val);
    const num = parseFloat(pixels);
     if (!isNaN(num) && val > 0) {
      setRems((num / val).toString());
    } else {
      setRems('');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Pixel ↔ REM Converter</CardTitle>
        <CardDescription>Convert between px and rem units based on a root font size.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="base-size">Base Font Size (px)</Label>
          <Input id="base-size" type="number" value={baseSize} onChange={handleBaseChange} className="w-32" />
        </div>
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="space-y-2">
                <Label htmlFor="pixels-input">Pixels (px)</Label>
                <Input
                    id="pixels-input"
                    type="number"
                    value={pixels}
                    onChange={handlePixelChange}
                    placeholder="e.g. 16"
                    className="text-center text-lg"
                />
            </div>
            <ArrowRightLeft className="mx-auto my-4 md:my-0"/>
            <div className="space-y-2">
                <Label htmlFor="rem-input">REMs</Label>
                <Input
                    id="rem-input"
                    type="number"
                    value={rems}
                    onChange={handleRemChange}
                    placeholder="e.g. 1"
                    className="text-center text-lg"
                />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
