'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

export default function DateToDayFinder() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const dayOfWeek = useMemo(() => {
    if (!date) return '';
    try {
      return format(new Date(date), 'EEEE');
    } catch {
      return 'Invalid Date';
    }
  }, [date]);

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Date to Day Finder</CardTitle>
          <CardDescription>Find the day of the week for any given date.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date-input">Select a Date</Label>
            <Input
              id="date-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {date && (
            <div className="pt-4 text-center space-y-2 p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Day of the week is</p>
              <p className="text-4xl font-bold text-primary">{dayOfWeek}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
