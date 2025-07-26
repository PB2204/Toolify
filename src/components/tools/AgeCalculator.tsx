'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) {
      setAge(null);
      return;
    }
    const now = new Date();
    const birth = new Date(birthDate);
    
    if (isNaN(birth.getTime()) || birth > now) {
      setAge(null);
      return;
    }

    const years = differenceInYears(now, birth);
    const months = differenceInMonths(now, birth) % 12;
    // This is a simplification, but good for most cases
    const days = differenceInDays(now, new Date(now.getFullYear(), now.getMonth(), birth.getDate())) % 30;


    setAge({ years, months, days });
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Age Calculator</CardTitle>
          <CardDescription>Enter your birthdate to calculate your age.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birthdate">Your Birthdate</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <Button onClick={calculateAge} className="w-full">Calculate Age</Button>
          {age && (
            <div className="pt-4 text-center space-y-2">
                <h3 className="text-lg font-semibold">Your Age Is</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-primary/10 rounded-lg">
                        <p className="text-4xl font-bold text-primary">{age.years}</p>
                        <p className="text-sm text-muted-foreground">Years</p>
                    </div>
                     <div className="p-4 bg-primary/10 rounded-lg">
                        <p className="text-4xl font-bold text-primary">{age.months}</p>
                        <p className="text-sm text-muted-foreground">Months</p>
                    </div>
                     <div className="p-4 bg-primary/10 rounded-lg">
                        <p className="text-4xl font-bold text-primary">{age.days}</p>
                        <p className="text-sm text-muted-foreground">Days</p>
                    </div>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
