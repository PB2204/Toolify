'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Copy, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import yaml from 'js-yaml';

export default function YamlToJsonConverter() {
  const [input, setInput] = useState('name: John Doe\nage: 30\nisStudent: false');
  const [json, setJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConvert = () => {
    if (!input.trim()) {
      setError('Input is empty. Please enter some YAML data.');
      setJson('');
      return;
    }
    try {
      const parsed = yaml.load(input);
      const beautiful = JSON.stringify(parsed, null, 2);
      setJson(beautiful);
      setError(null);
    } catch (e: any) {
      setError(`Invalid YAML: ${e.message}`);
      setJson('');
    }
  };

  const handleClear = () => {
    setInput('');
    setJson('');
    setError(null);
  };

  const handleCopy = () => {
    if (json) {
      navigator.clipboard.writeText(json);
      toast({
        title: 'Copied!',
        description: 'Formatted JSON has been copied to your clipboard.',
      });
    }
  };
  
  useEffect(() => {
    if (input) {
      handleConvert();
    }
  }, [input]);

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">YAML to JSON Converter</CardTitle>
          <CardDescription>
            Paste your YAML data below to convert it to JSON.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="yaml-input">Your YAML</Label>
              <Textarea
                id="yaml-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='name: John Doe'
                rows={15}
                className="text-base font-mono"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="json-output">JSON Output</Label>
              <div className="relative">
                <Textarea
                  id="json-output"
                  readOnly
                  value={json}
                  placeholder="Converted JSON will appear here"
                  rows={15}
                  className="bg-primary/5 border-primary/20 text-base font-mono"
                />
                {json && (
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
                <AlertTitle>Validation Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!error && json && (
                 <Alert variant="default" className="border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Valid Conversion</AlertTitle>
                    <AlertDescription>Your YAML was successfully converted to JSON.</AlertDescription>
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