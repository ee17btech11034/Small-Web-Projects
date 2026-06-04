import { useState, useEffect, useCallback } from 'react';
import { TextField, Header, DisplayBox, RoundButton } from './components';
import { buttonValues } from './constants/buttonThemes';

interface HistoryRecord {
  exp: string;
  res: string;
}

interface CacheState {
  records: HistoryRecord[];
  currentIndex: number; // -1 means live scratchpad editor workspace
}

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  // Singular state handles both variables cleanly without index timing issues
  const [cache, setCache] = useState<CacheState>({
    records: [],
    currentIndex: -1,
  });


  function factorial(n: number): number {
    if (n < 0 || isNaN(n)) return NaN;
    let res = 1;
    for (let i = 2; i <= n; i++) {
      res *= i;
    }
    return res;
  }

  const  resultFunc  = useCallback(() => {
    if (!expression.trim()) return;

    try {
      let sanitized = expression
        .replaceAll(/x/g, '*')
        .replaceAll(/÷/g, '/');

      const logRegex = /log\(([^)]+)\)(?:\(([^)]+)\))?/g;
      sanitized = sanitized.replaceAll(logRegex, (match, base, value) => {
        console.log("log match:", match)
        if (value !== undefined) {
          return `(Math.log(${value}) / Math.log(${base}))`;
        }
        return `Math.log(${base})`;
      });

      const powRegex = /pow\(([^)]+)\)\(([^)]+)\)/g;
      sanitized = sanitized.replaceAll(powRegex, 'Math.pow($1, $2)');

      const sqrtRegex = /sqrt\(([^)]+)\)/g;
      sanitized = sanitized.replaceAll(sqrtRegex, 'Math.sqrt($1)');

      const factRegex = /fact\(([^)]+)\)/g;
      sanitized = sanitized.replaceAll(factRegex, (match, numStr) => {
        console.log("fact match:", match)
        const innerValue = new Function(`return Number(${numStr})`)();
        return String(factorial(innerValue));
      });

      const calculate = new Function(`return ${sanitized}`);
      const output = calculate();

      if (isNaN(output) || !isFinite(output)) {
        setResult('invalid Exp');
      } else {
        const finalResult = parseFloat(output.toFixed(8)).toString();
        setResult(finalResult);

        // MEMOIZATION ENGINE: Safely appends and updates pointer at the same time
        setCache((prev) => {
          const updatedRecords = [...prev.records, { exp: expression, res: finalResult }];
          return {
            records: updatedRecords,
            currentIndex: updatedRecords.length - 1, // Moves pointer directly to newest index
          };
        });
      }
    } catch (error) {
      setResult('invalid Exp');
      console.log('error: ', error);
    }
  }, [expression])

  // 1. Memoize handleClick to freeze its instance structure across renders
  const handleClick = useCallback((label: string) => {
    if (result !== '') {
      setResult('');
    }

    // Break away from historical lock if user types while reviewing old records
    if (cache.currentIndex !== -1 && label !== '=') {
      setCache((prev) => ({ ...prev, currentIndex: -1 }));
    }

    switch (label) {
      case 'CLR':
      case 'Delete':
        setExpression('');
        setResult('');
        break;
      case '⌫':
      case 'Backspace':
        setExpression((prev) => prev.slice(0, -1));
        break;
      case 'log':
        setExpression((prev) => prev + 'log()()');
        break;
      case 'sqrt':
        setExpression((prev) => prev + 'sqrt()');
        break;
      case 'pow':
        setExpression((prev) => prev + 'pow()()');
        break;
      case 'fact':
        setExpression((prev) => prev + 'fact()');
        break;
      case '=':
      case 'Enter':
        resultFunc();
        break;
      default:
        setExpression((prev) => prev + label);
        break;
    }
  }, [result, cache.currentIndex, resultFunc]); // Tracks changes dynamically without causing closure bugs

  // 2. Safely attach your keyboard hotkey listeners using the stable handleClick pointer
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      // 1. Direct structural action keys
      if (key === 'Enter' || key === 'Delete' || key === 'Backspace') {
        event.preventDefault();
        handleClick(key);
        return;
      }

      // 2. Standard numbers, operators, and decimal mappings
      const validInputs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%', '.', '(', ')'];
      
      if (validInputs.includes(key)) {
        event.preventDefault();
        handleClick(key);
        return;
      }

      // 3. Optional: Map shortcuts for functions
      const lowerKey = key.toLowerCase();
      if (lowerKey === 's') { event.preventDefault(); handleClick('sqrt'); }
      if (lowerKey === 'p') { event.preventDefault(); handleClick('pow'); }
      if (lowerKey === 'l') { event.preventDefault(); handleClick('log'); }
      if (lowerKey === 'f') { event.preventDefault(); handleClick('fact'); }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClick]); // ✅ Clean dependency array: Linter warning is fully resolved


  function clickPrev() {
    if (cache.records.length === 0) {
      window.alert('No history saved');
      return;
    }

    setCache((prev) => {
      // If we are at the live workspace area (-1), step onto the last history index
      const targetIndex = prev.currentIndex === -1 ? prev.records.length - 1 : prev.currentIndex - 1;

      if (targetIndex < 0) {
        window.alert('No older history records found');
        return prev; // Keeps state unchanged safely
      }

      // Synchronize the input box text elements using the target pointer directly
      const record = prev.records[targetIndex];
      setExpression(record.exp);
      setResult(record.res);

      return { ...prev, currentIndex: targetIndex };
    });
  }

  function clickNext() {
    if (cache.currentIndex === -1) {
      window.alert('Already displaying the active live panel workspace');
      return;
    }

    setCache((prev) => {
      const targetIndex = prev.currentIndex + 1;

      if (targetIndex >= prev.records.length) {
        // Return user safely back onto their active scratchpad
        setExpression('');
        setResult('');
        return { ...prev, currentIndex: -1 };
      }

      const record = prev.records[targetIndex];
      setExpression(record.exp);
      setResult(record.res);

      return { ...prev, currentIndex: targetIndex };
    });
  }

  return (
    <>
      <Header title="Smart Calculator" />
      <div className="flex flex-col lg:flex-row my-5 max-w-5xl mx-auto gap-4 px-4">
        <DisplayBox props={{ classes: 'flex-col justify-around items-center' }}>
          <TextField 
            label="Expression:" 
            placeholder="expressions will be shown here" 
            value={expression} 
          />
          <TextField 
            label="Result" 
            placeholder="Result will be shown here"
            value={result} 
          />
          <div className="flex flex-row w-full justify-between mt-2">
            <button 
              className="active:bg-red-200 bg-zinc-200 dark:bg-slate-800 px-5 py-1.5 rounded-xl font-mono text-sm font-bold cursor-pointer" 
              onClick={clickPrev}
            >
              prev
            </button>
            <button 
              className="active:bg-red-200 bg-zinc-200 dark:bg-slate-800 px-5 py-1.5 rounded-xl font-mono text-sm font-bold cursor-pointer" 
              onClick={clickNext}
            >
              next
            </button>
          </div>
        </DisplayBox>
        <DisplayBox props={{ classes: 'flex-row justify-center items-start flex-wrap' }}> 
          {buttonValues.map((b) => (
            <RoundButton key={b.label} label={b.label} variant={b.variant} onClick={handleClick} />
          ))}
        </DisplayBox>
      </div>
    </>
  );
}

export default App;
