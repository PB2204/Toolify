'use client';

import { Paintbrush } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CssPlayground() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Paintbrush className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-2xl">CSS Playground Coming Soon</CardTitle>
          <CardDescription>
            This feature is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Building a full-featured, interactive CSS playground with live previews is a complex task. We are planning a robust tool that will allow you to experiment with Flexbox, Grid, and other CSS properties visually. Thank you for your patience!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
