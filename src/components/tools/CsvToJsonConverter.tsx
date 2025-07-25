'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Copy, Trash, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Papa from 'papaparse';

export default function CsvToJsonConverter() {
  const [input, setInput] = useState('header1,header2\nvalue1,value2');
  const [json, setJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleConvert = () => {
    if (!input.trim()) {
      setError('Input is empty. Please enter some CSV data.');
      setJson('');
      return;
    }
    Papa.parse(input, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(`Error parsing CSV: ${results.errors[0].message}`);
          setJson('');
        } else {
          setJson(JSON.stringify(results.data, null, 2));
          setError(null);
        }
      },
    });
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInput(text);
        handleConvert();
      };
      reader.readAsText(file);
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
      toast({ title: 'Copied!', description: 'JSON output has been copied to your clipboard.' });
    }
  };
  
  useState(() => handleConvert());

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">CSV to JSON Converter</CardTitle>
          <CardDescription>
            Convert your CSV data into JSON format. Paste your data or upload a .csv file.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="csv-input">Your CSV</Label>
              <Textarea
                id="csv-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='header1,header2\nvalue1,value2'
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
                    <AlertDescription>Your CSV was successfully converted to JSON.</AlertDescription>
                </Alert>
            )}
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 justify-between border-t pt-6">
            <div>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv" className="hidden"/>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Upload CSV
              </Button>
            </div>
            <div className="flex gap-2">
                <Button onClick={handleConvert}>Convert</Button>
                <Button variant="outline" onClick={handleClear}>
                    <Trash className="mr-2 h-4 w-4" />
                    Clear
                </Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}