'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

function convertGroup(n: number): string {
    let str = "";
    if (n >= 100) {
        str += ones[Math.floor(n / 100)] + " hundred ";
        n %= 100;
    }
    if (n >= 10 && n <= 19) {
        str += teens[n - 10] + " ";
    } else {
        if (n >= 20) {
            str += tens[Math.floor(n / 10)] + " ";
            n %= 10;
        }
        if (n >= 1) {
            str += ones[n] + " ";
        }
    }
    return str;
}

function numberToWords(num: number): string {
    if (num === 0) return "zero";
    if (num > 999999999999) return "Number too large";
    
    const billions = Math.floor(num / 1000000000);
    const millions = Math.floor((num % 1000000000) / 1000000);
    const thousands = Math.floor((num % 1000000) / 1000);
    const remainder = num % 1000;

    let result = "";
    if (billions) result += convertGroup(billions) + "billion ";
    if (millions) result += convertGroup(millions) + "million ";
    if (thousands) result += convertGroup(thousands) + "thousand ";
    if (remainder) result += convertGroup(remainder);

    return result.trim().replace(/\s+/g, ' ');
}


export default function NumberToWordsConverter() {
  const [number, setNumber] = useState(12345);

  const words = useMemo(() => {
    if (isNaN(number)) return 'Invalid number';
    return numberToWords(number);
  }, [number]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Number to Words Converter</CardTitle>
        <CardDescription>Convert a number into its English words representation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="number">Number</Label>
          <Input
            id="number"
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="pt-2">
          <Alert>
            <AlertTitle className="text-center">In Words</AlertTitle>
            <AlertDescription className="text-center text-xl font-semibold text-primary py-2 capitalize">
              {words}
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}
