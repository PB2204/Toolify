'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash, FlipHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mirrorMap: { [key: string]: string } = {
    'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'Ꮈ', 'g': 'ǫ', 'h': 'ʜ', 'i': 'i', 'j': 'ꞁ', 'k': 'ʞ', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'q', 'q': 'p', 'r': 'ɿ', 's': 's', 't': 'ƚ', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y', 'z': 'z',
    'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'Ǝ', 'F': 'F', 'G': 'G', 'H': 'H', 'I': 'I', 'J': 'L', 'K': 'K', 'L': 'J', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'Я', 'S': 'S', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z'
};


export default function MirrorTextGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleMirror = () => {
    const reversed = input.split('').reverse().join('');
    const mirrored = reversed.split('').map(char => mirrorMap[char] || char).join('');
    setOutput(mirrored);
  };
  
  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: 'Copied!', description: 'Mirrored text has been copied.' });
    }
  };
  
  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Mirror Text Generator</CardTitle>
          <CardDescription>
            Flip and mirror your text horizontally. Note: Not all characters have a mirrored equivalent.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="text-input">Your Text</Label>
              <Textarea
                id="text-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type text to mirror..."
                rows={4}
                className="text-base"
              />
            </div>
            
            <Button onClick={handleMirror} className="w-full"><FlipHorizontal className="mr-2"/>Mirror Text</Button>

            <div className="relative">
              <Label htmlFor="text-output">Mirrored Text</Label>
               <Textarea
                id="text-output"
                readOnly
                value={output}
                placeholder="ɈxɘT bɘɿoɿɿiM"
                rows={4}
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
