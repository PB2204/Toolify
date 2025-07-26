'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TextReverser() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleReverse = (type: 'text' | 'words') => {
    if (!input) return;
    if (type === 'text') {
      setOutput(input.split('').reverse().join(''));
    } else {
      setOutput(input.split(' ').reverse().join(' '));
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: 'Copied!', description: 'Reversed text has been copied.' });
    }
  };
  
  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Text Reverser</CardTitle>
          <CardDescription>
            Reverse your text in different ways.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="text-input">Your Text</Label>
              <Textarea
                id="text-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste or type your text here..."
                rows={8}
                className="text-base"
              />
            </div>
           <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => handleReverse('text')}>Reverse Text</Button>
                <Button onClick={() => handleReverse('words')}>Reverse Words</Button>
            </div>
             <div className="relative">
              <Label htmlFor="text-output">Reversed Text</Label>
               <Textarea
                id="text-output"
                readOnly
                value={output}
                placeholder="Reversed text will appear here..."
                rows={8}
                className="bg-primary/5 border-primary/20 text-base"
              />
              {output && (
                 <Button variant="ghost" size="icon" className="absolute top-8 right-2 h-7 w-7" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
        </CardContent>
         <CardFooter className="flex flex-wrap gap-2 justify-end border-t pt-6">
          <Button variant="outline" onClick={handleClear} disabled={!input && !output}>
            <Trash className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
