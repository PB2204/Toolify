'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '../ui/checkbox';

export default function TextCleaner() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [options, setOptions] = useState({
    trimLines: true,
    removeEmptyLines: true,
    removeHtmlTags: true,
    normalizeWhitespace: true,
  });
  const { toast } = useToast();

  const handleClean = () => {
    let cleanedText = input;

    if (options.trimLines) {
      cleanedText = cleanedText.split('\n').map(line => line.trim()).join('\n');
    }
    if (options.normalizeWhitespace) {
      cleanedText = cleanedText.replace(/\s+/g, ' ');
    }
    if (options.removeEmptyLines) {
      cleanedText = cleanedText.split('\n').filter(line => line.trim() !== '').join('\n');
    }
    if (options.removeHtmlTags) {
      cleanedText = cleanedText.replace(/<[^>]*>/g, '');
    }

    setOutput(cleanedText);
  };

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: 'Copied!', description: 'Cleaned text has been copied to your clipboard.' });
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
          <CardTitle className="font-headline text-2xl">Text Cleaner</CardTitle>
          <CardDescription>
            Remove extra spaces, empty lines, and HTML tags from your text.
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
                placeholder="Paste your messy text here..."
                rows={12}
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
                rows={12}
                className="bg-primary/5 border-primary/20 text-base"
              />
              {output && (
                <Button variant="ghost" size="icon" className="absolute top-8 right-2 h-7 w-7" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
           <div className="space-y-2 pt-4">
              <Label className="font-medium">Cleaning Options</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="trimLines" checked={options.trimLines} onCheckedChange={() => handleOptionChange('trimLines')} />
                  <Label htmlFor="trimLines">Trim Lines</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="removeEmptyLines" checked={options.removeEmptyLines} onCheckedChange={() => handleOptionChange('removeEmptyLines')} />
                  <Label htmlFor="removeEmptyLines">Remove Empty Lines</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="removeHtmlTags" checked={options.removeHtmlTags} onCheckedChange={() => handleOptionChange('removeHtmlTags')} />
                  <Label htmlFor="removeHtmlTags">Remove HTML Tags</Label>
                </div>
                 <div className="flex items-center space-x-2">
                  <Checkbox id="normalizeWhitespace" checked={options.normalizeWhitespace} onCheckedChange={() => handleOptionChange('normalizeWhitespace')} />
                  <Label htmlFor="normalizeWhitespace">Normalize Whitespace</Label>
                </div>
              </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 justify-between border-t pt-6">
          <Button onClick={handleClean} className="flex-1 sm:flex-none">
            <Wand2 className="mr-2 h-4 w-4" />
            Clean Text
          </Button>
          <Button variant="outline" onClick={handleClear} disabled={!input && !output}>
            <Trash className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
