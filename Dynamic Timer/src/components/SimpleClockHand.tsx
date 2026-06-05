import React from 'react';
import { useClockMath } from '../hooks/useClockMath';
import type { ClockLayoutProps } from '../types/analogClockTypes'

export const SimpleClockHand: React.FC<ClockLayoutProps> = ({ time, size }) => {
  const { secondsDegrees, minutesDegrees, hoursDegrees } = useClockMath(time, size);

  return (
    <div className="relative rounded-full border-4 border-slate-700 bg-slate-800 shadow-2xl flex items-center justify-center w-full h-full">
      <div className="absolute w-4 h-4 rounded-full bg-indigo-500 z-40 border-2 border-white shadow" />

      <div
        className="absolute bottom-1/2 left-1/2 bg-white origin-bottom rounded-full z-10 transition-transform duration-200 ease-out"
        style={{
          width: size * 0.02,
          height: size * 0.25,
          transform: `translateX(-50%) rotate(${hoursDegrees}deg)`,
        }}
      />

      <div
        className="absolute bottom-1/2 left-1/2 bg-slate-300 origin-bottom rounded-full z-20 transition-transform duration-200 ease-out"
        style={{
          width: size * 0.015,
          height: size * 0.35,
          transform: `translateX(-50%) rotate(${minutesDegrees}deg)`,
        }}
      />

      <div
        className="absolute bottom-1/2 left-1/2 bg-amber-400 origin-bottom rounded-full z-30 transition-transform duration-100 ease-out"
        style={{
          width: size * 0.008,
          height: size * 0.4,
          transform: `translateX(-50%) rotate(${secondsDegrees}deg)`,
        }}
      />
    </div>
  );
};
