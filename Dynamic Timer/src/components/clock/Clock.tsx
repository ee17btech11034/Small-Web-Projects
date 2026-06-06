import React, { useEffect, useState } from 'react';
import { SimpleClockHand, ConcentricRingClock, TickMarkClock } from '../index';
import type { ClockProps } from '../../types/analogClockTypes'

export const Clock: React.FC<ClockProps> = ({
  size = 320,
  rotationIntervalMs = 5000,
}) => {
  const [time, setTime] = useState<Date>(new Date());
  const [currentLayout, setCurrentLayout] = useState<1 | 2 | 3>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // 1. Time Ticker Effect (Always runs to keep clock hands moving)
  useEffect(() => {
    const clockTimer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  // 2. Layout Rotation Effect (Stops rotation loop if isPaused is true)
  useEffect(() => {
    if (isPaused) return;

    const layoutTimer = setInterval(() => {
      setCurrentLayout((prev) => (prev === 3 ? 1 : (prev + 1) as 1 | 2 | 3));
    }, rotationIntervalMs);

    return () => clearInterval(layoutTimer);
  }, [rotationIntervalMs, isPaused]);

  // 3. Digital Layout Time Data Formatting
  const formatDigitalTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 hours to 12
    const hoursStr = String(hours).padStart(2, '0');

    return `${hoursStr}:${minutes}:${seconds} ${ampm}`;
  };

  const formatDigitalDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  // Proportional Typography Scaling
  const timeFontSize = `${size * 0.14}px`;
  const dateFontSize = `${size * 0.12}px`;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-around bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl transition-all duration-300">
      
      {/* Clickable Dial Area Wrapper */}
      <div 
        onClick={() => setIsPaused(!isPaused)}
        className={`relative select-none cursor-pointer rounded-full transition-all duration-200 active:scale-95 group ${
          isPaused ? 'ring-4 ring-amber-600/40' : 'hover:ring-4 hover:ring-indigo-500/30'
        }`}
        style={{ width: size, height: size }}
        title={isPaused ? "Click dial to resume layout rotation" : "Click dial to freeze on this layout"}
      >
        {/* Layout 1: Simple Clock Hands */}
        <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentLayout === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <SimpleClockHand time={time} size={size} />
        </div>

        {/* Layout 2: Concentric Progress Rings */}
        <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentLayout === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <ConcentricRingClock time={time} size={size} />
        </div>

        {/* Layout 3: Radial Tick Marks */}
        <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${currentLayout === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
          <TickMarkClock time={time} size={size} />
        </div>

        {/* Visual Freeze HUD Badge Indicator */}
        {/* {isPaused && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-extrabold tracking-widest px-2 py-0.5 rounded-full z-50 uppercase shadow-lg animate-pulse select-none">
            FREEZE
          </div>
        )} */}
      </div>

      {/* Synchronized Text Sub-display */}
      <div className="mt-4 sm:ml-5 flex flex-col items-center justify-center font-mono">
        <span 
          className="font-bold tracking-tight text-slate-200" 
          style={{ fontSize: timeFontSize }}
        >
          {formatDigitalTime(time)}
        </span>
        <span 
          className="font-semibold text-slate-500 tracking-wider mt-0.5" 
          style={{ fontSize: dateFontSize }}
        >
          {formatDigitalDate(time)}
        </span>
      </div>
      
    </div>
  );
};

export default Clock;

