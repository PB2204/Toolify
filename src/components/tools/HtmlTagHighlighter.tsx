'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function HtmlTagHighlighter() {
  const [html, setHtml] = useState('<h1>Hello</h1>\n<p>This is a <a href="#">link</a>.</p>');

  const highlightedHtml = useMemo(() => {
    if (!html) return '';
    return html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/(&lt;[a-zA-Z0-9/]+|&gt;)/g, '<span class="text-primary font-bold">$&</span>')
      .replace(/([a-zA-Z-]+)=/g, '<span class="text-accent">$&</span>')
      .replace(/("[^"]*")/g, '<span class="text-green-400">$&</span>');
  }, [html]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">HTML Highlighter</CardTitle>
          <CardDescription>
            Paste your HTML code to see it with syntax highlighting.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="html-input">Your HTML</Label>
                <Textarea
                id="html-input"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="Paste HTML here..."
                rows={12}
                className="text-base font-mono"
              />
            </div>
             <div className="grid gap-2">
                <Label>Highlighted HTML</Label>
                <div 
                    className="p-4 rounded-md border bg-muted min-h-[250px] whitespace-pre-wrap text-base font-mono"
                    dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
