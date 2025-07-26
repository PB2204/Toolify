'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { intervalToDuration } from 'date-fns';

export default function CalendarEventCountdown() {
  const [targetDate, setTargetDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 16);
  });
  const [eventName, setEventName] = useState<string>('New Year\'s Day');
  const [countdown, setCountdown] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDate);
      if (target > now) {
        const duration = intervalToDuration({ start: now, end: target });
        setCountdown({
          days: duration.days || 0,
          hours: duration.hours || 0,
          minutes: duration.minutes || 0,
          seconds: duration.seconds || 0,
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Event Countdown Timer</CardTitle>
          <CardDescription>Set a future date and time to count down to.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="space-y-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input
                id="event-name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g., My Birthday"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-date">Event Date & Time</Label>
              <Input
                id="target-date"
                type="datetime-local"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-primary">{eventName}</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-4xl font-bold">{countdown.days}</p>
                <p className="text-sm text-muted-foreground">Days</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-4xl font-bold">{countdown.hours}</p>
                <p className="text-sm text-muted-foreground">Hours</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-4xl font-bold">{countdown.minutes}</p>
                <p className="text-sm text-muted-foreground">Minutes</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-4xl font-bold">{countdown.seconds}</p>
                <p className="text-sm text-muted-foreground">Seconds</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}