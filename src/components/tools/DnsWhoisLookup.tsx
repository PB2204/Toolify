'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Search, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dnsLookupAction } from '@/app/actions/dnsLookupAction';

export default function DnsWhoisLookup() {
  const [domain, setDomain] = useState('google.com');
  const [type, setType] = useState('A');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async () => {
    if (!domain) {
      setError('Please enter a domain name.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult('');

    const res = await dnsLookupAction(domain, type);

    if (res.success && res.data) {
      if(res.data.Answer) {
        const formattedResult = res.data.Answer.map((ans: any) => `${ans.type}\t${ans.TTL}\t${ans.data}`).join('\n');
        setResult(formattedResult);
      } else {
        setResult('No records found.');
      }
    } else {
       setError(res.error || 'An unknown error occurred.');
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">DNS Lookup</CardTitle>
          <CardDescription>Look up DNS records for a domain.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-grow space-y-2">
              <Label htmlFor="domain-input">Domain Name</Label>
              <Input
                id="domain-input"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g., example.com"
                onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
              />
            </div>
             <div className="space-y-2">
                <Label htmlFor="record-type">Record Type</Label>
                <Select value={type} onValueChange={setType}>
                    <SelectTrigger id="record-type" className="w-[120px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SOA', 'ANY'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={handleLookup} disabled={loading} className="self-end">
              {loading ? <Loader2 className="animate-spin" /> : <Search />}
              <span className="ml-2">Lookup</span>
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
            <div className="space-y-2">
                <Label>Result</Label>
                <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm font-mono">{result}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
