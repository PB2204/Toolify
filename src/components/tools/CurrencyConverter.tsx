'use client';

import { Construction } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CurrencyConverter() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Construction className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-2xl">Under Construction</CardTitle>
          <CardDescription>
            This tool is currently being built. Please check back soon!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            We are working hard to bring you a comprehensive suite of tools. Thank you for your patience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
