'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { intervalToDuration, formatDuration } from 'date-fns';

export default function TimeElapsedCounter() {
  const [startDate, setStartDate] = useState<string>(() => new Date(Date.now() - 3600 * 1000 * 24).toISOString().slice(0, 16));
  const [elapsed, setElapsed] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(startDate);
      if (start < now) {
        const duration = intervalToDuration({ start, end: now });
        setElapsed(formatDuration(duration, {
          format: ['years', 'months', 'days', 'hours', 'minutes', 'seconds'],
        }));
      } else {
        setElapsed('The selected date is in the future.');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Time Elapsed Counter</CardTitle>
          <CardDescription>See how much time has passed since a specific date and time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date & Time</Label>
            <Input
              id="start-date"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          {elapsed && (
            <div className="pt-4 text-center space-y-2 p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Time Elapsed</p>
              <p className="text-2xl font-bold text-primary">{elapsed}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
