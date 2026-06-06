import React, { useEffect, useState } from 'react';
import { useClockMath } from '../../hooks/useClockMath';
import type { DigitalClockProps } from '../../types/analogClockTypes';

export const DigitalClock: React.FC<DigitalClockProps> = ({ size = 320 }) => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Extract shared time states from the unified custom hook
  const { hours, minutes, seconds, dateNum, month, year } = useClockMath(time, size);

  // 1. Digital Time Formatting (HH:MM:SS AM/PM)
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12; // Convert 0 to 12 for standard formatting
  
  const displayHours = String(hours12).padStart(2, '0');
  const displayMinutes = String(minutes).padStart(2, '0');
  const displaySeconds = String(seconds).padStart(2, '0');

  // 2. Date Container Box Formatting (DD/MM/YY)
  const displayDay = String(dateNum).padStart(2, '0');
  const displayMonth = String(month + 1).padStart(2, '0');
  const displayYear = String(year).slice(-2);

  // 3. Proportional Layout Scaling
  const containerHeight = size * 0.55;
  const timeFontSize = `${size * 0.14}px`;
  const secondsFontSize = `${size * 0.06}px`;
  const ampmFontSize = `${size * 0.05}px`;
  const dateBoxFontSize = `${size * 0.045}px`;

  return (
    <div 
      className="flex flex-col items-center justify-between bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-6 select-none font-mono"
      style={{ width: size, height: containerHeight }}
    >
      {/* Structural Label */}
      <div className="flex justify-between w-full opacity-40 px-1 text-[10px] tracking-widest text-slate-500 font-bold">
        <span>DIGITAL</span>
        <span>• MODULE READOUT •</span>
      </div>

      {/* Main Clock Face Interface */}
      <div className="flex items-baseline justify-center font-bold tracking-tight text-slate-100 my-auto">
        <span style={{ fontSize: timeFontSize }}>
          {displayHours}:{displayMinutes}
        </span>
        
        {/* Seconds Segment */}
        <span 
          className="ml-1.5 text-amber-400 font-semibold"
          style={{ fontSize: secondsFontSize }}
        >
          {displaySeconds}
        </span>

        {/* AM/PM Indicator */}
        <span 
          className="ml-2 font-black text-indigo-400 uppercase tracking-wide"
          style={{ fontSize: ampmFontSize }}
        >
          {ampm}
        </span>
      </div>

      {/* Embedded Separate Date Display Box Container */}
      <div 
        className="w-full bg-slate-900/80 border border-slate-800/60 rounded-xl py-2 flex items-center justify-center font-bold tracking-widest text-slate-400 shadow-inner"
        style={{ fontSize: dateBoxFontSize }}
      >
        <span className="text-slate-600 mr-2 text-[10px] tracking-normal font-sans uppercase">DATE:</span>
        <span className="text-teal-400 font-semibold">
          {displayDay}/{displayMonth}/{displayYear}
        </span>
      </div>
    </div>
  );
};

export default DigitalClock;
