'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle } from 'lucide-react';

const STRENGTH_LEVELS = {
  0: { text: 'Very Weak', color: 'bg-red-500' },
  1: { text: 'Weak', color: 'bg-orange-500' },
  2: { text: 'Moderate', color: 'bg-yellow-500' },
  3: { text: 'Strong', color: 'bg-lime-500' },
  4: { text: 'Very Strong', color: 'bg-green-500' },
};

export default function StrongPasswordEvaluator() {
  const [password, setPassword] = useState('');

  const { score, criteria } = useMemo(() => {
    let currentScore = 0;
    const passwordCriteria = [
      { text: 'At least 8 characters', satisfied: password.length >= 8 },
      { text: 'Contains uppercase letters', satisfied: /[A-Z]/.test(password) },
      { text: 'Contains lowercase letters', satisfied: /[a-z]/.test(password) },
      { text: 'Contains numbers', satisfied: /[0-9]/.test(password) },
      { text: 'Contains symbols', satisfied: /[\W_]/.test(password) },
    ];

    if (password.length >= 8) currentScore++;
    if (password.length >= 12) currentScore++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) currentScore++;
    if (/[0-9]/.test(password)) currentScore++;
    if (/[\W_]/.test(password)) currentScore++;

    // Normalize score to be between 0 and 4
    let finalScore = Math.min(Math.floor(currentScore / 1.25), 4);
    if(password.length === 0) finalScore = 0;

    return { score: finalScore, criteria: passwordCriteria };
  }, [password]);
  
  const strength = STRENGTH_LEVELS[score as keyof typeof STRENGTH_LEVELS];
  const progressValue = (score + 1) * 20;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Strong Password Evaluator</CardTitle>
          <CardDescription>
            Enter a password to evaluate its strength.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="password-input">Password</Label>
            <Input
              id="password-input"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              className="text-lg font-mono"
            />
          </div>
        </CardContent>
      </Card>
      {password && (
        <Card>
            <CardHeader>
                <CardTitle>Password Strength</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Progress value={progressValue} className="h-3 [&>div]:bg-red-500" style={{'--tw-bg-opacity': 1, '--tw-bg-progress': strength.color} as any}/>
                <h3 className="text-2xl font-bold text-center" style={{color: `hsl(var(--${strength.color.replace('bg-','').replace('-500','')}-500))`}}>{strength.text}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {criteria.map((c, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                            {c.satisfied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                            <span className={c.satisfied ? 'text-foreground' : 'text-muted-foreground'}>{c.text}</span>
                        </div>
                    ))}
                </div>
                 <p className="text-xs text-muted-foreground pt-4">This is a simple evaluation. For high-security use cases, consider more advanced metrics like entropy.</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
