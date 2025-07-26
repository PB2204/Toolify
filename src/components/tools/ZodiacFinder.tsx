'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const zodiacSigns = [
  { name: 'Aries', emoji: '♈', start: '03-21', end: '04-19' },
  { name: 'Taurus', emoji: '♉', start: '04-20', end: '05-20' },
  { name: 'Gemini', emoji: '♊', start: '05-21', end: '06-20' },
  { name: 'Cancer', emoji: '♋', start: '06-21', end: '07-22' },
  { name: 'Leo', emoji: '♌', start: '07-23', end: '08-22' },
  { name: 'Virgo', emoji: '♍', start: '08-23', end: '09-22' },
  { name: 'Libra', emoji: '♎', start: '09-23', end: '10-22' },
  { name: 'Scorpio', emoji: '♏', start: '10-23', end: '11-21' },
  { name: 'Sagittarius', emoji: '♐', start: '11-22', end: '12-21' },
  { name: 'Capricorn', emoji: '♑', start: '12-22', end: '01-19' },
  { name: 'Aquarius', emoji: '♒', start: '01-20', end: '02-18' },
  { name: 'Pisces', emoji: '♓', start: '02-19', end: '03-20' },
];

export default function ZodiacFinder() {
  const [birthDate, setBirthDate] = useState(new Date().toISOString().split('T')[0]);

  const zodiacSign = useMemo(() => {
    if (!birthDate) return null;
    const [_, month, day] = birthDate.split('-').map(Number);
    const dateStr = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    const sign = zodiacSigns.find(s => {
        if (s.name === 'Capricorn') {
            return dateStr >= s.start || dateStr <= s.end;
        }
        return dateStr >= s.start && dateStr <= s.end;
    });

    return sign;
  }, [birthDate]);

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Zodiac Sign Finder</CardTitle>
          <CardDescription>Enter your birthdate to find your Western zodiac sign.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birthdate">Your Birthdate</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          {zodiacSign && (
            <div className="pt-4 text-center space-y-2 p-4 bg-primary/5 rounded-lg">
                <p className="text-7xl">{zodiacSign.emoji}</p>
                <h3 className="text-3xl font-bold text-primary">{zodiacSign.name}</h3>
                <p className="text-sm text-muted-foreground">
                    ({zodiacSign.start.replace('-', '/')} - {zodiacSign.end.replace('-', '/')})
                </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
