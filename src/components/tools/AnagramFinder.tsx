'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Very basic anagram finder logic
const findAnagrams = (word: string, dictionary: string[]) => {
    const sortedWord = word.toLowerCase().split('').sort().join('');
    return dictionary.filter(dictWord => {
        if (dictWord.length !== word.length) return false;
        return dictWord.toLowerCase().split('').sort().join('') === sortedWord;
    });
};

const simpleDictionary = ["act", "cat", "tac", "listen", "silent", "enlist", "hello", "world"];

export default function AnagramFinder() {
  const [word, setWord] = useState('cat');
  const [anagrams, setAnagrams] = useState<string[]>([]);

  const handleFind = () => {
    if (!word) {
        setAnagrams([]);
        return;
    }
    const result = findAnagrams(word, simpleDictionary);
    setAnagrams(result);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Anagram Finder</CardTitle>
        <CardDescription>
          Find anagrams for a word from a simple dictionary.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 items-end">
            <div className="grid gap-1.5 w-full">
                <Label htmlFor="word-input">Your Word</Label>
                <Input
                    id="word-input"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Enter a word..."
                />
            </div>
            <Button onClick={handleFind}>Find Anagrams</Button>
        </div>
        
        {anagrams.length > 0 && (
          <div>
            <Label>Anagrams Found:</Label>
            <div className="p-4 bg-primary/5 rounded-md text-primary font-semibold flex gap-4 flex-wrap">
              {anagrams.map((ana, index) => (
                <span key={index} className="bg-primary/10 px-3 py-1 rounded-full">{ana}</span>
              ))}
            </div>
          </div>
        )}

        {anagrams.length === 0 && (
             <div className="p-4 bg-muted/50 rounded-md text-center text-muted-foreground">
                <p>No anagrams found or input is empty.</p>
             </div>
        )}
      </CardContent>
    </Card>
  );
}
