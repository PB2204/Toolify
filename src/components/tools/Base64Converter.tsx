'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft, Copy, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Base64Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      setOutput(btoa(input));
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Invalid input for Base64 encoding.' });
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(atob(input));
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Invalid Base64 string for decoding.' });
      setOutput('');
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: 'Copied!', description: 'Output has been copied to your clipboard.' });
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
          <CardTitle className="font-headline text-2xl">Base64 Encoder / Decoder</CardTitle>
          <CardDescription>
            Encode your text to Base64 or decode a Base64 string back to text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="text-input">Input</Label>
            <Textarea
              id="text-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or type text or Base64 here..."
              rows={8}
              className="text-base"
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button onClick={handleEncode} className="flex-1">Encode to Base64</Button>
            <ArrowRightLeft className="text-muted-foreground" />
            <Button onClick={handleDecode} className="flex-1">Decode from Base64</Button>
          </div>
          <div className="relative">
            <Label htmlFor="text-output">Output</Label>
            <Textarea
              id="text-output"
              readOnly
              value={output}
              placeholder="Result will appear here..."
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
