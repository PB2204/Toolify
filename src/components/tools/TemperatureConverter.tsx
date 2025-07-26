'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type TempUnit = 'celsius' | 'fahrenheit' | 'kelvin';

export default function TemperatureConverter() {
  const [temp, setTemp] = useState<number | string>(10);
  const [unit, setUnit] = useState<TempUnit>('celsius');
  const [temps, setTemps] = useState({ celsius: 10, fahrenheit: 50, kelvin: 283.15 });

  const handleTempChange = (value: number | string, fromUnit: TempUnit) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) {
        setTemp(value);
        return;
    };
    
    setTemp(numValue);
    setUnit(fromUnit);

    let c, f, k;

    if (fromUnit === 'celsius') {
        c = numValue;
        f = c * 9/5 + 32;
        k = c + 273.15;
    } else if (fromUnit === 'fahrenheit') {
        f = numValue;
        c = (f - 32) * 5/9;
        k = c + 273.15;
    } else { // Kelvin
        k = numValue;
        c = k - 273.15;
        f = c * 9/5 + 32;
    }

    setTemps({
        celsius: parseFloat(c.toFixed(2)),
        fahrenheit: parseFloat(f.toFixed(2)),
        kelvin: parseFloat(k.toFixed(2)),
    });
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Temperature Converter</CardTitle>
          <CardDescription>Convert between Celsius, Fahrenheit, and Kelvin.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="celsius">Celsius (°C)</Label>
                <Input id="celsius" type="number" value={temps.celsius} onChange={e => handleTempChange(e.target.value, 'celsius')} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="fahrenheit">Fahrenheit (°F)</Label>
                <Input id="fahrenheit" type="number" value={temps.fahrenheit} onChange={e => handleTempChange(e.target.value, 'fahrenheit')} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="kelvin">Kelvin (K)</Label>
                <Input id="kelvin" type="number" value={temps.kelvin} onChange={e => handleTempChange(e.target.value, 'kelvin')} />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}