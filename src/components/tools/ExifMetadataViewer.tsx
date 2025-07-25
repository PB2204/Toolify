'use client';

import { Tags } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ExifMetadataViewer() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Tags className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-2xl">EXIF Viewer Coming Soon</CardTitle>
          <CardDescription>
            This feature is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Reading EXIF metadata from images requires a specialized library to parse the binary data embedded in image files. We are working on implementing a reliable and fast EXIF data reader to power this tool. Thanks for your patience!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
