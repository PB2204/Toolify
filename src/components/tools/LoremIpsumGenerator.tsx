'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Copy, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export default function LoremIpsumGenerator() {
  const [generatedText, setGeneratedText] = useState('');
  const [count, setCount] = useState(5);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const { toast } = useToast();

  const generateLoremIpsum = () => {
    let result = '';
    const sentences = LOREM_IPSUM.split('. ');
    const words = LOREM_IPSUM.split(' ');

    if (type === 'paragraphs') {
      result = Array(count).fill(LOREM_IPSUM).join('\n\n');
    } else if (type === 'sentences') {
      result = Array(count).fill(0).map(() => sentences[Math.floor(Math.random() * sentences.length)]).join('. ') + '.';
    } else {
      result = Array(count).fill(0).map(() => words[Math.floor(Math.random() * words.length)]).join(' ');
    }
    setGeneratedText(result);
  };

  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      toast({
        title: 'Copied!',
        description: 'Lorem Ipsum text has been copied to your clipboard.',
      });
    }
  };
  
  const handleClear = () => {
    setGeneratedText('');
    setCount(5);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Lorem Ipsum Generator</CardTitle>
          <CardDescription>
            Generate placeholder text for your designs and mockups.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
             <RadioGroup defaultValue="paragraphs" onValueChange={(value) => setType(value as any)} className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paragraphs" id="paragraphs" />
                    <Label htmlFor="paragraphs">Paragraphs</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sentences" id="sentences" />
                    <Label htmlFor="sentences">Sentences</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="words" id="words" />
                    <Label htmlFor="words">Words</Label>
                </div>
            </RadioGroup>
            <Input 
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                min="1"
                max="100"
                className="w-24"
            />
            <Button onClick={generateLoremIpsum}>Generate</Button>
          </div>
          <div className="relative">
             <Textarea
              id="lorem-ipsum-output"
              readOnly
              value={generatedText}
              placeholder="Generated text will appear here..."
              rows={12}
              className="bg-primary/5 border-primary/20 text-base"
            />
            {generatedText && (
               <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
         <CardFooter className="flex flex-wrap gap-2 justify-end border-t pt-6">
          <Button variant="outline" onClick={handleClear} disabled={!generatedText}>
            <Trash className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
