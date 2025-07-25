'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Copy, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { jwtDecode } from 'jwt-decode';

export default function JwtDecoder() {
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const { header, payload, error } = useMemo(() => {
    if (!input.trim()) return { header: '', payload: '', error: null };
    try {
      const decodedHeader = jwtDecode(input, { header: true });
      const decodedPayload = jwtDecode(input);
      return {
        header: JSON.stringify(decodedHeader, null, 2),
        payload: JSON.stringify(decodedPayload, null, 2),
        error: null,
      };
    } catch (e: any) {
      return { header: '', payload: '', error: `Invalid JWT: ${e.message}` };
    }
  }, [input]);

  const handleCopy = (content: string) => {
    if (content) {
      navigator.clipboard.writeText(content);
      toast({ title: 'Copied!', description: 'Decoded content copied to clipboard.' });
    }
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">JWT Decoder</CardTitle>
          <CardDescription>
            Decode a JSON Web Token (JWT) to inspect its header and payload.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="jwt-input">Encoded JWT</Label>
            <Textarea
              id="jwt-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JWT here..."
              rows={6}
              className="text-base font-mono"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Invalid Token</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="jwt-header">Header (Algorithm & Token Type)</Label>
              <div className="relative">
                <Textarea
                  id="jwt-header"
                  readOnly
                  value={header}
                  placeholder="Decoded header appears here"
                  rows={8}
                  className="bg-primary/5 border-primary/20 text-sm font-mono"
                />
                {header && (
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => handleCopy(header)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="jwt-payload">Payload (Data)</Label>
              <div className="relative">
                <Textarea
                  id="jwt-payload"
                  readOnly
                  value={payload}
                  placeholder="Decoded payload appears here"
                  rows={8}
                  className="bg-primary/5 border-primary/20 text-sm font-mono"
                />
                {payload && (
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => handleCopy(payload)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
           <Button variant="outline" onClick={handleClear} disabled={!input}>
            <Trash className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </CardFooter>
      </Card>
       <p className="text-center text-sm text-muted-foreground mt-4">All decoding happens in your browser. Your JWT is never sent to our servers.</p>
    </div>
  );
}