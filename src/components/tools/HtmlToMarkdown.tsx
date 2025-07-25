'use client';

import { useState, useEffect } from 'react';
import TurndownService from 'turndown';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function HtmlToMarkdown() {
  const [input, setInput] = useState('<h1>Hello World</h1>\n\n<p>This is <b>HTML</b>.</p>\n\n<ul>\n  <li>List item 1</li>\n  <li>List item 2</li>\n</ul>');
  const [markdown, setMarkdown] = useState('');
  const { toast } = useToast();
  const [turndownService, setTurndownService] = useState<TurndownService | null>(null);

  useEffect(() => {
    setTurndownService(new TurndownService());
  }, []);

  useEffect(() => {
    if (turndownService) {
      try {
        if (input.trim()) {
          const md = turndownService.turndown(input);
          setMarkdown(md);
        } else {
          setMarkdown('');
        }
      } catch (e) {
        setMarkdown('Error converting HTML.');
      }
    }
  }, [input, turndownService]);

  const handleCopy = () => {
    if (markdown) {
      navigator.clipboard.writeText(markdown);
      toast({ title: 'Copied!', description: 'Markdown output has been copied to your clipboard.' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">HTML to Markdown Converter</CardTitle>
          <CardDescription>
            Convert your HTML code to Markdown instantly.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="html-input">HTML</Label>
              <Textarea
                id="html-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your HTML here..."
                rows={20}
                className="text-base font-mono"
              />
            </div>
            <div className="grid gap-2">
              <Label>Markdown Output</Label>
               <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview"><Eye className="mr-2"/>Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                    <div
                        className="prose dark:prose-invert bg-primary/5 p-4 rounded-md border border-primary/20 min-h-[430px]"
                        dangerouslySetInnerHTML={{ __html: input }}
                    />
                </TabsContent>
                <TabsContent value="code">
                     <div className="relative">
                        <Textarea
                            id="markdown-output"
                            readOnly
                            value={markdown}
                            placeholder="Markdown output will appear here"
                            rows={20}
                            className="bg-primary/5 border-primary/20 text-base font-mono"
                        />
                        {markdown && (
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