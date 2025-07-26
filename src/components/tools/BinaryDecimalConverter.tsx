'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function BinaryDecimalConverter() {
  const [binary, setBinary] = useState('1010');
  const [decimal, setDecimal] = useState('10');
  const [error, setError] = useState('');

  const handleBinaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBinary(val);
    if (!/^[01]*$/.test(val)) {
      setError('Invalid binary number. Only 0 and 1 are allowed.');
      setDecimal('');
    } else {
      setError('');
      setDecimal(val ? parseInt(val, 2).toString() : '');
    }
  };

  const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDecimal(val);
    const num = parseInt(val, 10);
    if (isNaN(num) && val) {
       setError('Invalid decimal number.');
       setBinary('');
    } else {
       setError('');
       setBinary(val ? num.toString(2) : '');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Binary ↔ Decimal Converter</CardTitle>
        <CardDescription>Convert between binary and decimal number systems.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="space-y-2">
                <Label htmlFor="decimal-input">Decimal</Label>
                <Input
                    id="decimal-input"
                    type="number"
                    value={decimal}
                    onChange={handleDecimalChange}
                    placeholder="e.g. 10"
                    className="text-center text-lg"
                />
            </div>
            <ArrowRightLeft className="mx-auto my-4 md:my-0"/>
            <div className="space-y-2">
                <Label htmlFor="binary-input">Binary</Label>
                <Input
                    id="binary-input"
                    value={binary}
                    onChange={handleBinaryChange}
                    placeholder="e.g. 1010"
                    className="text-center text-lg font-mono"
                />
            </div>
        </div>
        {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
      </CardContent>
    </Card>
  );
}
