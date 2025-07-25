'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { EMOJI_LIST } from '@/lib/data/emoji-list';

export default function EmojiPicker() {
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const filteredEmojis = EMOJI_LIST.filter(emoji => 
    emoji.name.toLowerCase().includes(search.toLowerCase()) ||
    emoji.keywords.some(kw => kw.toLowerCase().includes(search.toLowerCase()))
  );
  
  const handleCopy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    toast({ title: 'Copied!', description: `${emoji} copied to clipboard.` });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Emoji Picker & Copier</CardTitle>
          <CardDescription>
            Search for and copy emojis to your clipboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">Search emojis</Label>
            <Input 
              id="search"
              placeholder="e.g., smile, heart, pizza"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
             <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {filteredEmojis.slice(0, 200).map(emoji => ( // Limit to 200 for performance
                    <button
                        key={emoji.char}
                        onClick={() => handleCopy(emoji.char)}
                        title={emoji.name}
                        className="text-4xl p-2 rounded-lg hover:bg-accent transition-colors"
                    >
                        {emoji.char}
                    </button>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}