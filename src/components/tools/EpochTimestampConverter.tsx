'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft, Clock, Copy, ArrowLeftRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, fromUnixTime, getUnixTime } from 'date-fns';

export default function EpochTimestampConverter() {
  const [timestamp, setTimestamp] = useState<string>(() => Math.floor(Date.now() / 1000).toString());
  const [dateTime, setDateTime] = useState<string>(() => format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"));
  const [utcDate, setUtcDate] = useState('');
  const [localDate, setLocalDate] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    try {
      const date = fromUnixTime(Number(timestamp));
      if (!isNaN(date.getTime())) {
          setDateTime(format(date, "yyyy-MM-dd'T'HH:mm:ss"));
          setUtcDate(date.toUTCString());
          setLocalDate(date.toLocaleString());
      }
    } catch (e) {}
  }, [timestamp]);

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimestamp(e.target.value);
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateTime = e.target.value;
    setDateTime(newDateTime);
    try {
      const date = new Date(newDateTime);
      if (!isNaN(date.getTime())) {
        setTimestamp(getUnixTime(date).toString());
      }
    } catch(e) {}
  };

  const setCurrentTime = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString());
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: 'Value copied to clipboard.' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Epoch & Unix Timestamp Converter</CardTitle>
          <CardDescription>
            Convert between Unix timestamps and human-readable dates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button onClick={setCurrentTime} className="w-full">
            <Clock className="mr-2 h-4 w-4" />
            Use Current Time
          </Button>

          <div className="space-y-2">
            <Label htmlFor="timestamp">Unix Timestamp (seconds)</Label>
            <div className="relative">
              <Input id="timestamp" value={timestamp} onChange={handleTimestampChange} />
              <Button variant="ghost" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-7 w-7" onClick={() => handleCopy(timestamp)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center text-muted-foreground">
             <ArrowLeftRight/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="datetime-local">Human-Readable Date (Your Timezone)</Label>
            <div className="relative">
              <Input id="datetime-local" type="datetime-local" value={dateTime} onChange={handleDateTimeChange} step="1" />
            </div>
          </div>
          
           {utcDate && (
             <Card className="bg-muted/50 p-4">
                <CardContent className="space-y-3 p-0">
                    <h3 className="font-semibold text-center mb-3">Converted Dates</h3>
                     <div className="space-y-2">
                        <Label>GMT (UTC)</Label>
                        <div className="relative">
                        <Input readOnly value={utcDate} className="bg-background"/>
                         <Button variant="ghost" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-7 w-7" onClick={() => handleCopy(utcDate)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Your Timezone</Label>
                         <div className="relative">
                        <Input readOnly value={localDate} className="bg-background"/>
                        <Button variant="ghost" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-7 w-7" onClick={() => handleCopy(localDate)}>
                            <Copy className="h-4 w-4" />
                        </Button>
                        </div>
                    </div>
                </CardContent>
             </Card>
           )}

        </CardContent>
      </Card>
    </div>
  );
}