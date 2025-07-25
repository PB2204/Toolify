'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Percent } from 'lucide-react';

export default function PercentageCalculator() {
  const [val1, setVal1] = useState(10);
  const [val2, setVal2] = useState(50);

  const result1 = (val1 / 100) * val2;
  const result2 = (val1 / val2) * 100;
  
  const [price, setPrice] = useState(100);
  const [discount, setDiscount] = useState(20);
  
  const finalPrice = price - (price * (discount/100));
  const savedAmount = price - finalPrice;

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2"><Percent/> Simple Percentage</CardTitle>
          <CardDescription>Calculate percentages of numbers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="flex-shrink-0">What is</Label>
            <Input type="number" value={val1} onChange={e => setVal1(Number(e.target.value))} className="w-24 text-center" />
            <Label className="flex-shrink-0">% of</Label>
            <Input type="number" value={val2} onChange={e => setVal2(Number(e.target.value))} className="w-24 text-center" />
            <Label className="flex-shrink-0">?</Label>
          </div>
          <div className="p-4 bg-primary/5 rounded-md text-center">
            <p className="text-lg font-bold text-primary">{result1.toLocaleString()}</p>
          </div>
          
           <div className="flex items-center gap-2">
            <Input type="number" value={val1} onChange={e => setVal1(Number(e.target.value))} className="w-24 text-center" />
            <Label className="flex-shrink-0">is what % of</Label>
            <Input type="number" value={val2} onChange={e => setVal2(Number(e.target.value))} className="w-24 text-center" />
             <Label className="flex-shrink-0">?</Label>
          </div>
          <div className="p-4 bg-primary/5 rounded-md text-center">
            <p className="text-lg font-bold text-primary">{result2.toFixed(2)}%</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2"><Percent/> Discount Calculator</CardTitle>
          <CardDescription>Calculate the final price after a discount.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="price">Original Price ($)</Label>
            <Input id="price" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
          </div>
           <div className="space-y-2">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input id="discount" type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
          </div>
           <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-primary/5 rounded-md text-center">
                <p className="text-sm text-muted-foreground">Final Price</p>
                <p className="text-lg font-bold text-primary">${finalPrice.toFixed(2)}</p>
            </div>
             <div className="p-4 bg-red-500/10 rounded-md text-center">
                <p className="text-sm text-red-800 dark:text-red-300">You Save</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">${savedAmount.toFixed(2)}</p>
            </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}