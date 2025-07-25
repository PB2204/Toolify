'use client';

import { Crop } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ImageResizerCropper() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Crop className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-2xl">Image Resizer & Cropper Coming Soon</CardTitle>
          <CardDescription>
            This feature is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Building an intuitive and powerful image resizing and cropping tool with a live preview requires a complex user interface and client-side image manipulation. We are working to bring this feature to you soon. Thank you for your patience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
