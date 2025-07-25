'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash, ArrowDown, Pilcrow, CaseUpper, CaseLower, CaseSensitive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { toTitleCase, toSentenceCase } from '@/lib/text-utils';

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleConvert = (type: 'upper' | 'lower' | 'title' | 'sentence') => {
    if (!input) return;
    switch (type) {
      case 'upper':
        setOutput(input.toUpperCase());
        break;
      case 'lower':
        setOutput(input.toLowerCase());
        break;
      case 'title':
        setOutput(toTitleCase(input));
        break;
      case 'sentence':
        setOutput(toSentenceCase(input));
        break;
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({
        title: 'Copied!',
        description: 'Converted text has been copied to your clipboard.',
      });
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
          <CardTitle className="font-headline text-2xl">Case Converter</CardTitle>
          <CardDescription>
            Convert your text into different case formats quickly and easily.
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
           <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button onClick={() => handleConvert('upper')}><CaseUpper className="mr-2"/>UPPER CASE</Button>
                <Button onClick={() => handleConvert('lower')}><CaseLower className="mr-2"/>lower case</Button>
                <Button onClick={() => handleConvert('title')}><CaseSensitive className="mr-2"/>Title Case</Button>
                <Button onClick={() => handleConvert('sentence')}><Pilcrow className="mr-2"/>Sentence case</Button>
            </div>
             <div className="relative">
              <Label htmlFor="text-output">Converted Text</Label>
               <Textarea
                id="text-output"
                readOnly
                value={output}
                placeholder="Converted text will appear here..."
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
