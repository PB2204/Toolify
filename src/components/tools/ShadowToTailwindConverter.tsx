'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

// Simplified mapping
const shadowMap: { [key: string]: string } = {
  '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)': 'shadow',
  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)': 'shadow-md',
  '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)': 'shadow-lg',
  '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)': 'shadow-xl',
  '0 25px 50px -12px rgb(0 0 0 / 0.25)': 'shadow-2xl',
  'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)': 'shadow-inner',
};

export default function ShadowToTailwindConverter() {
  const [css, setCss] = useState('0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)');
  const [tailwind, setTailwind] = useState('shadow-lg');
  const { toast } = useToast();

  const handleConvert = (value: string) => {
    setCss(value);
    const normalizedValue = value.replace(/,\s*/g, ', ').trim();
    const match = shadowMap[normalizedValue];
    setTailwind(match || 'custom (no direct match)');
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(tailwind);
    toast({ title: 'Copied!', description: 'Tailwind class copied.' });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">CSS Shadow to Tailwind</CardTitle>
          <CardDescription>Convert common CSS box-shadow values to Tailwind CSS classes. Note: This tool only supports exact matches to default Tailwind shadows.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="css-input">CSS box-shadow</Label>
            <Input id="css-input" value={css} onChange={e => handleConvert(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Tailwind Class</Label>
            <div className="relative">
              <Input readOnly value={tailwind} className="bg-muted font-mono" />
              <Button variant="ghost" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-7 w-7" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
