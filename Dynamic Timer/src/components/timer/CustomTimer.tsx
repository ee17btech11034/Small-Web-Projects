import React from 'react';
import type { CustomTimerProps } from '../../types/timerTypes';

export const CustomTimer: React.FC<CustomTimerProps> = ({
  currentMode,
  timeRemaining,
  totalDuration,
  isPaused,
  onTogglePause,
  onDialClick,
}) => {
  const formatDigitalTime = (totalSeconds: number): string => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const size = 180;
  const radius = 76;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the ratio: as time moves forward, the teal track fills up clockwise
  const progressRatio = totalDuration > 0 ? (totalDuration - timeRemaining) / totalDuration : 0;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        onClick={onDialClick}
        className="relative cursor-pointer group active:scale-95 transition-transform duration-200 rounded-full hover:ring-4 hover:ring-slate-800"
        title="Click to set custom timer time"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Face */}
          <circle cx={center} cy={center} r={radius} className="fill-slate-900" />
          
          {/* Default solid yellow ring */}
          <circle 
            cx={center} 
            cy={center} 
            r={radius} 
            className="stroke-amber-400 fill-none" 
            strokeWidth="10" 
          />
          
          {/* Teal progress overlay ring filling up clockwise */}
          <circle 
            cx={center} 
            cy={center} 
            r={radius} 
            className="stroke-teal-400 fill-none transition-all duration-300 ease-out" 
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {/* Center Digital Output text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
          <span className="text-[10px] tracking-widest text-slate-500 font-bold uppercase">
            {currentMode}
          </span>
          <span className="text-xl font-black text-slate-100 tracking-tight mt-0.5">
            {formatDigitalTime(timeRemaining)}
          </span>
        </div>
      </div>

      <button 
        onClick={onTogglePause}
        className="mt-3 text-[11px] font-bold tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors uppercase"
      >
        {isPaused ? '▶ Resume Timer' : '⏸ Pause Session'}
      </button>
    </div>
  );
};