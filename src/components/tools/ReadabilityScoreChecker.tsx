'use client';

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { syllable } from 'syllable';

interface Stats {
  words: number;
  sentences: number;
  syllables: number;
}

export default function ReadabilityScoreChecker() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog. This is a simple sentence.');

  const stats: Stats = useMemo(() => {
    if (!text) {
      return { words: 0, sentences: 0, syllables: 0 };
    }
    const words = text.trim().split(/\s+/).filter(Boolean);
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const syllables = words.reduce((acc, word) => acc + syllable(word), 0);
    return {
      words: words.length,
      sentences: sentences.length,
      syllables,
    };
  }, [text]);

  const fleschKincaidGrade = useMemo(() => {
    if (stats.words === 0 || stats.sentences === 0) return 0;
    return (0.39 * (stats.words / stats.sentences)) + (11.8 * (stats.syllables / stats.words)) - 15.59;
  }, [stats]);
  
  const fleschReadingEase = useMemo(() => {
    if (stats.words === 0 || stats.sentences === 0) return 0;
    return 206.835 - (1.015 * (stats.words / stats.sentences)) - (84.6 * (stats.syllables / stats.words));
  }, [stats]);

  const getGradeLevelDescription = (grade: number) => {
    if (grade <= 5) return "Very easy to read. Easily understood by an average 11-year-old student.";
    if (grade <= 8) return "Easy to read. Conversational English for consumers.";
    if (grade <= 12) return "Fairly difficult to read. Best understood by high school graduates.";
    return "Very difficult to read. Best understood by college graduates.";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Readability Score Checker</CardTitle>
          <CardDescription>
            Analyze your text's readability using the Flesch-Kincaid formula.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="text-input">Your Text</Label>
            <Textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here to analyze its readability..."
              rows={12}
              className="text-base"
            />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-3xl font-bold">{stats.words}</CardTitle>
            <CardDescription>Words</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-3xl font-bold">{stats.sentences}</CardTitle>
            <CardDescription>Sentences</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-3xl font-bold">{stats.syllables}</CardTitle>
            <CardDescription>Syllables</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Readability Scores</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary/5 rounded-md">
                <h3 className="font-semibold">Flesch-Kincaid Grade Level</h3>
                <p className="text-4xl font-bold text-primary my-2">{fleschKincaidGrade.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">{getGradeLevelDescription(fleschKincaidGrade)}</p>
            </div>
             <div className="p-4 bg-primary/5 rounded-md">
                <h3 className="font-semibold">Flesch Reading Ease</h3>
                <p className="text-4xl font-bold text-primary my-2">{fleschReadingEase.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Higher scores indicate easier readability (90-100 is very easy).</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
