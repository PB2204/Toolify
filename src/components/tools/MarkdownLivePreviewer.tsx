'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { marked } from 'marked';

export default function MarkdownLivePreviewer() {
  const [input, setInput] = useState('# Hello World\n\nThis is **Markdown**.\n\n- List item 1\n- List item 2');
  const [html, setHtml] = useState('');

  useEffect(() => {
    const convert = async () => {
      if(input.trim()) {
        const convertedHtml = await marked.parse(input);
        setHtml(convertedHtml);
      } else {
        setHtml('');
      }
    }
    convert();
  }, [input]);

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Markdown Live Previewer</CardTitle>
          <CardDescription>
            Type your Markdown in the editor and see the rendered HTML in real-time.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="markdown-input">Markdown Editor</Label>
              <Textarea
                id="markdown-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your markdown here..."
                rows={20}
                className="text-base font-mono"
              />
            </div>
            <div className="grid gap-2">
              <Label>Live Preview</Label>
                <div
                    className="prose dark:prose-invert bg-primary/5 p-4 rounded-md border border-primary/20 min-h-[460px]"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
