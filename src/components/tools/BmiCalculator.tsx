'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BmiCalculator() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  const { bmi, category } = useMemo(() => {
    let bmiValue = 0;
    let weightKg = weight;
    let heightM = height / 100;

    if (unitSystem === 'imperial') {
      weightKg = weight * 0.453592; // lbs to kg
      heightM = height * 0.0254; // inches to m
    }

    if (heightM > 0) {
      bmiValue = weightKg / (heightM * heightM);
    }
    
    let bmiCategory = '';
    if (bmiValue < 18.5) bmiCategory = 'Underweight';
    else if (bmiValue < 25) bmiCategory = 'Normal weight';
    else if (bmiValue < 30) bmiCategory = 'Overweight';
    else bmiCategory = 'Obesity';
    
    return { bmi: bmiValue.toFixed(1), category: bmiCategory };
  }, [weight, height, unitSystem]);

  const handleSystemChange = (value: 'metric' | 'imperial') => {
    if (value === unitSystem) return;
    if (value === 'imperial') {
      // convert metric to imperial
      setWeight(prev => parseFloat((prev * 2.20462).toFixed(1)));
      setHeight(prev => parseFloat((prev / 2.54).toFixed(1)));
    } else {
      // convert imperial to metric
      setWeight(prev => parseFloat((prev * 0.453592).toFixed(1)));
      setHeight(prev => parseFloat((prev * 2.54).toFixed(1)));
    }
    setUnitSystem(value);
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">BMI Calculator</CardTitle>
          <CardDescription>Calculate your Body Mass Index.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Select value={unitSystem} onValueChange={(v) => handleSystemChange(v as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metric">Metric (kg, cm)</SelectItem>
              <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</Label>
            <Input id="weight" type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height ({unitSystem === 'metric' ? 'cm' : 'inches'})</Label>
            <Input id="height" type="number" value={height} onChange={e => setHeight(Number(e.target.value))} />
          </div>

          <div className="pt-4 text-center space-y-2 p-4 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground">Your BMI is</p>
            <p className="text-5xl font-bold text-primary">{bmi}</p>
            <p className="font-semibold">{category}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}