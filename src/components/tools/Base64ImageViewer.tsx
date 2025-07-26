'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Copy, Trash, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function Base64ImageViewer() {
  const [base64, setBase64] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setBase64(result);
        setError(null);
      };
      reader.onerror = () => {
        setError('Failed to read the file.');
      }
      reader.readAsDataURL(file);
    }
  };
  
  const handleBase64Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBase64(value);
    if (!value.startsWith('data:image/')) {
        setError('Invalid Base64 image string.');
    } else {
        setError(null);
    }
  }

  const handleClear = () => {
    setBase64('');
    setError(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleCopy = () => {
    if (base64) {
      navigator.clipboard.writeText(base64);
      toast({ title: 'Copied!', description: 'Base64 string has been copied.' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Base64 Image Viewer</CardTitle>
          <CardDescription>
            Upload an image to convert it to a Base64 string, or paste a Base64 string to view the image.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="grid gap-2">
                 <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden"/>
                 <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                 </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="base64-input">Base64 String</Label>
              <Textarea
                id="base64-input"
                value={base64}
                onChange={handleBase64Change}
                placeholder='Paste Base64 data URI here...'
                rows={10}
                className="text-sm font-mono"
              />
            </div>
             {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
        </CardContent>
         <CardFooter className="flex flex-wrap gap-2 justify-end border-t pt-6">
            <Button variant="secondary" onClick={handleCopy} disabled={!base64}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!base64}>
                <Trash className="mr-2 h-4 w-4" />
                Clear
            </Button>
        </CardFooter>
      </Card>
      
      <div className="space-y-4">
        <Label>Image Preview</Label>
        <Card className="aspect-square flex items-center justify-center bg-muted/20">
            {base64 && !error ? (
                <Image src={base64} alt="Base64 Preview" width={400} height={400} className="max-w-full max-h-full object-contain" />
            ) : (
                <p className="text-muted-foreground">Preview will appear here</p>
            )}
        </Card>
      </div>
    </div>
  );
}
