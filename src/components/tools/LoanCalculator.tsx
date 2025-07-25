'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Landmark } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(5);

  const { monthlyPayment, totalPayment, totalInterest, amortizationSchedule } = useMemo(() => {
    const principal = parseFloat(String(loanAmount));
    const annualRate = parseFloat(String(interestRate));
    const years = parseFloat(String(loanTerm));

    if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 || annualRate < 0 || years <= 0) {
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0, amortizationSchedule: [] };
    }

    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;

    if (monthlyRate === 0) {
        const monthly = principal / numberOfPayments;
        const schedule = Array.from({length: numberOfPayments}, (_, i) => ({
            month: i + 1,
            principalPaid: monthly,
            interestPaid: 0,
            remainingBalance: principal - monthly * (i + 1),
            totalInterest: 0,
        }));
        return { monthlyPayment: monthly, totalPayment: principal, totalInterest: 0, amortizationSchedule: schedule };
    }

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    let balance = principal;
    let cumulativeInterest = 0;
    const schedule: any[] = [];
    for (let i = 1; i <= numberOfPayments; i++) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = monthlyPayment - interestForMonth;
        balance -= principalForMonth;
        cumulativeInterest += interestForMonth;
        if(i % 12 === 0) { // Add data point for each year
          schedule.push({
            year: i / 12,
            principal: principal - balance,
            interest: cumulativeInterest,
            remainingBalance: balance > 0 ? balance : 0,
          });
        }
    }

    return { monthlyPayment, totalPayment, totalInterest, amortizationSchedule: schedule };
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Loan Calculator</CardTitle>
          <CardDescription>Calculate your loan payments and see the amortization.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Loan Amount ($)</Label>
            <Input id="amount" type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input id="rate" type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="term">Loan Term (Years)</Label>
            <Input id="term" type="number" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} />
          </div>
        </CardContent>
      </Card>
      
      <div className="lg:col-span-2 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">${monthlyPayment.toFixed(2)}</CardTitle>
                    <CardDescription>Monthly Payment</CardDescription>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">${totalPayment.toFixed(2)}</CardTitle>
                    <CardDescription>Total Payment</CardDescription>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">${totalInterest.toFixed(2)}</CardTitle>
                    <CardDescription>Total Interest</CardDescription>
                </CardHeader>
            </Card>
        </div>
         <Card>
            <CardHeader>
                <CardTitle>Amortization Chart</CardTitle>
                <CardDescription>Principal vs. Interest paid over time.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={amortizationSchedule} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" unit="yr" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                        <Bar dataKey="principal" stackId="a" fill="hsl(var(--primary))" name="Principal Paid" />
                        <Bar dataKey="interest" stackId="a" fill="hsl(var(--accent))" name="Interest Paid" />
                        <Bar dataKey="remainingBalance" fill="hsl(var(--secondary))" name="Remaining Balance" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}