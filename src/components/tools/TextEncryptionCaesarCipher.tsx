'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Copy, Key, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TextEncryptionCaesarCipher() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [shift, setShift] = useState(3);
  const { toast } = useToast();

  const caesarCipher = (str: string, amount: number) => {
    if (amount < 0) {
      return caesarCipher(str, amount + 26);
    }
    let result = '';
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (char.match(/[a-z]/i)) {
        let code = str.charCodeAt(i);
        if (code >= 65 && code <= 90) {
          char = String.fromCharCode(((code - 65 + amount) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          char = String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
      }
      result += char;
    }
    return result;
  };

  const handleEncrypt = () => setOutput(caesarCipher(input, shift));
  const handleDecrypt = () => setOutput(caesarCipher(input, -shift));

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
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Caesar Cipher</CardTitle>
          <CardDescription>
            Encrypt or decrypt text using a simple letter shift.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Shift Amount</Label>
              <span className="font-bold text-primary">{shift}</span>
            </div>
            <Slider value={[shift]} onValueChange={(v) => setShift(v[0])} min={1} max={25} step={1} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="text-input">Input Text</Label>
            <Textarea id="text-input" value={input} onChange={(e) => setInput(e.target.value)} rows={4} />
          </div>

           <div className="flex gap-2 justify-center">
            <Button onClick={handleEncrypt}>Encrypt</Button>
            <Button onClick={handleDecrypt} variant="secondary">Decrypt</Button>
          </div>

           <div className="relative">
              <Label htmlFor="text-output">Output</Label>
              <Textarea id="text-output" readOnly value={output} rows={4} className="bg-primary/5" />
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
