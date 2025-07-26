'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function HexDecimalConverter() {
  const [hex, setHex] = useState('FF');
  const [decimal, setDecimal] = useState('255');
  const [error, setError] = useState('');

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHex(val);
    if (!/^[0-9a-fA-F]*$/.test(val)) {
      setError('Invalid hexadecimal number.');
      setDecimal('');
    } else {
      setError('');
      setDecimal(val ? parseInt(val, 16).toString() : '');
    }
  };

  const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDecimal(val);
    const num = parseInt(val, 10);
    if (isNaN(num) && val) {
       setError('Invalid decimal number.');
       setHex('');
    } else {
       setError('');
       setHex(val ? num.toString(16).toUpperCase() : '');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Hex ↔ Decimal Converter</CardTitle>
        <CardDescription>Convert between hexadecimal and decimal number systems.</CardDescription>
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
                    placeholder="e.g. 255"
                    className="text-center text-lg"
                />
            </div>
            <ArrowRightLeft className="mx-auto my-4 md:my-0"/>
            <div className="space-y-2">
                <Label htmlFor="hex-input">Hexadecimal</Label>
                <Input
                    id="hex-input"
                    value={hex}
                    onChange={handleHexChange}
                    placeholder="e.g. FF"
                    className="text-center text-lg font-mono"
                    style={{textTransform: 'uppercase'}}
                />
            </div>
        </div>
        {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
      </CardContent>
    </Card>
  );
}
