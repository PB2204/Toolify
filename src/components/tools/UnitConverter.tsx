'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ArrowRightLeft } from 'lucide-react';

const categories = {
  length: { name: 'Length', units: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 } },
  mass: { name: 'Mass', units: { kg: 1, g: 0.001, mg: 0.000001, t: 1000, lb: 0.453592, oz: 0.0283495 } },
  temperature: { name: 'Temperature', units: { c: 'Celsius', f: 'Fahrenheit', k: 'Kelvin' } },
};

type Category = keyof typeof categories;

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>('length');
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [outputValue, setOutputValue] = useState('');

  const handleConvert = () => {
    const input = parseFloat(inputValue);
    if (isNaN(input)) {
        setOutputValue('');
        return;
    }

    let result;
    if (category === 'temperature') {
        // Temp conversion is special
        if (fromUnit === toUnit) result = input;
        else if (fromUnit === 'c' && toUnit === 'f') result = input * 9/5 + 32;
        else if (fromUnit === 'f' && toUnit === 'c') result = (input - 32) * 5/9;
        else if (fromUnit === 'c' && toUnit === 'k') result = input + 273.15;
        else if (fromUnit === 'k' && toUnit === 'c') result = input - 273.15;
        else if (fromUnit === 'f' && toUnit === 'k') result = (input - 32) * 5/9 + 273.15;
        else if (fromUnit === 'k' && toUnit === 'f') result = (input - 273.15) * 9/5 + 32;
    } else {
        const cat = categories[category];
        const baseValue = input * (cat.units as any)[fromUnit];
        result = baseValue / (cat.units as any)[toUnit];
    }
    
    setOutputValue(result !== undefined ? parseFloat(result.toFixed(5)).toString() : '');
  };

  useEffect(handleConvert, [inputValue, fromUnit, toUnit, category]);
  
  useEffect(() => {
    if (category === 'length') { setFromUnit('m'); setToUnit('ft'); }
    else if (category === 'mass') { setFromUnit('kg'); setToUnit('lb'); }
    else if (category === 'temperature') { setFromUnit('c'); setToUnit('f'); }
  }, [category]);

  const handleSwap = () => {
    const tempFrom = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempFrom);
    setInputValue(outputValue);
    handleConvert();
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Unit Converter</CardTitle>
          <CardDescription>
            Convert between different units of measurement.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(val) => setCategory(val as Category)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.keys(categories).map(cat => (
                  <SelectItem key={cat} value={cat}>{(categories as any)[cat].name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div className="space-y-2">
              <Label>From</Label>
              <div className='flex gap-2'>
                <Input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys((categories as any)[category].units).map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" onClick={handleSwap} className="self-center hidden md:flex">
              <ArrowRightLeft />
            </Button>

            <div className="space-y-2">
              <Label>To</Label>
              <div className='flex gap-2'>
                <Input readOnly value={outputValue} className="bg-primary/5 font-semibold" />
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                     {Object.keys((categories as any)[category].units).map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
            <Button onClick={handleConvert}>Convert</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
