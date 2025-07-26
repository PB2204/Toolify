'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PinGenerator() {
  const [pin, setPin] = useState('');
  const [length, setLength] = useState(4);
  const { toast } = useToast();

  const generatePin = () => {
    let newPin = '';
    const digits = '0123456789';
    for (let i = 0; i < length; i++) {
      newPin += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    setPin(newPin);
  };

  useEffect(generatePin, [length]);

  const handleCopy = () => {
    if (pin) {
      navigator.clipboard.writeText(pin);
      toast({ title: 'Copied!', description: 'PIN copied to clipboard.' });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">PIN Generator</CardTitle>
          <CardDescription>
            Create a random numeric PIN.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Input 
              type="text"
              readOnly
              value={pin}
              className="pr-10 h-16 text-4xl font-mono text-center tracking-[.5em]"
              style={{ letterSpacing: '0.5em' }}
            />
             <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8" onClick={handleCopy}>
                <Copy className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <Label htmlFor="length" className="text-base">PIN Length</Label>
                <span className="font-bold text-lg">{length}</span>
            </div>
            <Slider
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              min={4}
              max={8}
              step={1}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button onClick={generatePin} className="w-full" size="lg">
            <RefreshCw className="mr-2" />
            Generate New PIN
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
