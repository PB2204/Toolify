'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function RegexTester() {
  const [regex, setRegex] = useState('\\b\\w{5}\\b');
  const [testString, setTestString] = useState('This is a test string for our regular expression.');
  const [flags, setFlags] = useState({ g: true, i: true, m: false });
  const [error, setError] = useState<string | null>(null);

  const handleFlagChange = (flag: keyof typeof flags) => {
    setFlags(prev => ({...prev, [flag]: !prev[flag]}));
  };

  const highlightedText = useMemo(() => {
    try {
      const flagString = Object.keys(flags).filter(f => flags[f as keyof typeof flags]).join('');
      const re = new RegExp(regex, flagString);
      setError(null);
      if (!regex || !testString) return testString;
      
      return testString.replace(re, (match) => `<mark>${match}</mark>`);
    } catch (e: any) {
      setError(e.message);
      return testString;
    }
  }, [regex, testString, flags]);
  
  const matches = useMemo(() => {
     try {
      const flagString = Object.keys(flags).filter(f => flags[f as keyof typeof flags]).join('');
      const re = new RegExp(regex, flagString);
      return testString.match(re) || [];
    } catch (e) {
      return [];
    }
  }, [regex, testString, flags]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Regex Tester</CardTitle>
          <CardDescription>Test and debug your regular expressions in real-time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="regex-input">Regular Expression</Label>
            <div className="flex gap-2 items-center">
                <span className="text-muted-foreground">/</span>
                <Input id="regex-input" value={regex} onChange={e => setRegex(e.target.value)} className="font-mono"/>
                <span className="text-muted-foreground">/</span>
                 <div className="flex items-center space-x-2">
                    <Switch id="g" checked={flags.g} onCheckedChange={() => handleFlagChange('g')} />
                    <Label htmlFor="g">g</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Switch id="i" checked={flags.i} onCheckedChange={() => handleFlagChange('i')} />
                    <Label htmlFor="i">i</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Switch id="m" checked={flags.m} onCheckedChange={() => handleFlagChange('m')} />
                    <Label htmlFor="m">m</Label>
                </div>
            </div>
             {error && (
                <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Invalid Regex</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="test-string">Test String</Label>
            <Textarea 
                id="test-string"
                value={testString}
                onChange={e => setTestString(e.target.value)}
                rows={8}
                className="font-mono text-base"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
          <CardHeader>
              <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
              <div 
                className="p-4 rounded-md border bg-muted min-h-[100px] whitespace-pre-wrap text-base leading-relaxed selection:bg-primary/40 [&>mark]:bg-accent/50 [&>mark]:rounded-sm"
                dangerouslySetInnerHTML={{ __html: highlightedText }}
              />
          </CardContent>
      </Card>
      
      <Card>
          <CardHeader>
              <CardTitle>Matches ({matches.length})</CardTitle>
          </CardHeader>
          <CardContent>
              {matches.length > 0 ? (
                <ul className="space-y-2">
                    {matches.map((match, index) => (
                        <li key={index} className="p-2 bg-muted rounded-md font-mono text-sm">{match}</li>
                    ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No matches found.</p>
              )}
          </CardContent>
      </Card>
    </div>
  );
}