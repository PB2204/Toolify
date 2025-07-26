'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function WhitespaceRemover() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleRemoveWhitespace = () => {
    setOutput(input.replace(/\s+/g, ' ').trim());
  };

  const handleRemoveAllWhitespace = () => {
    setOutput(input.replace(/\s/g, ''));
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
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Whitespace Remover</CardTitle>
          <CardDescription>
            Remove unnecessary spaces and line breaks from your text.
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
                placeholder="Paste text with extra spaces here..."
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
                placeholder="Cleaned text will appear here..."
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
          <div className="flex gap-2 justify-center">
            <Button onClick={handleRemoveWhitespace}>Trim & Normalize Spaces</Button>
            <Button onClick={handleRemoveAllWhitespace} variant="secondary">Remove All Spaces</Button>
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
