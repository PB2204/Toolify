'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Folder, File } from 'lucide-react';

interface TreeNode {
  name: string;
  children: TreeNode[];
}

const parseTextToTree = (text: string): TreeNode => {
  const root: TreeNode = { name: 'root', children: [] };
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const stack: { node: TreeNode; indent: number }[] = [{ node: root, indent: -1 }];

  lines.forEach(line => {
    const indent = line.search(/\S|$/);
    const name = line.trim();
    const node: TreeNode = { name, children: [] };

    while (stack.length > 0 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }
    
    if (stack.length > 0) {
        stack[stack.length - 1].node.children.push(node);
    }
    stack.push({ node, indent });
  });

  return root;
};

const TreeView = ({ node, level = 0 }: { node: TreeNode; level?: number }) => {
    const isFile = !node.children || node.children.length === 0;
    const Icon = isFile ? File : Folder;
    return (
        <div>
            <div className="flex items-center" style={{ marginLeft: `${level * 20}px` }}>
                <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{node.name}</span>
            </div>
            {node.children && node.children.map((child, index) => (
                <TreeView key={index} node={child} level={level + 1} />
            ))}
        </div>
    )
}

export default function FolderStructureVisualizer() {
  const [text, setText] = useState('src\n  components\n    Button.tsx\n    Card.tsx\n  lib\n    utils.ts\n  App.tsx');
  const tree = parseTextToTree(text);

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Folder Structure Visualizer</CardTitle>
          <CardDescription>
            Paste an indented list of files and folders to visualize the structure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={15}
            className="font-mono"
            placeholder="src
  components
    Button.tsx"
          />
        </CardContent>
      </Card>
      <Card>
          <CardHeader>
            <CardTitle>Visualization</CardTitle>
          </CardHeader>
          <CardContent className="font-mono p-4 border rounded-lg bg-muted">
            {tree.children.map((node, index) => <TreeView key={index} node={node} />)}
          </CardContent>
      </Card>
    </div>
  );
}
