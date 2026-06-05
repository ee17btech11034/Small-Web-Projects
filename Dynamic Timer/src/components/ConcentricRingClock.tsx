import React from 'react';
import { useClockMath } from '../hooks/useClockMath';
import type { ClockLayoutProps } from '../types/analogClockTypes'

export const ConcentricRingClock: React.FC<ClockLayoutProps> = ({ time, size }) => {
  const { 
    secondsRatio, minutesRatio, hoursRatio, 
    center, strokeWidth, rSec, rMin, rHr, cSec, cMin, cHr 
  } = useClockMath(time, size);

  return (
    <svg width={size} height={size} className="absolute inset-0 -rotate-90 transform">
      <circle cx={center} cy={center} r={size / 2 - 4} className="fill-slate-900 stroke-slate-800" strokeWidth="2" />
      
      <circle cx={center} cy={center} r={rHr} className="stroke-slate-800/40 fill-none" strokeWidth={strokeWidth} />
      <circle 
        cx={center} cy={center} r={rHr} className="stroke-blue-500 fill-none transition-all duration-300 ease-out" 
        strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={cHr} strokeDashoffset={cHr - hoursRatio * cHr}
      />

      <circle cx={center} cy={center} r={rMin} className="stroke-slate-800/40 fill-none" strokeWidth={strokeWidth} />
      <circle 
        cx={center} cy={center} r={rMin} className="stroke-teal-400 fill-none transition-all duration-300 ease-out" 
        strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={cMin} strokeDashoffset={cMin - minutesRatio * cMin}
      />

      <circle cx={center} cy={center} r={rSec} className="stroke-slate-800/40 fill-none" strokeWidth={strokeWidth} />
      <circle 
        cx={center} cy={center} r={rSec} className="stroke-amber-400 fill-none transition-all duration-200 ease-out" 
        strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={cSec} strokeDashoffset={cSec - secondsRatio * cSec}
      />
    </svg>
  );
};
