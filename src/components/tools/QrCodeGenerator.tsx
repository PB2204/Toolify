'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Trash, Wand2 } from 'lucide-react';
import QRCode from 'qrcode';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://mbwebbers.dev');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQrCode = async () => {
    if (!text.trim()) {
      setQrCodeUrl('');
      return;
    }
    try {
        const url = await QRCode.toDataURL(text, {
            errorCorrectionLevel: 'H',
            margin: 2,
            scale: 8,
            width: 256,
        });
        setQrCodeUrl(url);
    } catch (err) {
      console.error(err);
      setQrCodeUrl('');
    }
  };
  
  useEffect(() => {
    generateQrCode();
  }, [text]);

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const handleClear = () => {
    setText('');
  };

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">QR Code Generator</CardTitle>
          <CardDescription>
            Create a QR code from any text or URL.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="text-input">Your Text or URL</Label>
            <Textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL to generate QR code"
              rows={4}
              className="text-base"
            />
          </div>
          {qrCodeUrl && (
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-md">
                <img src={qrCodeUrl} alt="Generated QR Code" width="256" height="256" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 justify-center border-t pt-6">
          <Button onClick={generateQrCode} className="flex-1">
            <Wand2 className="mr-2 h-4 w-4" />
            Generate
          </Button>
          <Button onClick={handleDownload} variant="secondary" disabled={!qrCodeUrl} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download PNG
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
