'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';

const TEST_TEXTS = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump!",
  "A wizard's job is to vex chumps quickly in fog.",
  "The five boxing wizards jump quickly."
];

export default function TypingSpeedTester() {
  const [textToType, setTextToType] = useState('');
  const [typedText, setTypedText] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    resetTest();
  }, []);

  useEffect(() => {
    if (timer === 0 && isTestRunning) {
      endTest();
    }
  }, [timer, isTestRunning]);

  const startTest = () => {
    if (isTestRunning) return;
    setIsTestRunning(true);
    inputRef.current?.focus();
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  };

  const endTest = () => {
    if(intervalRef.current) clearInterval(intervalRef.current);
    setIsTestRunning(false);
    const wordsTyped = typedText.trim().split(' ').length;
    setWpm(wordsTyped); // Since it's a 60-second test
  };

  const resetTest = () => {
    if(intervalRef.current) clearInterval(intervalRef.current);
    setIsTestRunning(false);
    setTimer(60);
    setWpm(0);
    setTypedText('');
    setTextToType(TEST_TEXTS[Math.floor(Math.random() * TEST_TEXTS.length)]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTestRunning) {
        startTest();
    }
    setTypedText(e.target.value);
  };
  
  const getHighlightedText = () => {
    return textToType.split('').map((char, index) => {
        let color = 'text-muted-foreground';
        if(index < typedText.length) {
            color = char === typedText[index] ? 'text-primary' : 'text-destructive';
        }
        return <span key={index} className={color}>{char}</span>
    });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Typing Speed Test</CardTitle>
          <CardDescription>
            Test your typing speed in words per minute (WPM). Type the text below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-md text-2xl font-mono tracking-wider">
            {getHighlightedText()}
          </div>
          
          <input 
            ref={inputRef}
            type="text"
            value={typedText}
            onChange={handleInputChange}
            disabled={timer === 0}
            className="w-full p-2 border rounded-md text-lg font-mono"
            placeholder="Start typing here..."
          />

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-primary/5 rounded-md">
                <p className="text-sm text-muted-foreground">Time Remaining</p>
                <p className="text-3xl font-bold text-primary">{timer}s</p>
            </div>
             <div className="p-4 bg-primary/5 rounded-md">
                <p className="text-sm text-muted-foreground">Your Speed (WPM)</p>
                <p className="text-3xl font-bold text-primary">{wpm}</p>
            </div>
          </div>
          
          <Button onClick={resetTest} className="w-full">
            <RefreshCw className="mr-2" />
            Reset Test
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}
