'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
};

export default function GcdLcmCalculator() {
  const [num1, setNum1] = useState(48);
  const [num2, setNum2] = useState(18);

  const { gcdResult, lcmResult } = useMemo(() => {
    if (!Number.isInteger(num1) || !Number.isInteger(num2) || num1 <= 0 || num2 <= 0) {
        return { gcdResult: 'N/A', lcmResult: 'N/A' };
    }
    return {
        gcdResult: gcd(num1, num2).toString(),
        lcmResult: lcm(num1, num2).toString(),
    };
  }, [num1, num2]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">GCD & LCM Calculator</CardTitle>
        <CardDescription>
            Calculate the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two integers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
            <div className="w-full space-y-2">
                <Label htmlFor="num1">Number 1</Label>
                <Input
                    id="num1"
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(Number(e.target.value))}
                    min="1"
                    step="1"
                />
            </div>
            <div className="w-full space-y-2">
                <Label htmlFor="num2">Number 2</Label>
                <Input
                    id="num2"
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(Number(e.target.value))}
                    min="1"
                    step="1"
                />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
            <Alert>
              <AlertTitle className="text-center">GCD</AlertTitle>
              <AlertDescription className="text-center text-3xl font-bold text-primary py-2 break-all">
                {gcdResult}
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTitle className="text-center">LCM</AlertTitle>
              <AlertDescription className="text-center text-3xl font-bold text-primary py-2 break-all">
                {lcmResult}
              </AlertDescription>
            </Alert>
          </div>
      </CardContent>
    </Card>
  );
}
