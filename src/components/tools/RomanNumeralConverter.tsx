'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const toRoman = (num: number): string => {
  if (num < 1 || num > 3999) return 'Input must be between 1 and 3999';
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syb = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let result = '';
  for (let i = 0; i < val.length; i++) {
    while (num >= val[i]) {
      result += syb[i];
      num -= val[i];
    }
  }
  return result;
};

const fromRoman = (roman: string): number | string => {
  const upperRoman = roman.toUpperCase();
  if (!/^[MDCLXVI]+$/.test(upperRoman)) return 'Invalid Roman numeral';
  
  const map: { [key: string]: number } = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
  let result = 0;
  for (let i = 0; i < upperRoman.length; i++) {
    const current = map[upperRoman[i]];
    const next = map[upperRoman[i + 1]];
    if (next > current) {
      result += next - current;
      i++;
    } else {
      result += current;
    }
  }
  // Validate conversion back to roman
  if (toRoman(result) !== upperRoman) return 'Invalid Roman numeral sequence';
  return result;
};

export default function RomanNumeralConverter() {
  const [numberInput, setNumberInput] = useState('1994');
  const [romanInput, setRomanInput] = useState('MCMXCIV');
  const [error, setError] = useState<string | null>(null);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNumberInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      const result = toRoman(num);
      setRomanInput(result);
      if (result.startsWith('Input must be')) setError(result);
      else setError(null);
    } else {
      setRomanInput('');
      if (val) setError('Invalid number');
      else setError(null);
    }
  };

  const handleRomanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRomanInput(val);
    if(val){
      const result = fromRoman(val);
      if (typeof result === 'number') {
        setNumberInput(String(result));
        setError(null);
      } else {
        setNumberInput('');
        setError(result);
      }
    } else {
        setNumberInput('');
        setError(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Roman Numeral Converter</CardTitle>
        <CardDescription>Convert numbers to Roman numerals and vice-versa.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="space-y-2">
                <Label htmlFor="number-input">Number</Label>
                <Input
                    id="number-input"
                    type="number"
                    value={numberInput}
                    onChange={handleNumberChange}
                    placeholder="e.g. 123"
                    className="text-center text-lg"
                />
            </div>
            <ArrowRightLeft className="mx-auto my-4 md:my-0"/>
            <div className="space-y-2">
                <Label htmlFor="roman-input">Roman Numeral</Label>
                <Input
                    id="roman-input"
                    value={romanInput}
                    onChange={handleRomanChange}
                    placeholder="e.g. CXXIII"
                     className="text-center text-lg font-mono"
                />
            </div>
        </div>
        {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
      </CardContent>
    </Card>
  );
}
