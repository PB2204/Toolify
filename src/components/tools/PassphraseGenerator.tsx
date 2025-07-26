'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { toTitleCase } from '@/lib/text-utils';

const wordList = [
  'ability','able','about','above','accept','according','account','across','act','action',
  'activity','actually','add','address','administration','admit','adult','affect','after','again',
  'against','age','agency','agent','ago','agree','agreement','ahead','air','all',
  'allow','almost','alone','along','already','also','although','always','american','among',
  'amount','analysis','and','animal','another','answer','any','anyone','anything','appear',
  'apply','approach','area','argue','arm','around','arrive','art','article','artist',
  'ask','assume','at','attack','attention','attorney','audience','author','authority','available',
  'avoid','away','baby','back','bad','bag','ball','bank','bar','base','be','beat','beautiful',
  'because','become','bed','before','begin','behavior','behind','believe','benefit','best',
  'better','between','beyond','big','bill','billion','bit','black','blood','blue','board',
  'body','book','born','both','box','boy','break','bring','brother','budget','build','building',
  'business','but','buy','by','call','camera','campaign','can','cancer','candidate','capital',
  'car','card','care','career','carry','case','catch','cause','cell','center','central',
  'century','certain','certainly','chair','challenge','chance','change','character','charge',
  'check','child','choice','choose','church','citizen','city','civil','claim','class','clear',
  'clearly','close','coach','cold','collection','college','color','come','commercial','common',
  'community','company','compare','computer','concern','condition','conference','congress',
  'consider','consumer','contain','continue','control','cost','could','country','couple','course',
  'court','cover','create','crime','cultural','culture','cup','current','customer','cut','dark',
  'data','daughter','day','dead','deal','death','debate','decade','decide','decision','deep',
  'defense','degree','democrat','democratic','describe','design','despite','detail','determine',
  'develop','development','die','difference','different','difficult','dinner','direction','director',
  'discover','discuss','discussion','disease','do','doctor','dog','door','down','draw','dream',
  'drive','drop','drug','during','each','early','east','easy','eat','economic','economy','edge',
  'education','effect','effort','eight','either','election','else','employee','end','energy','enjoy'
];

export default function PassphraseGenerator() {
  const [passphrase, setPassphrase] = useState('');
  const [wordCount, setWordCount] = useState(4);
  const { toast } = useToast();

  const generatePassphrase = () => {
    let newPassphrase = [];
    for (let i = 0; i < wordCount; i++) {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        newPassphrase.push(toTitleCase(wordList[randomIndex]));
    }
    setPassphrase(newPassphrase.join('-'));
  };

  useEffect(generatePassphrase, [wordCount]);

  const handleCopy = () => {
    if (passphrase) {
      navigator.clipboard.writeText(passphrase);
      toast({ title: 'Copied!', description: 'Passphrase copied to clipboard.' });
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Passphrase Generator</CardTitle>
          <CardDescription>
            Create a secure, memorable passphrase using random words.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Input 
              type="text"
              readOnly
              value={passphrase}
              className="pr-10 h-12 text-lg font-mono text-center"
            />
             <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8" onClick={handleCopy}>
                <Copy className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <Label htmlFor="length" className="text-base">Number of Words</Label>
                <span className="font-bold text-lg">{wordCount}</span>
            </div>
            <Slider
              value={[wordCount]}
              onValueChange={(value) => setWordCount(value[0])}
              min={3}
              max={8}
              step={1}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button onClick={generatePassphrase} className="w-full" size="lg">
            <RefreshCw className="mr-2" />
            Generate New Passphrase
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
