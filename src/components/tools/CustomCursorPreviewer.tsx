'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const cursorOptions = [
  'auto', 'default', 'none', 'context-menu', 'help', 'pointer', 'progress', 
  'wait', 'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy', 
  'move', 'no-drop', 'not-allowed', 'grab', 'grabbing', 'all-scroll', 
  'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 
  'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 
  'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out'
];

export default function CustomCursorPreviewer() {
  const [cursor, setCursor] = useState<string>('pointer');

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">CSS Cursor Previewer</CardTitle>
          <CardDescription>Select a cursor style and hover over the preview area.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label>Cursor Style</Label>
                <Select value={cursor} onValueChange={setCursor}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {cursorOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
      </Card>
      
      <div className="lg:col-span-2 space-y-4">
        <Card className="h-[400px] flex items-center justify-center text-center" style={{ cursor }}>
            <div className="p-8 bg-muted rounded-lg">
                <h3 className="text-xl font-bold">Hover over this area</h3>
                <p className="text-muted-foreground">The cursor will change to '{cursor}'</p>
            </div>
        </Card>
      </div>
    </div>
  );
}
