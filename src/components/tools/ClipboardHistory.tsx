'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Copy, Trash2, ClipboardPaste } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ClipboardHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: 'Item copied from history.' });
  };
  
  const handlePaste = useCallback(async () => {
     try {
        const text = await navigator.clipboard.readText();
        if (text && !history.includes(text)) {
            setHistory(prev => [text, ...prev].slice(0, 20)); // Keep last 20 items
        }
     } catch(err) {
        console.error('Failed to read clipboard');
     }
  }, [history]);
  
  useEffect(() => {
    window.addEventListener('focus', handlePaste);
    return () => {
      window.removeEventListener('focus', handlePaste);
    }
  }, [handlePaste]);

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Clipboard History</CardTitle>
          <CardDescription>
            Review text you've recently copied. History is cleared when you close the tab.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 max-h-[60vh] overflow-y-auto">
          {history.length > 0 ? (
            history.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-md group">
                <p className="flex-grow truncate text-sm">{item}</p>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(item)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-10">
                <ClipboardPaste className="mx-auto h-12 w-12" />
                <p className="mt-2">Your clipboard history will appear here.</p>
                <p className="text-xs">Copy some text and focus this window.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-4">
            <Button variant="outline" onClick={clearHistory} disabled={history.length === 0}>
                <Trash2 className="mr-2" />
                Clear History
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
