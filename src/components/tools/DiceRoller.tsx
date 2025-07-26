'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dices, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

export default function DiceRoller() {
  const [dice, setDice] = useState([6]);

  const rollDice = (numDice: number) => {
    const newDice = Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1);
    setDice(newDice);
  };

  const total = dice.reduce((sum, val) => sum + val, 0);

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Dice Roller</CardTitle>
          <CardDescription>Roll one, two, or three virtual dice.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
            <div className="flex justify-center gap-4 text-primary">
                {dice.map((value, index) => {
                    const Icon = diceIcons[value - 1];
                    return <Icon key={index} className="h-20 w-20" />;
                })}
            </div>
          
            {dice.length > 0 && (
                <div className="p-4 bg-primary/5 rounded-md">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-4xl font-bold text-primary">{total}</p>
                </div>
            )}

            <div className="flex justify-center gap-2">
                <Button onClick={() => rollDice(1)}>Roll 1 Die</Button>
                <Button onClick={() => rollDice(2)}>Roll 2 Dice</Button>
                <Button onClick={() => rollDice(3)}>Roll 3 Dice</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
