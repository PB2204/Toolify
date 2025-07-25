'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {marked} from 'marked';

export default function MarkdownToHtml() {
  const [input, setInput] = useState('# Hello World\n\nThis is **Markdown**.\n\n- List item 1\n- List item 2');
  const [html, setHtml] = useState('');
  const { toast } = useToast();

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

  const handleCopy = () => {
    if (html) {
      navigator.clipboard.writeText(html);
      toast({ title: 'Copied!', description: 'HTML output has been copied to your clipboard.' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Markdown to HTML Converter</CardTitle>
          <CardDescription>
            Convert your Markdown text to HTML instantly.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="markdown-input">Markdown</Label>
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
              <Label>HTML Output</Label>
               <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview"><Eye className="mr-2"/>Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                    <div
                        className="prose dark:prose-invert bg-primary/5 p-4 rounded-md border border-primary/20 min-h-[430px]"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </TabsContent>
                <TabsContent value="code">
                     <div className="relative">
                        <Textarea
                            id="html-output"
                            readOnly
                            value={html}
                            placeholder="HTML output will appear here"
                            rows={20}
                            className="bg-primary/5 border-primary/20 text-base font-mono"
                        />
                        {html && (
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleCopy}>
                            <Copy className="h-4 w-4" />
                        </Button>
                        )}
                    </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}