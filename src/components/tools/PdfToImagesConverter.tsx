'use client';

import { FileImage } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function PdfToImagesConverter() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileImage className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-2xl">PDF to Images Converter Coming Soon</CardTitle>
          <CardDescription>
            This feature is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Converting PDF pages into images directly in the browser requires rendering the PDF document onto a canvas, which is a memory and processor-intensive task. We are exploring efficient libraries to bring you this functionality soon. Thank you for your patience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
