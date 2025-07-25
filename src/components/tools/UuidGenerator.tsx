'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '../ui/switch';

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const { toast } = useToast();

  const generateUuids = () => {
    const newUuids = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids(newUuids);
  };
  
  useEffect(() => {
    generateUuids();
  }, []);

  const handleCopy = () => {
    if (uuids.length > 0) {
      navigator.clipboard.writeText(formattedUuids);
      toast({
        title: 'Copied!',
        description: `${uuids.length} UUID(s) copied to clipboard.`,
      });
    }
  };
  
  const formattedUuids = uuids
    .map(uuid => {
      let result = uuid;
      if (uppercase) result = result.toUpperCase();
      if (!hyphens) result = result.replace(/-/g, '');
      return result;
    })
    .join('\n');

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">UUID/GUID Generator</CardTitle>
          <CardDescription>
            Generate universally unique identifiers (UUIDs), also known as GUIDs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Label htmlFor="count">Count:</Label>
              <Input 
                id="count"
                type="number"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(1000, Number(e.target.value))))}
                min="1"
                max="1000"
                className="w-24"
              />
            </div>
             <div className="flex items-center space-x-2">
              <Switch id="uppercase" checked={uppercase} onCheckedChange={setUppercase} />
              <Label htmlFor="uppercase">Uppercase</Label>
            </div>
             <div className="flex items-center space-x-2">
              <Switch id="hyphens" checked={hyphens} onCheckedChange={setHyphens} />
              <Label htmlFor="hyphens">Hyphens</Label>
            </div>
            <Button onClick={generateUuids} className="sm:ml-auto">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>
          <div className="relative">
             <Textarea
              id="uuid-output"
              readOnly
              value={formattedUuids}
              placeholder="Generated UUIDs will appear here..."
              rows={10}
              className="bg-primary/5 border-primary/20 text-base font-mono"
            />
            {uuids.length > 0 && (
               <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
         <CardFooter className="flex flex-wrap gap-2 justify-end border-t pt-6">
            <span className="text-sm text-muted-foreground mr-auto">Generated {uuids.length} UUID(s).</span>
        </CardFooter>
      </Card>
    </div>
  );
}
