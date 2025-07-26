'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CaseCounter() {
  const [text, setText] = useState('Hello World! THIS IS A TEST.');

  const stats = useMemo(() => {
    const upper = (text.match(/[A-Z]/g) || []).length;
    const lower = (text.match(/[a-z]/g) || []).length;
    const numbers = (text.match(/[0-9]/g) || []).length;
    const symbols = text.length - (upper + lower + numbers);
    return { upper, lower, numbers, symbols, total: text.length };
  }, [text]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Case Counter</CardTitle>
          <CardDescription>
            Count the number of uppercase, lowercase, number, and symbol characters in your text.
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
            <CardTitle className="text-3xl">{stats.upper}</CardTitle>
            <CardDescription>Uppercase</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{stats.lower}</CardTitle>
            <CardDescription>Lowercase</CardDescription>
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
         <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
            <CardDescription>Total Characters</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
