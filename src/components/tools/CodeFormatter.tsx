'use client';

// Note: This is a simplified version using JSON.parse for formatting.
// A true multi-language code formatter requires a library like Prettier.

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Copy, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CodeFormatter() {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormat = () => {
    if (!input.trim()) {
      setError('Input is empty. Please enter some code.');
      setFormatted('');
      return;
    }
    // Simple JSON formatting as a placeholder for a real code formatter
    try {
      const parsed = JSON.parse(input);
      const beautiful = JSON.stringify(parsed, null, 2);
      setFormatted(beautiful);
      setError(null);
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}. This tool currently only formats JSON.`);
      setFormatted(input); // Keep original input on error
    }
  };

  const handleClear = () => {
    setInput('');
    setFormatted('');
    setError(null);
  };

  const handleCopy = () => {
    if (formatted) {
      navigator.clipboard.writeText(formatted);
      toast({
        title: 'Copied!',
        description: 'Formatted code has been copied to your clipboard.',
      });
    }
  };
  
  useEffect(() => {
    handleFormat();
  }, [input]);

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Code Formatter</CardTitle>
          <CardDescription>
            Paste your code below to format it. (Currently supports JSON only).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code-input">Your Code</Label>
              <Textarea
                id="code-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{ "example": "paste your json here" }'
                rows={15}
                className="text-base font-mono"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code-output">Formatted Code</Label>
              <div className="relative">
                <Textarea
                  id="code-output"
                  readOnly
                  value={formatted}
                  placeholder="Formatted code will appear here"
                  rows={15}
                  className="bg-primary/5 border-primary/20 text-base font-mono"
                />
                {formatted && (
                   <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Formatting Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!error && formatted && (
                 <Alert variant="default" className="border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Valid Code</AlertTitle>
                    <AlertDescription>Your code is correctly formatted.</AlertDescription>
                </Alert>
            )}
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 justify-end border-t pt-6">
          <Button variant="outline" onClick={handleClear}>
            <Trash className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
