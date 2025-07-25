'use client';

import { Minimize2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ImageCompressor() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Minimize2 className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-2xl">Image Compressor Coming Soon</CardTitle>
          <CardDescription>
            This feature is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Optimizing images effectively while maintaining quality requires sophisticated algorithms that can be resource-intensive in the browser. We are developing an efficient client-side image compression tool and appreciate your patience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
