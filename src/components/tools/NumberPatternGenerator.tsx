'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const generatePattern = (type: string, rows: number): string => {
  let pattern = '';
  switch (type) {
    case 'triangle':
      for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= i; j++) {
          pattern += j + ' ';
        }
        pattern += '\n';
      }
      break;
    case 'pyramid':
      for (let i = 1; i <= rows; i++) {
        pattern += ' '.repeat(rows - i);
        for (let j = 1; j <= i; j++) {
          pattern += i + ' ';
        }
        pattern += '\n';
      }
      break;
    case 'diamond':
        // Upper part
        for (let i = 1; i <= rows; i++) {
            pattern += ' '.repeat(rows - i);
            for (let j = 1; j <= i; j++) {
                pattern += '* ';
            }
            pattern += '\n';
        }
        // Lower part
        for (let i = rows - 1; i >= 1; i--) {
            pattern += ' '.repeat(rows - i);
            for (let j = 1; j <= i; j++) {
                pattern += '* ';
            }
            pattern += '\n';
        }
      break;
  }
  return pattern;
};

export default function NumberPatternGenerator() {
  const [patternType, setPatternType] = useState('triangle');
  const [rows, setRows] = useState(5);
  const [pattern, setPattern] = useState('');

  const handleGenerate = () => {
    setPattern(generatePattern(patternType, rows));
  };

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Number & Shape Pattern Generator</CardTitle>
          <CardDescription>
            Generate various numeric and shape patterns.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="w-full space-y-2">
                <Label>Pattern Type</Label>
                <Select value={patternType} onValueChange={setPatternType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="triangle">Number Triangle</SelectItem>
                        <SelectItem value="pyramid">Number Pyramid</SelectItem>
                        <SelectItem value="diamond">Star Diamond</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full space-y-2">
                <Label>Number of Rows</Label>
                <Input type="number" value={rows} onChange={e => setRows(Math.min(20, Number(e.target.value)))} min="1" max="20" />
            </div>
            <Button onClick={handleGenerate} className="w-full sm:w-auto">Generate</Button>
          </div>
          
          <pre className="p-4 bg-muted rounded-md overflow-x-auto text-center font-mono">
            {pattern || 'Click Generate to see a pattern.'}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
