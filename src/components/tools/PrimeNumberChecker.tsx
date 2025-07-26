'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PrimeNumberChecker() {
  const [number, setNumber] = useState(13);

  const isPrime = useMemo(() => {
    if (number <= 1 || !Number.isInteger(number)) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    for (let i = 5; i * i <= number; i = i + 6) {
      if (number % i === 0 || number % (i + 2) === 0) return false;
    }
    return true;
  }, [number]);

  return (
    <div className="max-w-md mx-auto">
        <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Prime Number Checker</CardTitle>
            <CardDescription>
            Check if a number is a prime number.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
            <Label htmlFor="text-input">Your Number</Label>
            <Input
                id="text-input"
                type="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
                placeholder="Enter a number..."
                className="text-base"
                step="1"
            />
            </div>
            
            <Alert variant={isPrime ? 'default' : 'destructive'} className={isPrime ? 'border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600' : ''}>
                {isPrime ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <AlertTitle>{number} is {isPrime ? 'a Prime Number' : 'Not a Prime Number'}</AlertTitle>
                <AlertDescription>
                    {isPrime ? 'A prime number is only divisible by 1 and itself.' : 'A prime number must be a whole number greater than 1, divisible only by 1 and itself.'}
                </AlertDescription>
            </Alert>
        </CardContent>
        </Card>
    </div>
  );
}
