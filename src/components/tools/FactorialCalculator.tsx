'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function FactorialCalculator() {
  const [number, setNumber] = useState(5);

  const result = useMemo(() => {
    if (number < 0 || !Number.isInteger(number)) {
      return 'Please enter a non-negative integer.';
    }
    if (number > 170) {
      return 'Infinity (Input too large for standard numbers)';
    }
    let f = 1;
    for (let i = 2; i <= number; i++) {
      f *= i;
    }
    return f.toExponential(5);
  }, [number]);

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Factorial Calculator</CardTitle>
          <CardDescription>Calculate the factorial of a non-negative integer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="number">Number (n)</Label>
            <Input
              id="number"
              type="number"
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
              min="0"
              step="1"
            />
          </div>
          <div className="pt-2">
            <Alert>
              <AlertTitle className="text-center">Result (n!)</AlertTitle>
              <AlertDescription className="text-center text-3xl font-bold text-primary py-2 break-all">
                {result}
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
