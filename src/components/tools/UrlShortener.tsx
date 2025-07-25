'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Link, AlertCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleShorten = async () => {
    if (!longUrl) {
      setError('Please enter a URL to shorten.');
      return;
    }
    setLoading(true);
    setError(null);
    setShortUrl('');

    try {
      // Using a CORS proxy to bypass browser restrictions on calling TinyURL directly
      const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`)}`);
      
      if (!response.ok) {
        throw new Error('Failed to shorten URL. The service may be down or the CORS proxy failed.');
      }
      
      const data = await response.text();

      if (data.includes('Error') || !data.startsWith('https://tinyurl.com')) {
        throw new Error('Invalid URL or the URL is not reachable.');
      }
      setShortUrl(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      toast({ title: 'Copied!', description: 'Short URL copied to clipboard.' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">URL Shortener</CardTitle>
          <CardDescription>Create a short link for a long URL using TinyURL.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="long-url">Long URL</Label>
            <Input
              id="long-url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/very/long/url/to/shorten"
              onKeyDown={(e) => e.key === 'Enter' && handleShorten()}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {shortUrl && (
             <div className="space-y-2">
                <Label htmlFor="short-url">Short URL</Label>
                <div className="relative">
                    <Input id="short-url" readOnly value={shortUrl} className="bg-primary/5"/>
                    <Button variant="ghost" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-7 w-7" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
            <Button onClick={handleShorten} disabled={loading} className="w-full">
              {loading ? <Loader2 className="animate-spin" /> : <Link />}
              <span className="ml-2">Shorten URL</span>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
