'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [tipPercent, setTipPercent] = useState(18);
  const [numPeople, setNumPeople] = useState(1);

  const tipAmount = bill * (tipPercent / 100);
  const totalAmount = bill + tipAmount;
  const perPersonAmount = totalAmount / numPeople;

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Tip Calculator</CardTitle>
          <CardDescription>Calculate the tip and total bill per person.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bill">Bill Amount ($)</Label>
            <Input id="bill" type="number" value={bill} onChange={e => setBill(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Tip Percentage</Label>
              <span className="font-bold text-primary">{tipPercent}%</span>
            </div>
            <Slider value={[tipPercent]} onValueChange={(v) => setTipPercent(v[0])} min={0} max={50} step={1} />
             <div className="flex gap-2">
                {[10, 15, 18, 20, 25].map(p => (
                    <Button key={p} variant="outline" size="sm" onClick={() => setTipPercent(p)}>{p}%</Button>
                ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="people">Number of People</Label>
            <Input id="people" type="number" value={numPeople} onChange={e => setNumPeople(Math.max(1, Number(e.target.value)))} min="1" />
          </div>

          <div className="pt-4 space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg flex justify-between items-center">
                <div>
                    <p className="text-sm text-muted-foreground">Tip Amount</p>
                    <p className="text-2xl font-bold text-primary">${tipAmount.toFixed(2)}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Total Bill</p>
                    <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
                </div>
            </div>
            {numPeople > 1 && (
                 <div className="p-4 bg-secondary/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Amount Per Person</p>
                    <p className="text-3xl font-bold">${perPersonAmount.toFixed(2)}</p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}