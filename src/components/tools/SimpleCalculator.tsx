'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SimpleCalculator() {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleDigitClick = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimalClick = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperatorClick = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = calculate(currentValue, inputValue, operator);
      setCurrentValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand: number, secondOperand: number, op: string) => {
    switch (op) {
      case '+': return firstOperand + secondOperand;
      case '-': return firstOperand - secondOperand;
      case '*': return firstOperand * secondOperand;
      case '/': return firstOperand / secondOperand;
      default: return secondOperand;
    }
  };

  const handleEqualsClick = () => {
    const inputValue = parseFloat(display);
    if (currentValue !== null && operator) {
      const result = calculate(currentValue, inputValue, operator);
      setCurrentValue(result);
      setDisplay(String(result));
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };
  
  const handlePlusMinusClick = () => {
    setDisplay(String(parseFloat(display) * -1));
  };
  
  const handlePercentClick = () => {
     setDisplay(String(parseFloat(display) / 100));
  }

  const buttonClasses = "text-2xl h-16";
  const operatorButtonClasses = `${buttonClasses} bg-accent text-accent-foreground hover:bg-accent/90`;
  const functionButtonClasses = `${buttonClasses} bg-muted hover:bg-muted/80`;

  return (
    <div className='w-full max-w-sm mx-auto'>
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Simple Calculator</CardTitle>
        <CardDescription>
          A basic calculator for everyday arithmetic.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-lg text-right text-5xl font-mono break-all mb-4">{display}</div>
        <div className="grid grid-cols-4 gap-2">
            <Button onClick={handleClearClick} className={functionButtonClasses}>AC</Button>
            <Button onClick={handlePlusMinusClick} className={functionButtonClasses}>+/-</Button>
            <Button onClick={handlePercentClick} className={functionButtonClasses}>%</Button>
            <Button onClick={() => handleOperatorClick('/')} className={operatorButtonClasses}>÷</Button>
            
            <Button onClick={() => handleDigitClick('7')} className={buttonClasses}>7</Button>
            <Button onClick={() => handleDigitClick('8')} className={buttonClasses}>8</Button>
            <Button onClick={() => handleDigitClick('9')} className={buttonClasses}>9</Button>
            <Button onClick={() => handleOperatorClick('*')} className={operatorButtonClasses}>×</Button>
            
            <Button onClick={() => handleDigitClick('4')} className={buttonClasses}>4</Button>
            <Button onClick={() => handleDigitClick('5')} className={buttonClasses}>5</Button>
            <Button onClick={() => handleDigitClick('6')} className={buttonClasses}>6</Button>
            <Button onClick={() => handleOperatorClick('-')} className={operatorButtonClasses}>-</Button>
            
            <Button onClick={() => handleDigitClick('1')} className={buttonClasses}>1</Button>
            <Button onClick={() => handleDigitClick('2')} className={buttonClasses}>2</Button>
            <Button onClick={() => handleDigitClick('3')} className={buttonClasses}>3</Button>
            <Button onClick={() => handleOperatorClick('+')} className={operatorButtonClasses}>+</Button>
            
            <Button onClick={() => handleDigitClick('0')} className={`${buttonClasses} col-span-2`}>0</Button>
            <Button onClick={handleDecimalClick} className={buttonClasses}>.</Button>
            <Button onClick={handleEqualsClick} className={operatorButtonClasses}>=</Button>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
