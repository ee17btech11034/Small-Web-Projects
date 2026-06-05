import React, { useState } from 'react';
import type { BreakTrackerProps } from '../types/clockSystemTypes';

export const BreakTracker: React.FC<BreakTrackerProps> = ({
  title, type, duration, onDurationChange, frequencyHours = 1, onFrequencyChange, accentClass, accentBgClass, wallTime
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const wallHours = wallTime.getHours();
  const wallMinutes = wallTime.getMinutes();
  const wallSeconds = wallTime.getSeconds();

  const isTargetHour = type === 'long' ? (wallHours % frequencyHours === 0) : true;
  const triggerMinuteWindow = 60 - duration;
  const isBreakActive = isTargetHour && wallMinutes >= triggerMinuteWindow;

  const getCountdownString = (): string => {
    if (isBreakActive) {
      return `ACTIVE - ${String(60 - wallMinutes - 1).padStart(2, '0')}:${String(60 - wallSeconds === 60 ? 0 : 60 - wallSeconds).padStart(2, '0')}`;
    }

    let hoursRemaining = type === 'long' ? (frequencyHours - (wallHours % frequencyHours) - 1) : 0;
    let minutesRemaining = triggerMinuteWindow - wallMinutes - 1;

    if (minutesRemaining < 0) {
      if (type === 'long') hoursRemaining = (hoursRemaining + frequencyHours - 1) % frequencyHours;
      minutesRemaining += 60;
    }

    const formattedSecs = String(60 - wallSeconds === 60 ? 0 : 60 - wallSeconds).padStart(2, '0');
    return type === 'long' 
      ? `${String(hoursRemaining).padStart(2, '0')}:${String(minutesRemaining).padStart(2, '0')}:${formattedSecs}`
      : `${String(minutesRemaining).padStart(2, '0')}:${formattedSecs}`;
  };

  return (
    <div className="w-72 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col font-mono shadow-xl text-slate-100 select-none">
      <div className="flex justify-between items-center border-b border-slate-900 pb-2 mb-3">
        <span className={`text-xs font-sans font-bold tracking-wider ${accentClass} uppercase`}>{title}</span>
        <button onClick={() => setIsEditing(!isEditing)} className="text-[10px] font-sans text-slate-500 hover:text-slate-300 font-bold underline">
          {isEditing ? 'Close' : 'Config'}
        </button>
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-3 text-xs font-sans">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-slate-400">
              <span>Duration:</span>
              <span className={`${accentClass} font-bold font-mono`}>{duration} Mins</span>
            </div>
            <input type="range" min={type === 'long' ? 10 : 2} max={type === 'long' ? 45 : 20} value={duration} onChange={(e) => onDurationChange(Number(e.target.value))} className={`w-full ${accentBgClass} h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer`} />
          </div>
          {type === 'long' && onFrequencyChange && (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-slate-400">
                <span>Frequency:</span>
                <span className="text-indigo-400 font-bold font-mono">Every {frequencyHours} Hours</span>
              </div>
              <input type="range" min="1" max="6" value={frequencyHours} onChange={(e) => onFrequencyChange(Number(e.target.value))} className="w-full accent-indigo-400 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center py-2 bg-slate-900/40 rounded-xl border border-slate-900">
          <span className="text-2xl font-black tracking-tight text-slate-200">{getCountdownString()}</span>
          <span className="text-[9px] font-sans text-slate-500 font-bold mt-1 text-center">
            {isBreakActive ? 'Relaxation window open' : `Starts hourly at :${triggerMinuteWindow}`}
          </span>
        </div>
      )}
    </div>
  );
};
