'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Clock } from 'lucide-react';
import { format, parse } from 'date-fns';
import { utcToZonedTime, zonedToUtc } from 'date-fns-tz';

const timezones = Intl.supportedValuesOf('timeZone');

export default function TimezoneConverter() {
  const [sourceTime, setSourceTime] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
  const [sourceTz, setSourceTz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [targetTz, setTargetTz] = useState('UTC');
  const [targetTime, setTargetTime] = useState('');

  const convertTime = () => {
    try {
      const parsedDate = parse(sourceTime, "yyyy-MM-dd'T'HH:mm", new Date());
      if (isNaN(parsedDate.getTime())) return;

      const utcDate = zonedToUtc(parsedDate, sourceTz);
      const zonedTargetDate = utcToZonedTime(utcDate, targetTz);
      
      setTargetTime(format(zonedTargetDate, "yyyy-MM-dd HH:mm:ss zzz"));
    } catch (e) {
      console.error("Failed to convert time:", e);
    }
  };

  useEffect(() => {
    convertTime();
  }, [sourceTime, sourceTz, targetTz]);

  const handleSwap = () => {
    const tempTz = sourceTz;
    setSourceTz(targetTz);
    setTargetTz(tempTz);
  };
  
  const handleSetCurrentTime = () => {
    setSourceTime(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Timezone Converter</CardTitle>
          <CardDescription>
            Convert times between different timezones.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={handleSetCurrentTime} size="sm" variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              Use Current Time
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={sourceTz} onValueChange={setSourceTz}>
                <SelectTrigger><SelectValue placeholder="Select timezone..." /></SelectTrigger>
                <SelectContent>
                  {timezones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input type="datetime-local" value={sourceTime} onChange={(e) => setSourceTime(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>To</Label>
               <Select value={targetTz} onValueChange={setTargetTz}>
                <SelectTrigger><SelectValue placeholder="Select timezone..." /></SelectTrigger>
                <SelectContent>
                  {timezones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input readOnly value={targetTime} className="bg-primary/5 font-semibold" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
            <Button onClick={handleSwap}>Swap Timezones</Button>
        </CardFooter>
      </Card>
    </div>
  );
}