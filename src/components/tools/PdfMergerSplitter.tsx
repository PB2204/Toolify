'use client';

import { FileWarning } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function PdfMergerSplitter() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileWarning className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-2xl">PDF Tools Coming Soon</CardTitle>
          <CardDescription>
            This feature is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Manipulating PDF files directly in the browser requires significant processing power and complex libraries. We are working on a robust and efficient solution to bring you PDF merging and splitting capabilities. Thank you for your patience!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
