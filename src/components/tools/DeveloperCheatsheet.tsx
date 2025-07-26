'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const cheatsheets = {
  git: [
    { command: 'git init', description: 'Initializes a new Git repository.' },
    { command: 'git clone [url]', description: 'Clones a repository into a new directory.' },
    { command: 'git status', description: 'Shows the working tree status.' },
    { command: 'git add [file]', description: 'Adds file contents to the index.' },
    { command: 'git commit -m "[message]"', description: 'Records changes to the repository.' },
    { command: 'git push', description: 'Updates remote refs along with associated objects.' },
    { command: 'git pull', description: 'Fetches from and integrates with another repository.' },
    { command: 'git branch', description: 'Lists, creates, or deletes branches.' },
    { command: 'git checkout [branch]', description: 'Switches branches or restores working tree files.' },
    { command: 'git merge [branch]', description: 'Joins two or more development histories together.' },
  ],
  vscode: [
    { command: 'Ctrl/Cmd + P', description: 'Go to File' },
    { command: 'Ctrl/Cmd + Shift + P', description: 'Show Command Palette' },
    { command: 'Ctrl/Cmd + `', description: 'Toggle integrated terminal' },
    { command: 'Ctrl/Cmd + B', description: 'Toggle sidebar visibility' },
    { command: 'Ctrl/Cmd + D', description: 'Add selection to next find match' },
    { command: 'Alt/Option + Up/Down', description: 'Move line up/down' },
    { command: 'Shift + Alt + Up/Down', description: 'Copy line up/down' },
    { command: 'Ctrl/Cmd + /', description: 'Toggle line comment' },
    { command: 'Ctrl/Cmd + F', description: 'Find' },
    { command: 'Ctrl/Cmd + H', description: 'Replace' },
  ],
  devtools: [
    { command: 'Ctrl/Cmd + Shift + C', description: 'Open Inspector to select an element' },
    { command: 'Ctrl/Cmd + Shift + I', description: 'Open Developer Tools' },
    { command: 'Ctrl/Cmd + Shift + J', description: 'Open Console' },
    { command: 'Esc', description: 'Toggle Console Drawer' },
    { command: 'F5 or Ctrl/Cmd + R', description: 'Reload the page' },
    { command: 'Ctrl/Cmd + Shift + R', description: 'Hard reload the page (ignore cache)' },
    { command: 'Sources Tab', description: 'Pause script execution (debugger)' },
    { command: 'Network Tab', description: 'View network requests and responses' },
    { command: 'Lighthouse Tab', description: 'Run performance and accessibility audits' },
  ]
};

type CheatSheetCategory = keyof typeof cheatsheets;

export default function DeveloperCheatsheet() {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Developer Cheatsheet</CardTitle>
          <CardDescription>
            Common keyboard shortcuts and commands for developers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="git" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="git">Git</TabsTrigger>
              <TabsTrigger value="vscode">VS Code</TabsTrigger>
              <TabsTrigger value="devtools">Chrome DevTools</TabsTrigger>
            </TabsList>
            {Object.keys(cheatsheets).map(key => (
              <TabsContent key={key} value={key}>
                <div className="border rounded-md max-h-[60vh] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Command / Shortcut</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cheatsheets[key as CheatSheetCategory].map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono">{item.command}</TableCell>
                        <TableCell>{item.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
