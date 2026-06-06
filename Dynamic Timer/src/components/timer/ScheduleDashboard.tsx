import React from 'react';
import type { ScheduleDashboardProps } from '../../types/timerTypes';

export const ScheduleDashboard: React.FC<ScheduleDashboardProps> = ({
  currentMode,
  settings,
  onEditClick,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase">Current Schedule Status</h3>
        <p className="text-sm text-slate-300 font-medium mt-1">
          Currently tracking a <span className="text-teal-400 font-bold">{currentMode}</span> interval window loop.
        </p>
      </div>

      {/* Structured horizontal timeline details data readouts */}
      <div className="space-y-2 font-mono text-sm border-t border-slate-900 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-sans font-semibold text-slate-400">Small Rest:</span>
          <span className="text-slate-200">
            {settings.smallRestDuration}m <span className="text-slate-600 text-xs">every {settings.smallRestFrequency}hr</span>
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs font-sans font-semibold text-slate-400">Long Rest:</span>
          <span className="text-slate-200">
            {settings.longBreakDuration}m <span className="text-slate-600 text-xs">every {settings.longBreakFrequency}hr</span>
          </span>
        </div>

        {settings.hasLunchBreak && (
          <div className="flex justify-between items-center text-indigo-400">
            <span className="text-xs font-sans font-semibold text-slate-400">Lunch Break:</span>
            <span>Once daily at {settings.lunchBreakTime}</span>
          </div>
        )}
      </div>

      <button 
        onClick={onEditClick}
        className="mt-2 self-start bg-slate-900 border border-slate-800 text-xs font-semibold px-4 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
      >
        Edit break time
      </button>
    </div>
  );
};