import React from 'react';
import type { SettingsFormProps } from '../types/breakTypes';

export const SettingsForm: React.FC<SettingsFormProps> = ({
  settings,
  onSettingsChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-bold tracking-wider text-teal-400 uppercase border-b border-slate-900 pb-1">
        Configure Break Architecture Rules
      </h3>
      
      {/* Small rest control layout slider configuration input */}
      <div className="flex flex-col gap-1 text-xs">
        <div className="flex justify-between text-slate-400">
          <span>Small Rest Duration:</span>
          <span className="text-teal-400 font-bold">{settings.smallRestDuration} Mins</span>
        </div>
        <input 
          type="range" min="5" max="10" 
          value={settings.smallRestDuration} 
          onChange={(e) => onSettingsChange({ ...settings, smallRestDuration: Number(e.target.value) })}
          className="w-full accent-teal-400 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Long Rest control layout slider configuration input */}
      <div className="flex flex-col gap-1 text-xs mt-1">
        <div className="flex justify-between text-slate-400">
          <span>Long Break Duration:</span>
          <span className="text-indigo-400 font-bold">{settings.longBreakDuration} Mins</span>
        </div>
        <input 
          type="range" min="10" max="20" 
          value={settings.longBreakDuration} 
          onChange={(e) => onSettingsChange({ ...settings, longBreakDuration: Number(e.target.value) })}
          className="w-full accent-indigo-400 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Lunch break option switch controller and scheduled daily triggers */}
      <div className="flex flex-col gap-2 border-t border-slate-900 pt-2 mt-1">
        <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
          <input 
            type="checkbox" 
            checked={settings.hasLunchBreak}
            onChange={(e) => onSettingsChange({ ...settings, hasLunchBreak: e.target.checked })}
            className="rounded bg-slate-900 border-slate-800 text-teal-500 focus:ring-0"
          />
          <span>Include Once-a-Day Lunch Break</span>
        </label>

        {settings.hasLunchBreak && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Scheduled Trigger Time:</span>
            <input 
              type="time" 
              value={settings.lunchBreakTime}
              onChange={(e) => onSettingsChange({ ...settings, lunchBreakTime: e.target.value })}
              className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-teal-400 font-mono focus:outline-none focus:border-teal-500"
            />
          </div>
        )}
      </div>

      {/* Action triggers execution panel footer */}
      <div className="flex gap-2 mt-2">
        <button 
          onClick={onSave} 
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-1.5 rounded-xl text-xs shadow-md transition-all"
        >
          Save Limits
        </button>
        <button 
          onClick={onCancel} 
          className="text-slate-500 hover:text-slate-400 text-xs px-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
