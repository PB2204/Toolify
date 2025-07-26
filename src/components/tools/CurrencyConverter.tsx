'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ArrowRightLeft, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const API_URL = 'https://api.frankfurter.app';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [currencies, setCurrencies] = useState<string[]>(['USD', 'EUR']);
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState('latest');
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const res = await fetch(`${API_URL}/currencies`);
        const data = await res.json();
        setCurrencies(Object.keys(data));
      } catch (err) {
        setError('Could not fetch currency list.');
      } finally {
        setLoading(false);
      }
    }
    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    if (!amount || !fromCurrency || !toCurrency) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${date}?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      if (!res.ok) throw new Error('Failed to fetch conversion rate.');
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency].toString());
      setRate(data.rates[toCurrency] / Number(amount));
    } catch (err: any) {
      setError(err.message);
      setConvertedAmount(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleConvert();
  }, [amount, fromCurrency, toCurrency, date]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Currency Converter</CardTitle>
          <CardDescription>
            Convert between different currencies using the latest exchange rates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
             <div className="space-y-2">
                <Label>From</Label>
                 <Select value={fromCurrency} onValueChange={setFromCurrency} disabled={loading}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                </Select>
             </div>
             <div className="space-y-2">
                <Label>To</Label>
                 <Select value={toCurrency} onValueChange={setToCurrency} disabled={loading}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                </Select>
             </div>
           </div>

          {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
          
          {loading && <div className="flex justify-center p-4"><Loader2 className="animate-spin" /></div>}

          {!loading && convertedAmount && (
            <div className="p-4 bg-primary/5 rounded-md text-center">
                 <p className="text-sm text-muted-foreground">{amount} {fromCurrency} =</p>
                 <p className="text-3xl font-bold text-primary">{convertedAmount} {toCurrency}</p>
                 {rate && <p className="text-xs text-muted-foreground mt-1">1 {fromCurrency} = {rate.toFixed(5)} {toCurrency}</p>}
            </div>
          )}

        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
            <Button onClick={handleSwap} variant="outline">
                <ArrowRightLeft className="mr-2 h-4 w-4" /> Swap
            </Button>
        </CardFooter>
      </Card>
      <p className="text-center text-xs text-muted-foreground mt-4">Rates provided by Frankfurter.app</p>
    </div>
  );
}
