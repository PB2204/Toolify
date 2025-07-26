'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatISO } from 'date-fns';

export default function IsoDateFormatter() {
  const [date, setDate] = useState<Date>(() => new Date());
  const [isoString, setIsoString] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    try {
      setIsoString(formatISO(date));
    } catch (e) {
      setIsoString('Invalid Date');
    }
  }, [date]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newDate = new Date(e.target.value);
      if (!isNaN(newDate.getTime())) {
        setDate(newDate);
      }
    } catch(e) {}
  };

  const setCurrentTime = () => {
    setDate(new Date());
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: 'ISO string copied to clipboard.' });
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">ISO 8601 Date Formatter</CardTitle>
          <CardDescription>
            Convert a date and time to the ISO 8601 format.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button onClick={setCurrentTime} className="w-full">
            <Clock className="mr-2 h-4 w-4" />
            Use Current Time
          </Button>

          <div className="space-y-2">
            <Label htmlFor="datetime-local">Select Date and Time</Label>
            <Input 
              id="datetime-local"
              type="datetime-local"
              value={date.toISOString().substring(0, 16)}
              onChange={handleDateChange}
              step="1"
            />
          </div>
          
           {isoString && (
             <div className="space-y-2">
                <Label>ISO 8601 String (UTC)</Label>
                <div className="relative">
                <Input readOnly value={isoString} className="bg-primary/5 font-mono"/>
                 <Button variant="ghost" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-7 w-7" onClick={() => handleCopy(isoString)}>
                    <Copy className="h-4 w-4" />
                </Button>
                </div>
            </div>
           )}

        </CardContent>
      </Card>
    </div>
  );
}
