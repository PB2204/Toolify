'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createHash } from 'crypto';

type HashType = 'md5' | 'sha1' | 'sha256' | 'sha512';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const hashes = useMemo(() => {
    if (!input) return {};
    const algorithms: HashType[] = ['md5', 'sha1', 'sha256', 'sha512'];
    const result: { [key in HashType]?: string } = {};
    for (const algo of algorithms) {
      result[algo] = createHash(algo).update(input).digest('hex');
    }
    return result;
  }, [input]);

  const handleCopy = (text: string | undefined) => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: 'Hash has been copied to your clipboard.',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Hash Generator</CardTitle>
          <CardDescription>
            Generate MD5, SHA1, SHA256, and SHA512 hashes from your text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="text-input">Your Text</Label>
            <Textarea
              id="text-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or type your text here to generate hashes..."
              rows={6}
              className="text-base"
            />
          </div>
          <div className="space-y-4">
            {Object.entries(hashes).map(([algo, hash]) => (
              <div key={algo} className="grid gap-2">
                <Label htmlFor={`hash-${algo}`} className="uppercase">{algo}</Label>
                <div className="relative">
                  <Input
                    id={`hash-${algo}`}
                    readOnly
                    value={hash}
                    className="bg-primary/5 border-primary/20 font-mono text-sm"
                    placeholder={`${algo} hash will appear here...`}
                  />
                  <Button variant="ghost" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-7 w-7" onClick={() => handleCopy(hash)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
