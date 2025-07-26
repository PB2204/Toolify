'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownAZ, ArrowUpZA, Copy, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '../ui/switch';

export default function AlphabeticalSorter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const { toast } = useToast();

  const handleSort = (direction: 'asc' | 'desc') => {
    const lines = input.split('\n');
    const sortedLines = [...lines].sort((a, b) => {
        const valA = caseSensitive ? a : a.toLowerCase();
        const valB = caseSensitive ? b : b.toLowerCase();
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    setOutput(sortedLines.join('\n'));
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: 'Copied!', description: 'Sorted text has been copied.' });
    }
  };
  
  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Alphabetical Sorter</CardTitle>
          <CardDescription>
            Sort lines of text alphabetically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="text-input">Input</Label>
              <Textarea
                id="text-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your list here, one item per line..."
                rows={10}
                className="text-base"
              />
            </div>
            <div className="relative">
              <Label htmlFor="text-output">Output</Label>
              <Textarea
                id="text-output"
                readOnly
                value={output}
                placeholder="Sorted text will appear here..."
                rows={10}
                className="bg-primary/5 border-primary/20 text-base"
              />
              {output && (
                <Button variant="ghost" size="icon" className="absolute top-8 right-2 h-7 w-7" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button onClick={() => handleSort('asc')}><ArrowDownAZ className="mr-2"/>Sort A-Z</Button>
            <Button onClick={() => handleSort('desc')}><ArrowUpZA className="mr-2"/>Sort Z-A</Button>
            <div className="flex items-center space-x-2">
              <Switch id="caseSensitive" checked={caseSensitive} onCheckedChange={setCaseSensitive} />
              <Label htmlFor="caseSensitive">Case Sensitive</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button variant="outline" onClick={handleClear} disabled={!input && !output}>
            <Trash className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}