import React from 'react';
import { useClockMath } from '../hooks/useClockMath';
import type { ClockLayoutProps } from '../types/analogClockTypes'


export const TickMarkClock: React.FC<ClockLayoutProps> = ({ time, size }) => {
  const { 
    hours, minutes, secondsRatio, minutesDegrees, hoursDegrees,
    center, strokeWidth, rSec, cSec 
  } = useClockMath(time, size);

  return (
    <>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90 transform">
        <circle cx={center} cy={center} r={size / 2 - 4} className="fill-slate-900 stroke-slate-800" strokeWidth="2" />
        
        <g transform={`translate(${center}, ${center}) rotate(90)`}>
          {Array.from({ length: 60 }).map((_, index) => {
            const angle = index * 6;
            const isCurrentMinute = index === minutes;
            const isCurrentHourMark = index === (hours % 12) * 5;
            
            let strokeColor = "stroke-slate-700";
            let tickLength = size * 0.03;
            
            if (isCurrentMinute) {
              strokeColor = "stroke-teal-400";
              tickLength = size * 0.06;
            } else if (isCurrentHourMark) {
              strokeColor = "stroke-blue-500";
              tickLength = size * 0.05;
            }

            return (
              <line
                key={index}
                x1="0"
                y1={-(size / 2 - size * 0.08)}
                x2="0"
                y2={-(size / 2 - size * 0.08) + tickLength}
                className={`${strokeColor} transition-all duration-300`}
                strokeWidth={isCurrentMinute || isCurrentHourMark ? 3 : 1.5}
                transform={`rotate(${angle})`}
              />
            );
          })}
        </g>

        <circle cx={center} cy={center} r={rSec} className="stroke-slate-800/40 fill-none" strokeWidth={strokeWidth} />
        <circle 
          cx={center} cy={center} r={rSec} className="stroke-amber-400 fill-none transition-all duration-200 ease-out" 
          strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={cSec} strokeDashoffset={cSec - secondsRatio * cSec}
        />
      </svg>

      <div
        className="absolute bottom-1/2 left-1/2 bg-blue-500 origin-bottom rounded-full"
        style={{
          width: size * 0.015,
          height: size * 0.25,
          transform: `translateX(-50%) rotate(${hoursDegrees}deg)`,
        }}
      />
      <div
        className="absolute bottom-1/2 left-1/2 bg-teal-400 origin-bottom rounded-full"
        style={{
          width: size * 0.01,
          height: size * 0.35,
          transform: `translateX(-50%) rotate(${minutesDegrees}deg)`,
        }}
      />
      <div 
        className="absolute bg-slate-950 border-2 border-amber-400 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: size * 0.04, height: size * 0.04 }}
      />
    </>
  );
};
