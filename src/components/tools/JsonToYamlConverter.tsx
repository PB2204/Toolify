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

export default function JsonToYamlConverter() {
  const [input, setInput] = useState('{\n  "name": "John Doe",\n  "age": 30,\n  "isStudent": false\n}');
  const [yamlOutput, setYamlOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConvert = () => {
    if (!input.trim()) {
      setError('Input is empty. Please enter some JSON data.');
      setYamlOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const beautiful = yaml.dump(parsed);
      setYamlOutput(beautiful);
      setError(null);
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      setYamlOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setYamlOutput('');
    setError(null);
  };

  const handleCopy = () => {
    if (yamlOutput) {
      navigator.clipboard.writeText(yamlOutput);
      toast({
        title: 'Copied!',
        description: 'Formatted YAML has been copied to your clipboard.',
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
          <CardTitle className="font-headline text-2xl">JSON to YAML Converter</CardTitle>
          <CardDescription>
            Paste your JSON data below to convert it to YAML.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="json-input">Your JSON</Label>
              <Textarea
                id="json-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{ "example": "paste your json here" }'
                rows={15}
                className="text-base font-mono"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="yaml-output">YAML Output</Label>
              <div className="relative">
                <Textarea
                  id="yaml-output"
                  readOnly
                  value={yamlOutput}
                  placeholder="Converted YAML will appear here"
                  rows={15}
                  className="bg-primary/5 border-primary/20 text-base font-mono"
                />
                {yamlOutput && (
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
            {!error && yamlOutput && (
                 <Alert variant="default" className="border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Valid Conversion</AlertTitle>
                    <AlertDescription>Your JSON was successfully converted to YAML.</AlertDescription>
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