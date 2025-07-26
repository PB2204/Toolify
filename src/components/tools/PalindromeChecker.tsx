'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PalindromeChecker() {
  const [input, setInput] = useState('A man, a plan, a canal, Panama');

  const { isPalindrome, cleanedText } = useMemo(() => {
    if (!input) return { isPalindrome: null, cleanedText: '' };
    const cleaned = input.toLowerCase().replace(/[\W_]/g, '');
    if (cleaned.length === 0) return { isPalindrome: null, cleanedText: cleaned };
    const reversed = cleaned.split('').reverse().join('');
    return { isPalindrome: cleaned === reversed, cleanedText: cleaned };
  }, [input]);

  const handleClear = () => {
    setInput('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Palindrome Checker</CardTitle>
        <CardDescription>
          Check if a word, phrase, or sentence reads the same forwards and backwards, ignoring punctuation, case, and spacing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="text-input">Your Text</Label>
          <Input
            id="text-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to check..."
            className="text-base"
          />
        </div>
        
        {input && (
          <Alert variant={isPalindrome ? 'default' : 'destructive'} className={isPalindrome ? 'border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600' : ''}>
            {isPalindrome ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle>{isPalindrome ? 'It\'s a Palindrome!' : 'Not a Palindrome'}</AlertTitle>
            <AlertDescription>
              The processed text "{cleanedText}" is {isPalindrome ? '' : 'not'} the same when reversed.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
}
