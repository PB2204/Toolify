'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { diffChars, diffWordsWithSpace } from 'diff';

export default function DiffMergeChecker() {
  const [text1, setText1] = useState('This is the original text.');
  const [text2, setText2] = useState('This is the modified text here.');

  const wordDiff = useMemo(() => diffWordsWithSpace(text1, text2), [text1, text2]);
  const charDiff = useMemo(() => diffChars(text1, text2), [text1, text2]);

  const renderDiff = (diff: any[]) => {
    return diff.map((part, index) => {
      const colorClass = part.added ? 'bg-green-500/20' : part.removed ? 'bg-red-500/20' : '';
      return <span key={index} className={colorClass}>{part.value}</span>;
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
        <Card>
            <CardHeader>
            <CardTitle className="font-headline text-2xl">Diff Checker</CardTitle>
            <CardDescription>Compare two text inputs to see the differences between them.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="text1">Original Text</Label>
                    <Textarea id="text1" value={text1} onChange={(e) => setText1(e.target.value)} rows={10} className="text-base" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="text2">Modified Text</Label>
                    <Textarea id="text2" value={text2} onChange={(e) => setText2(e.target.value)} rows={10} className="text-base" />
                </div>
            </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Word Difference</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 rounded-md border bg-muted min-h-[100px] whitespace-pre-wrap text-base leading-relaxed">
                        {renderDiff(wordDiff)}
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Character Difference</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 rounded-md border bg-muted min-h-[100px] whitespace-pre-wrap text-base leading-relaxed">
                        {renderDiff(charDiff)}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}