'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Search, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { headerInspectorAction } from '@/app/actions/headerInspectorAction';

export default function HttpHeaderInspector() {
  const [url, setUrl] = useState('https://google.com');
  const [result, setResult] = useState<{status: number, statusText: string, headers: Record<string, string>} | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInspect = async () => {
    let targetUrl = url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'https://' + targetUrl;
    }

    if (!targetUrl) {
      setError('Please enter a URL.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    const res = await headerInspectorAction(targetUrl);

    if (res.success && res.headers && res.status) {
      setResult({ headers: res.headers, status: res.status, statusText: res.statusText || '' });
    } else {
      setError(res.error || 'An unknown error occurred.');
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">HTTP Header Inspector</CardTitle>
          <CardDescription>Inspect the HTTP response headers of any URL.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-grow space-y-2">
              <Label htmlFor="url-input">URL</Label>
              <Input
                id="url-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                onKeyDown={(e) => e.key === 'Enter' && handleInspect()}
              />
            </div>
            <Button onClick={handleInspect} disabled={loading} className="self-end">
              {loading ? <Loader2 className="animate-spin" /> : <Search />}
              <span className="ml-2">Inspect</span>
            </Button>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {result && (
            <div>
              <div className="mb-2">
                <span className="font-bold">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-md text-sm ${result.status >= 400 ? 'bg-red-500/20 text-red-800' : 'bg-green-500/20 text-green-800'}`}>
                  {result.status} {result.statusText}
                </span>
              </div>
              <div className="border rounded-md max-h-[60vh] overflow-y-auto">
                  <Table>
                      <TableHeader className="sticky top-0 bg-muted">
                          <TableRow>
                              <TableHead>Header</TableHead>
                              <TableHead>Value</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {Object.entries(result.headers).map(([key, value]) => (
                              <TableRow key={key}>
                                  <TableCell className="font-medium break-all">{key}</TableCell>
                                  <TableCell className="break-all">{value}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
