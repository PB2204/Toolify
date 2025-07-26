'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NameInitialsGenerator() {
  const [name, setName] = useState('Elon Reeve Musk');

  const initials = useMemo(() => {
    if (!name.trim()) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('.');
  }, [name]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Name Initials Generator</CardTitle>
        <CardDescription>Enter a full name to generate the initials.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name-input">Full Name</Label>
          <Input
            id="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., John Fitzgerald Kennedy"
          />
        </div>
        <div className="pt-2 text-center p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Initials</p>
          <p className="text-5xl font-bold text-primary py-2">{initials}</p>
        </div>
      </CardContent>
    </Card>
  );
}
