'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '../ui/switch';

export default function DuplicateLineRemover() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const { toast } = useToast();

  const handleRemoveDuplicates = () => {
    const lines = input.split('\n');
    const seen = new Set();
    const uniqueLines = lines.filter(line => {
        const processedLine = caseSensitive ? line : line.toLowerCase();
        if (seen.has(processedLine)) {
            return false;
        } else {
            seen.add(processedLine);
            return true;
        }
    });
    setOutput(uniqueLines.join('\n'));
    toast({ title: 'Success!', description: `${lines.length - uniqueLines.length} duplicate lines removed.` });
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: 'Copied!', description: 'Cleaned text has been copied.' });
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
          <CardTitle className="font-headline text-2xl">Duplicate Line Remover</CardTitle>
          <CardDescription>
            Remove duplicate lines from a block of text.
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
                placeholder="Paste your list here..."
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
                placeholder="Unique lines will appear here..."
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
           <div className="flex items-center space-x-2 pt-4">
              <Switch id="caseSensitive" checked={caseSensitive} onCheckedChange={setCaseSensitive} />
              <Label htmlFor="caseSensitive">Case Sensitive</Label>
            </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 justify-between border-t pt-6">
          <Button onClick={handleRemoveDuplicates} disabled={!input}>
            <Wand2 className="mr-2 h-4 w-4" />
            Remove Duplicates
          </Button>
          <Button variant="outline" onClick={handleClear} disabled={!input && !output}>
            <Trash className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}