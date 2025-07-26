'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

const commitTypes = [
  { value: 'feat', label: '✨ feat: A new feature' },
  { value: 'fix', label: '🐛 fix: A bug fix' },
  { value: 'docs', label: '📚 docs: Documentation only changes' },
  { value: 'style', label: '💎 style: Changes that do not affect the meaning of the code (white-space, formatting, etc)' },
  { value: 'refactor', label: '📦 refactor: A code change that neither fixes a bug nor adds a feature' },
  { value: 'perf', label: '🚀 perf: A code change that improves performance' },
  { value: 'test', label: '🚨 test: Adding missing tests or correcting existing tests' },
  { value: 'build', label: '🛠️ build: Changes that affect the build system or external dependencies' },
  { value: 'ci', label: '⚙️ ci: Changes to our CI configuration files and scripts' },
  { value: 'chore', label: '♻️ chore: Other changes that don\'t modify src or test files' },
  { value: 'revert', label: '🗑️ revert: Reverts a previous commit' },
];

export default function CommitMessageGenerator() {
  const [type, setType] = useState('feat');
  const [scope, setScope] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const { toast } = useToast();

  const generatedCommit = `${type}${scope ? `(${scope})` : ''}: ${subject}${body ? `\n\n${body}` : ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCommit);
    toast({ title: 'Copied!', description: 'Commit message copied to clipboard.' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Commit Message Generator</CardTitle>
          <CardDescription>
            Generate conventional commit messages with ease.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select commit type..." />
              </SelectTrigger>
              <SelectContent>
                {commitTypes.map(t => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Scope (Optional)</Label>
            <Input value={scope} onChange={e => setScope(e.target.value)} placeholder="e.g., component, api, auth" />
          </div>
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="A short, imperative tense description" />
          </div>
          <div className="space-y-2">
            <Label>Body (Optional)</Label>
            <Textarea value={body} onChange={e => setBody(e.target.value)} placeholder="A longer description of the changes" rows={4} />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
           <div className="w-full space-y-4">
            <Label>Generated Commit Message</Label>
            <div className="relative">
                <Textarea readOnly value={generatedCommit} rows={4} className="bg-muted font-mono" />
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
           </div>
        </CardFooter>
      </Card>
    </div>
  );
}
