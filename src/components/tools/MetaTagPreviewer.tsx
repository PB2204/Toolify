'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

export default function MetaTagPreviewer() {
  const [title, setTitle] = useState('Toolify - Your Ultimate Toolkit');
  const [description, setDescription] = useState('60+ essential developer and designer tools in one place.');
  const [url, setUrl] = useState('toolify.ai');
  const [imageUrl, setImageUrl] = useState('https://placehold.co/1200x630.png');

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Meta Tag / OG Previewer</CardTitle>
          <CardDescription>See how your page will look when shared on social media.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" value={url} onChange={e => setUrl(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Social Media Preview</h3>
        <Card className="overflow-hidden bg-[#F0F2F5] dark:bg-[#18191A] border-none">
            <div className="aspect-[1.91/1] w-full bg-muted relative">
               {imageUrl && <Image src={imageUrl} alt="Preview" layout="fill" objectFit="cover" data-ai-hint="website social media" />}
            </div>
            <div className="p-3 bg-[#FFFFFF] dark:bg-[#242526]">
                <p className="text-xs uppercase text-gray-500 dark:text-gray-400">{url}</p>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>
            </div>
        </Card>
      </div>
    </div>
  );
}
