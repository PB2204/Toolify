'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export default function RandomPicker() {
  const [items, setItems] = useState('Apple\nBanana\nOrange\nGrape');
  const [picked, setPicked] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  const handlePick = () => {
    const itemList = items.split('\n').filter(item => item.trim() !== '');
    if (itemList.length === 0) return;
    
    setIsPicking(true);
    setPicked(null);
    
    const pickInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * itemList.length);
        setPicked(itemList[randomIndex]);
    }, 100);
    
    setTimeout(() => {
        clearInterval(pickInterval);
        setIsPicking(false);
        const finalIndex = Math.floor(Math.random() * itemList.length);
        setPicked(itemList[finalIndex]);
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Random Item Picker</CardTitle>
          <CardDescription>Enter a list of items (one per line) and pick one at random.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2 text-left">
              <Label htmlFor="item-list">Item List</Label>
              <Textarea
                id="item-list"
                value={items}
                onChange={(e) => setItems(e.target.value)}
                placeholder="Enter items, one per line..."
                rows={8}
              />
            </div>
            
             <Button onClick={handlePick} disabled={isPicking} size="lg">
                <Shuffle className="mr-2" />
                {isPicking ? 'Picking...' : 'Pick an Item'}
            </Button>
            
            <div className="h-24 flex items-center justify-center p-4 bg-primary/5 rounded-md">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={picked}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="text-3xl font-bold text-primary"
                    >
                        {picked || '...'}
                    </motion.div>
                </AnimatePresence>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
