'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const emojiMap: { [key: string]: string } = {
  a: '🅰️', b: '🅱️', c: '©️', d: '↩️', e: '📧', f: '🎏', g: '🌀', h: '🏨', i: 'ℹ️',
  j: '🗾', k: '🎋', l: '👢', m: 'Ⓜ️', n: '♑', o: '🅾️', p: '🅿️', q: '♌', r: '®️',
  s: '💲', t: '✝️', u: '⛎', v: '♈', w: '〰️', x: '❌', y: '💹', z: '💤',
  '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣', '4': '4️⃣', '5': '5️⃣', 
  '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣', '!': '❗', '?': '❓', ' ': '  '
};


export default function TextToEmojiConverter() {
  const [input, setInput] = useState('Hello World');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleConvert = () => {
    const converted = input
      .toLowerCase()
      .split('')
      .map(char => emojiMap[char] || char)
      .join('');
    setOutput(converted);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: 'Copied!', description: 'Emoji text has been copied.' });
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
          <CardTitle className="font-headline text-2xl">Text to Emoji Converter</CardTitle>
          <CardDescription>
            Convert your text into a sequence of emojis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="text-input">Your Text</Label>
              <Textarea
                id="text-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type text to convert..."
                rows={4}
                className="text-base"
              />
            </div>
            
            <Button onClick={handleConvert} className="w-full"><Wand2 className="mr-2"/>Convert to Emoji</Button>

            <div className="relative">
              <Label htmlFor="text-output">Emoji Text</Label>
               <Textarea
                id="text-output"
                readOnly
                value={output}
                placeholder="📧Ⓜ️🅾️🗾ℹ️  ✝️📧❌✝️"
                rows={4}
                className="bg-primary/5 border-primary/20 text-2xl"
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
