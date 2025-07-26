'use client'

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Copy, Wand2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';

const ASCII_CHARS = '@%#*+=-:. ';

export default function AsciiArtGenerator() {
  const [text, setText] = useState('Toolify');
  const [asciiArt, setAsciiArt] = useState('');
  const [fontSize, setFontSize] = useState(60);
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateAscii = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    
    // Set canvas dimensions
    canvas.width = 400;
    canvas.height = 100;
    
    // Style text
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.font = `bold ${fontSize}px sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    // Get image data
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;
    
    let art = '';
    for (let y = 0; y < height; y += 4) { // Step y to reduce rows
      for (let x = 0; x < width; x += 2) { // Step x to reduce columns
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];
        
        if (a > 128) { // Only consider non-transparent pixels
            const grayscale = 0.299 * r + 0.587 * g + 0.114 * b;
            const charIndex = Math.floor((grayscale / 255) * (ASCII_CHARS.length - 1));
            art += ASCII_CHARS[ASCII_CHARS.length - 1 - charIndex];
        } else {
            art += ' ';
        }
      }
      art += '\n';
    }
    setAsciiArt(art);
  };
  
  useEffect(generateAscii, [text, fontSize]);

  const handleCopy = () => {
    if (asciiArt) {
      navigator.clipboard.writeText(asciiArt);
      toast({ title: 'Copied!', description: 'ASCII art copied to clipboard.' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">ASCII Art Generator</CardTitle>
                <CardDescription>Convert your text into ASCII art.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid gap-2">
                    <Label htmlFor="text-input">Your Text</Label>
                    <Input id="text-input" value={text} onChange={(e) => setText(e.target.value)} />
                 </div>
                 <div className="grid gap-2">
                    <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                    <Input id="font-size" type="range" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} min="20" max="100" />
                 </div>
                <div className="relative">
                    <Label>Generated ASCII Art</Label>
                    <Textarea 
                        readOnly 
                        value={asciiArt} 
                        rows={12} 
                        className="font-mono text-xs bg-muted whitespace-pre leading-tight" 
                    />
                    <Button variant="ghost" size="icon" className="absolute top-8 right-2 h-7 w-7" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-6">
                 <Button onClick={generateAscii}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Regenerate
                 </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
