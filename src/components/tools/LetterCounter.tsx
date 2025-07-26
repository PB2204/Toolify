'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LetterCounter() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog 123!@#');

  const stats = useMemo(() => {
    const vowels = (text.match(/[aeiou]/gi) || []).length;
    const consonants = (text.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
    const numbers = (text.match(/[0-9]/g) || []).length;
    const symbols = text.length - (vowels + consonants + numbers + (text.match(/\s/g) || []).length);
    const spaces = (text.match(/\s/g) || []).length;

    return {
      vowels,
      consonants,
      numbers,
      symbols,
      spaces,
      total: text.length
    };
  }, [text]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Letter Counter</CardTitle>
          <CardDescription>
            Count vowels, consonants, numbers, and symbols in your text.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="text-input">Your Text</Label>
            <Textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste text here..."
              rows={8}
            />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{stats.vowels}</CardTitle>
            <CardDescription>Vowels</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{stats.consonants}</CardTitle>
            <CardDescription>Consonants</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{stats.numbers}</CardTitle>
            <CardDescription>Numbers</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{stats.symbols}</CardTitle>
            <CardDescription>Symbols</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{stats.spaces}</CardTitle>
            <CardDescription>Spaces</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
            <CardDescription>Total Characters</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
