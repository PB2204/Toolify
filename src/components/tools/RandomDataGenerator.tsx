'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FIRST_NAMES = ['John', 'Jane', 'Alex', 'Emily', 'Chris', 'Katie', 'Michael', 'Sarah', 'David', 'Laura'];
const LAST_NAMES = ['Smith', 'Doe', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez'];
const DOMAINS = ['example.com', 'mail.com', 'test.org', 'domain.net', 'web.com'];
const CITIES = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Moscow', 'Cairo', 'Rio de Janeiro', 'Beijing'];

const generateData = (type: string, count: number): string[] => {
    const data: string[] = [];
    for (let i = 0; i < count; i++) {
        switch (type) {
            case 'firstName':
                data.push(FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]);
                break;
            case 'lastName':
                data.push(LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]);
                break;
            case 'fullName':
                data.push(`${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`);
                break;
            case 'email':
                const fn = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)].toLowerCase();
                const ln = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)].toLowerCase();
                data.push(`${fn}.${ln}${Math.floor(Math.random() * 100)}@${DOMAINS[Math.floor(Math.random() * DOMAINS.length)]}`);
                break;
            case 'city':
                 data.push(CITIES[Math.floor(Math.random() * CITIES.length)]);
                 break;
            case 'number':
                data.push(String(Math.floor(Math.random() * 100000)));
                break;
        }
    }
    return data;
}

export default function RandomDataGenerator() {
  const [generatedText, setGeneratedText] = useState('');
  const [count, setCount] = useState(10);
  const [type, setType] = useState('fullName');
  const { toast } = useToast();

  const handleGenerate = () => {
    const results = generateData(type, count);
    setGeneratedText(results.join('\n'));
  };

  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      toast({
        title: 'Copied!',
        description: 'Generated data has been copied to your clipboard.',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Random Data Generator</CardTitle>
          <CardDescription>
            Generate placeholder data like names, emails, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
             <Select defaultValue={type} onValueChange={setType}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="fullName">Full Name</SelectItem>
                    <SelectItem value="firstName">First Name</SelectItem>
                    <SelectItem value="lastName">Last Name</SelectItem>
                    <SelectItem value="email">Email Address</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                    <SelectItem value="number">Random Number</SelectItem>
                </SelectContent>
             </Select>
            <Input 
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                min="1"
                max="1000"
                className="w-24"
            />
            <Button onClick={handleGenerate} className="sm:ml-auto"><Wand2 className="mr-2"/>Generate</Button>
          </div>
          <div className="relative">
            <Label htmlFor="data-output">Generated Data</Label>
             <Textarea
              id="data-output"
              readOnly
              value={generatedText}
              placeholder="Generated data will appear here..."
              rows={12}
              className="bg-primary/5 border-primary/20 text-base"
            />
            {generatedText && (
               <Button variant="ghost" size="icon" className="absolute top-8 right-2 h-7 w-7" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
         <CardFooter className="flex flex-wrap gap-2 justify-end border-t pt-6">
          <span className="text-sm text-muted-foreground mr-auto">Generated {count} item(s).</span>
        </CardFooter>
      </Card>
    </div>
  );
}
