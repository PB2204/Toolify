'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Tablet, Monitor, RefreshCw } from 'lucide-react';

const breakpoints = [
  { name: 'Mobile S', width: 320, height: 568, icon: Smartphone },
  { name: 'Mobile M', width: 375, height: 667, icon: Smartphone },
  { name: 'Mobile L', width: 425, height: 812, icon: Smartphone },
  { name: 'Tablet', width: 768, height: 1024, icon: Tablet },
  { name: 'Laptop', width: 1024, height: 768, icon: Monitor },
  { name: 'Laptop L', width: 1440, height: 900, icon: Monitor },
];

export default function ResponsiveBreakpointTester() {
  const [url, setUrl] = useState('https://toolify.ai');
  const [displayUrl, setDisplayUrl] = useState('https://toolify.ai');
  const [size, setSize] = useState({ width: 1024, height: 768 });
  const [key, setKey] = useState(0); // To force iframe reload

  const handleLoadUrl = () => {
    let finalUrl = url;
    if (!url.startsWith('http')) {
      finalUrl = 'https://' + url;
    }
    setDisplayUrl(finalUrl);
    setKey(prev => prev + 1);
  };
  
  const handleBreakpointClick = (width: number, height: number) => {
    setSize({ width, height });
    setKey(prev => prev + 1);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Card>
        <CardContent className="p-4 flex flex-wrap gap-2 items-center justify-center">
            <Input 
                placeholder="https://example.com" 
                value={url} 
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLoadUrl()}
                className="max-w-xs" 
            />
            <Button onClick={handleLoadUrl}>Load URL</Button>
            <div className="flex flex-wrap gap-2">
                {breakpoints.map(bp => (
                    <Button key={bp.name} variant="outline" size="sm" onClick={() => handleBreakpointClick(bp.width, bp.height)}>
                        <bp.icon className="mr-2 h-4 w-4" />
                        {bp.name} ({bp.width}px)
                    </Button>
                ))}
            </div>
             <Button variant="ghost" size="icon" onClick={() => setKey(prev => prev + 1)}>
                <RefreshCw className="h-4 w-4" />
            </Button>
        </CardContent>
      </Card>

      <div className="flex-grow flex items-center justify-center bg-muted/50 p-4 rounded-lg">
        <iframe
          key={key}
          src={displayUrl}
          title="Responsive Preview"
          style={{ 
              width: `${size.width}px`, 
              height: `${size.height}px`,
              maxWidth: '100%',
              maxHeight: '80vh'
          }}
          className="bg-white border-4 border-gray-800 rounded-lg shadow-2xl transition-all"
        />
      </div>
    </div>
  );
}
