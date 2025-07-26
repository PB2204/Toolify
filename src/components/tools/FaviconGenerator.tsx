'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Download, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faviconSizes = [16, 32, 48, 64, 128, 192, 512];

export default function FaviconGenerator() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSourceImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = (size: number) => {
    if (!sourceImage) return;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    img.src = sourceImage;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      const link = document.createElement('a');
      link.download = `favicon-${size}x${size}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast({ title: 'Downloaded!', description: `favicon-${size}x${size}.png` });
    };
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Favicon Generator</CardTitle>
          <CardDescription>Upload an image to generate favicons in multiple standard sizes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
            </Button>
            <div className="aspect-square w-full bg-muted rounded-md flex items-center justify-center">
                {sourceImage ? (
                    <img src={sourceImage} alt="Source Preview" className="max-w-full max-h-full object-contain" />
                ) : (
                    <div className="text-center text-muted-foreground">
                        <ImageIcon className="h-16 w-16 mx-auto" />
                        <p>Image Preview</p>
                    </div>
                )}
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Generated Favicons</CardTitle>
            <CardDescription>Click to download each size.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {faviconSizes.map(size => (
                <div key={size} className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center">
                         {sourceImage && <img src={sourceImage} alt={`${size}px preview`} className="max-w-full max-h-full object-contain" />}
                    </div>
                    <Button variant="secondary" size="sm" disabled={!sourceImage} onClick={() => handleDownload(size)}>
                        <Download className="mr-2 h-3 w-3" />
                        {size}x{size}
                    </Button>
                </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
