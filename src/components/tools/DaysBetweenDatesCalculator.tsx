'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { differenceInDays } from 'date-fns';
import { Calendar } from '../ui/calendar';

export default function DaysBetweenDatesCalculator() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  });

  const daysDifference =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Days Between Dates Calculator</CardTitle>
          <CardDescription>
            Select a start and end date to calculate the difference in days.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 text-center">
                    <Label>Start Date</Label>
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} className="rounded-md border"/>
                </div>
                <div className="space-y-2 text-center">
                    <Label>End Date</Label>
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} className="rounded-md border"/>
                </div>
            </div>
            
            <div className="pt-4 text-center space-y-2 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">Difference</p>
                <p className="text-4xl font-bold text-primary">{daysDifference} days</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
