'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { paraphraseAction, type ParaphraseState } from '@/app/actions/paraphraseAction';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Bot, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '../ui/switch';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Paraphrasing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Paraphrase
        </>
      )}
    </Button>
  );
}

export default function Paraphraser() {
  const initialState: ParaphraseState = {};
  const [state, formAction] = useActionState(paraphraseAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [useAi, setUseAi] = useState(true);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Paraphraser Tool</CardTitle>
          <CardDescription>
            Rewrite your text to improve clarity and avoid plagiarism. Choose between a simple rule-based rephraser or a powerful AI-driven transformation.
          </CardDescription>
        </CardHeader>
        <form ref={formRef} action={formAction}>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="text-input">Original Text</Label>
              <Textarea
                id="text-input"
                name="text"
                placeholder="Enter the text you want to paraphrase here..."
                rows={8}
                required
                minLength={10}
                maxLength={2000}
                className="text-base"
              />
            </div>
            <input type="hidden" name="useAi" value={String(useAi)} />

            {state.result && (
              <div className="grid gap-2">
                <Label htmlFor="result-output">Paraphrased Text</Label>
                <Textarea
                  id="result-output"
                  readOnly
                  value={state.result}
                  rows={8}
                  className="bg-primary/5 border-primary/20 text-base"
                />
              </div>
            )}
            
            {state.error && !state.result && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between items-center border-t pt-6">
            <div className="flex items-center space-x-2">
              <Switch id="ai-mode" checked={useAi} onCheckedChange={setUseAi} />
              <Label htmlFor="ai-mode" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span>AI-Powered Mode</span>
              </Label>
            </div>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
