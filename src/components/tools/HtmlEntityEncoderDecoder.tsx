'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft, Copy, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import he from 'he';

export default function HtmlEntityEncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      setOutput(he.encode(input, { 'useNamedReferences': true }));
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not encode the input.' });
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(he.decode(input));
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not decode the input.' });
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
          <CardTitle className="font-headline text-2xl">HTML Entity Encoder / Decoder</CardTitle>
          <CardDescription>
            Encode special characters to HTML entities or decode them back.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="text-input">Input</Label>
            <Textarea
              id="text-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., <p>Hello & welcome!</p> or &lt;p&gt;Hello &amp; welcome!&lt;/p&gt;"
              rows={8}
              className="text-base"
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button onClick={handleEncode} className="flex-1">Encode</Button>
            <ArrowRightLeft className="text-muted-foreground" />
            <Button onClick={handleDecode} className="flex-1">Decode</Button>
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
