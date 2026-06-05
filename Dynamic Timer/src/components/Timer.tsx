import React from 'react';
import { CustomTimer } from './CustomTimer';
import { BreakTracker } from './BreakTracker';
import type { ClockSystemHook } from '../types/clockSystemTypes';

interface TimerProps {
  system: ClockSystemHook;
}

export const Timer: React.FC<TimerProps> = ({ system }) => {
  return (
    <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 justify-center items-stretch px-4 mt-2">
      <CustomTimer 
        purpose={system.purpose}
        setPurpose={system.setPurpose}
        CustomTimeremaining={system.CustomTimeremaining}
        setCustomTimeremaining={system.setCustomTimeremaining}
        totalDuration={system.totalPurposeDuration}
        setTotalDuration={system.setTotalPurposeDuration}
        isActive={system.isPurposeActive}
        setIsActive={system.setIsPurposeActive}
      />

      <div className="flex flex-col gap-4 justify-between">
        {/* Small Break instance */}
        <BreakTracker 
          type="small" title="2. Small Break Box" accentClass="text-teal-400" accentBgClass="accent-teal-400"
          duration={system.smallDuration} onDurationChange={system.setSmallDuration} wallTime={system.wallTime}
        />
        {/* Long Break instance */}
        <BreakTracker 
          type="long" title="3. Long Break Box" accentClass="text-indigo-400" accentBgClass="accent-indigo-400"
          duration={system.longDuration} onDurationChange={system.setLongDuration}
          frequencyHours={system.longFrequency} onFrequencyChange={system.setLongFrequency} wallTime={system.wallTime}
        />
      </div>
    </div>
  );
};
