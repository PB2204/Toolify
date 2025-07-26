'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CharInfo {
  char: string;
  name: string;
  codePoint: string;
  utf8: string;
  utf16: string;
  entity: string;
}

export default function UnicodeInspector() {
  const [input, setInput] = useState('A 😀');
  const [charInfos, setCharInfos] = useState<CharInfo[]>([]);

  const inspectText = (text: string) => {
    const infos: CharInfo[] = [];
    for (const char of text) {
      const codePoint = char.codePointAt(0);
      if (codePoint === undefined) continue;
      
      // A simple approximation for character name
      const name = `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;

      infos.push({
        char,
        name,
        codePoint: `U+${codePoint.toString(16).toUpperCase()}`,
        utf8: new TextEncoder().encode(char).map(b => `0x${b.toString(16)}`).join(' '),
        utf16: `0x${codePoint.toString(16).padStart(4, '0')}`,
        entity: `&#${codePoint};`
      });
    }
    setCharInfos(infos);
  };
  
  useEffect(() => inspectText(input), [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setInput(newText);
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Unicode Inspector</CardTitle>
          <CardDescription>
            Enter characters to see their Unicode details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">Text Input</Label>
            <Input 
              id="search"
              placeholder="Type or paste text..."
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <div className="border rounded-md max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-muted">
                <TableRow>
                  <TableHead className="w-[50px]">Char</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Code Point</TableHead>
                  <TableHead>UTF-8</TableHead>
                  <TableHead>HTML Entity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {charInfos.map((info, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-bold text-2xl">{info.char}</TableCell>
                    <TableCell>{info.name}</TableCell>
                    <TableCell className="font-mono">{info.codePoint}</TableCell>
                    <TableCell className="font-mono">{info.utf8}</TableCell>
                    <TableCell className="font-mono">{info.entity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
