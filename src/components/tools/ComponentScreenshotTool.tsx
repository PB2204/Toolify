'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function ComponentScreenshotTool() {
  const componentRef = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState('#8b5cf6');

  const takeScreenshot = () => {
    if (componentRef.current) {
      html2canvas(componentRef.current).then(canvas => {
        const link = document.createElement('a');
        link.download = 'component.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <Card
        ref={componentRef}
        style={{ backgroundColor: bgColor }}
        className="w-full max-w-md p-8 text-white shadow-2xl transition-colors"
      >
        <CardHeader>
          <CardTitle className="text-4xl font-bold">This is a component</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You can edit this content and then take a screenshot of the card.</p>
          <div className="flex gap-2 mt-4">
            <div className="w-10 h-10 rounded-full bg-white/30"></div>
            <div className="w-10 h-10 rounded-full bg-white/30"></div>
            <div className="w-10 h-10 rounded-full bg-white/30"></div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <div className="flex gap-2 items-center">
            <label>BG:</label>
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 border-none bg-transparent" />
        </div>
        <Button onClick={takeScreenshot} size="lg">
          <Camera className="mr-2" />
          Take Screenshot
        </Button>
      </div>
    </div>
  );
}
