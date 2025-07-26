'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft, Copy, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TextToBinaryConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      const binary = input
        .split('')
        .map(char => {
          return char.charCodeAt(0).toString(2).padStart(8, '0');
        })
        .join(' ');
      setOutput(binary);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not encode the text.' });
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      const text = input
        .split(' ')
        .map(binaryChar => {
          return String.fromCharCode(parseInt(binaryChar, 2));
        })
        .join('');
      setOutput(text);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Invalid binary string for decoding.' });
      setOutput('');
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: 'Copied!', description: 'Output has been copied.' });
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
          <CardTitle className="font-headline text-2xl">Text ↔ Binary Converter</CardTitle>
          <CardDescription>
            Convert text to binary strings and back.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="text-input">Input (Text or Binary)</Label>
            <Textarea
              id="text-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., Hello World or 01001000 01100101..."
              rows={8}
              className="text-base"
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button onClick={handleEncode} className="flex-1">Text to Binary</Button>
            <ArrowRightLeft className="text-muted-foreground" />
            <Button onClick={handleDecode} className="flex-1">Binary to Text</Button>
          </div>
          <div className="relative">
            <Label htmlFor="text-output">Output</Label>
            <Textarea
              id="text-output"
              readOnly
              value={output}
              placeholder="Result will appear here..."
              rows={8}
              className="bg-primary/5 border-primary/20 text-base font-mono"
            />
            {output && (
              <Button variant="ghost" size="icon" className="absolute top-8 right-2 h-7 w-7" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            )}
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
