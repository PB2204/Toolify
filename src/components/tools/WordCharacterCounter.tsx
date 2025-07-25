'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash } from 'lucide-react';

type Stats = {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  lines: number;
};

export default function WordCharacterCounter() {
  const [text, setText] = useState('');

  const stats: Stats = useMemo(() => {
    if (!text) {
      return { words: 0, characters: 0, charactersNoSpaces: 0, lines: 0 };
    }
    const words = text.trim().split(/\s+/).filter(Boolean);
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const lines = text.split('\n').filter(Boolean).length;
    return {
      words: words.length,
      characters,
      charactersNoSpaces,
      lines,
    };
  }, [text]);

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Word & Character Counter</CardTitle>
          <CardDescription>
            Count words, characters, and lines in your text in real-time.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="text-input">Your Text</Label>
              <Textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here..."
                rows={10}
                className="text-base"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="text-3xl font-bold">{stats.words}</CardTitle>
                        <CardDescription>Words</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="text-3xl font-bold">{stats.characters}</CardTitle>
                        <CardDescription>Characters</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="text-3xl font-bold">{stats.charactersNoSpaces}</CardTitle>
                        <CardDescription>No Spaces</CardDescription>
                    </CardHeader>
                </Card>
                 <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="text-3xl font-bold">{stats.lines}</CardTitle>
                        <CardDescription>Lines</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </CardContent>
         <CardFooter className="flex flex-wrap gap-2 justify-end border-t pt-6">
          <Button variant="outline" onClick={handleClear} disabled={!text}>
            <Trash className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
