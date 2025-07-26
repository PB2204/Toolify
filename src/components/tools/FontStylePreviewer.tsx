'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function FontStylePreviewer() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.');
  const [fontSize, setFontSize] = useState(32);
  const [fontWeight, setFontWeight] = useState(400);
  const [isItalic, setIsItalic] = useState(false);
  const [fontFamily, setFontFamily] = useState('serif');

  const previewStyle: React.CSSProperties = {
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    fontStyle: isItalic ? 'italic' : 'normal',
    fontFamily: fontFamily,
    lineHeight: 1.5,
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Font Style Previewer</CardTitle>
          <CardDescription>Preview text styles with different fonts and settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Font Family</Label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="sans-serif">Sans-Serif</SelectItem>
                    <SelectItem value="monospace">Monospace</SelectItem>
                    <SelectItem value="cursive">Cursive</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Font Size: {fontSize}px</Label>
            <Slider value={[fontSize]} onValueChange={(v) => setFontSize(v[0])} min={12} max={128} />
          </div>
          <div className="space-y-2">
            <Label>Font Weight: {fontWeight}</Label>
            <Slider value={[fontWeight]} onValueChange={(v) => setFontWeight(v[0])} min={100} max={900} step={100} />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="italic" checked={isItalic} onCheckedChange={setIsItalic} />
            <Label htmlFor="italic">Italic</Label>
          </div>
        </CardContent>
      </Card>
      
      <div className="lg:col-span-2 space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>Editor</CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    className="text-lg"
                />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="p-4 rounded-md border bg-muted min-h-[200px]" style={previewStyle}>
                    {text}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
