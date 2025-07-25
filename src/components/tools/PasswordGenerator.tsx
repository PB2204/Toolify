'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const { toast } = useToast();

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charset = '';
    if (includeUppercase) charset += upper;
    if (includeLowercase) charset += lower;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;
    
    if (!charset) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must select at least one character type.',
      });
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast({
        title: 'Copied!',
        description: 'Password has been copied to your clipboard.',
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Password Generator</CardTitle>
          <CardDescription>
            Create strong, secure, and random passwords.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Input 
              type="text"
              readOnly
              value={password}
              placeholder="Your generated password will appear here"
              className="pr-10 h-12 text-lg font-mono"
            />
            {password && (
              <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8" onClick={handleCopy}>
                <Copy className="h-5 w-5" />
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="length" className="text-base">Password Length</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value, 10))}
                className="w-20 text-center text-base"
                min="4"
                max="128"
              />
            </div>
            <Slider
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              min={4}
              max={128}
              step={1}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={(checked) => setIncludeUppercase(Boolean(checked))} />
              <Label htmlFor="uppercase" className="text-base">Include Uppercase (A-Z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="lowercase" checked={includeLowercase} onCheckedChange={(checked) => setIncludeLowercase(Boolean(checked))} />
              <Label htmlFor="lowercase" className="text-base">Include Lowercase (a-z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(Boolean(checked))} />
              <Label htmlFor="numbers" className="text-base">Include Numbers (0-9)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(Boolean(checked))} />
              <Label htmlFor="symbols" className="text-base">Include Symbols (!@#$...)</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button onClick={generatePassword} className="w-full" size="lg">
            <RefreshCw className="mr-2" />
            Generate Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
