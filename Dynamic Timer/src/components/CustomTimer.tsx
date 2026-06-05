import React, { useState } from 'react';

interface CustomTimerProps {
  purpose: string;
  setPurpose: (val: string) => void;
  CustomTimeremaining: number;               // <-- Enforced type definition
  setCustomTimeremaining: (val: number) => void; // <-- Enforced type definition
  totalDuration: number;
  setTotalDuration: (val: number) => void;
  isActive: boolean;
  setIsActive: (val: boolean) => void;
}

export const CustomTimer: React.FC<CustomTimerProps> = ({
  purpose, 
  setPurpose, 
  CustomTimeremaining,       // <-- FIX: Changed from timeRemaining to CustomTimeremaining
  setCustomTimeremaining,    // <-- FIX: Changed from setTimeRemaining to setCustomTimeremaining
  totalDuration, 
  setTotalDuration, 
  isActive, 
  setIsActive
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [hrs, setHrs] = useState<string>('00');
  const [mins, setMins] = useState<string>('00');
  const [secs, setSecs] = useState<string>('00');

  const handleSetTimer = () => {
    console.log("Time set in custom timer")
    const totalSecs = (parseInt(hrs || '0', 10) * 3600) + (parseInt(mins || '0', 10) * 60) + parseInt(secs || '0', 10);
    if (totalSecs > 0) {
      setCustomTimeremaining(totalSecs); // <-- Updates hook state directly
      setTotalDuration(totalSecs);
      setIsEditing(false);
      setIsActive(true);
    }
  };

  const formatDigitalTime = (totalSeconds: number): string => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const size = 180;
  const radius = 74;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  // FIX: Uses the synchronized property name for the circular progress drawing calculations
  const progressRatio = totalDuration > 0 ? (totalDuration - CustomTimeremaining) / totalDuration : 0;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="w-80 bg-slate-950 border border-slate-800 rounded-3xl p-5 flex flex-col items-center shadow-2xl font-sans text-slate-100 select-none">
      <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-4">1. Left Purpose Timer</h2>
      
      {isEditing ? (
        <div className="w-full flex flex-col gap-3 font-mono">
          <input 
            type="text" placeholder="Enter Purpose / Goal..."
            value={purpose} onChange={(e) => setPurpose(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 font-sans focus:outline-none focus:border-indigo-500"
          />
          <div className="flex justify-center items-center gap-2 text-slate-100">
            <input type="text" maxLength={2} value={hrs} onChange={(e) => setHrs(e.target.value.replace(/\D/g, ''))} className="w-12 h-10 bg-slate-900 border border-slate-800 rounded-xl text-center text-sm font-bold focus:outline-none" />
            <span>:</span>
            <input type="text" maxLength={2} value={mins} onChange={(e) => setMins(e.target.value.replace(/\D/g, ''))} className="w-12 h-10 bg-slate-900 border border-slate-800 rounded-xl text-center text-sm font-bold focus:outline-none" />
            <span>:</span>
            <input type="text" maxLength={2} value={secs} onChange={(e) => setSecs(e.target.value.replace(/\D/g, ''))} className="w-12 h-10 bg-slate-900 border border-slate-800 rounded-xl text-center text-sm font-bold focus:outline-none" />
          </div>
          <button onClick={handleSetTimer} className="w-full bg-indigo-600 hover:bg-indigo-500 text-xs py-2.5 rounded-xl font-bold font-sans tracking-wide transition-all mt-1">
            Start Purpose Loop
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div onClick={() => setIsEditing(true)} className="relative cursor-pointer rounded-full" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
              <circle cx={center} cy={center} r={radius} className="fill-slate-900" />
              <circle cx={center} cy={center} r={radius} className="stroke-amber-400 fill-none" strokeWidth="8" />
              <circle cx={center} cy={center} r={radius} className="stroke-teal-400 fill-none transition-all duration-300 ease-out" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
              <span className="text-[9px] tracking-widest text-slate-500 font-bold uppercase truncate max-w-[120px]">{purpose || 'TASK'}</span>
              <span className="text-lg font-black text-slate-100 tracking-tight mt-0.5">{formatDigitalTime(CustomTimeremaining)}</span>
            </div>
          </div>
          <button onClick={() => setIsActive(!isActive)} className="mt-4 text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider">
            {isActive ? '⏸ Pause' : '▶ Resume'}
          </button>
        </div>
      )}
    </div>
  );
};
