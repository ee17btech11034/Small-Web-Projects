export type BreakTrackerType = 'small' | 'long';

export interface BreakTrackerProps {
  title: string;
  type: BreakTrackerType;
  duration: number;
  onDurationChange: (val: number) => void;
  frequencyHours?: number;
  onFrequencyChange?: (val: number) => void;
  accentClass: string;
  accentBgClass: string;
  wallTime: Date;
}

export interface ClockSystemHook {
  smallDuration: number;
  setSmallDuration: React.Dispatch<React.SetStateAction<number>>;
  longDuration: number;
  setLongDuration: React.Dispatch<React.SetStateAction<number>>;
  longFrequency: number;
  setLongFrequency: React.Dispatch<React.SetStateAction<number>>;
  purpose: string;
  setPurpose: (val: string) => void; // FIX: Changed from Dispatch to standard function
  CustomTimeremaining: number;
  setCustomTimeremaining: React.Dispatch<React.SetStateAction<number>>;
  totalPurposeDuration: number;
  setTotalPurposeDuration: React.Dispatch<React.SetStateAction<number>>;
  isPurposeActive: boolean;
  setIsPurposeActive: (val: boolean) => void; // FIX: Changed from Dispatch to standard function
  wallTime: Date;
}
