export interface BreakSettings {
  smallRestDuration: number;  // Range: 5-10 mins
  smallRestFrequency: number; // e.g., Every 1 hour
  longBreakDuration: number;  // Range: 10-20 mins
  longBreakFrequency: number; // e.g., Every 3 hours
  hasLunchBreak: boolean;
  lunchBreakTime: string;     // "HH:MM" 24h string
}

export type BreakMode = 'Work' | 'Small Rest' | 'Long Break' | 'Lunch';

export interface CustomTimerProps {
  currentMode: BreakMode;
  timeRemaining: number;
  totalDuration: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onDialClick: () => void;
}

export interface ScheduleDashboardProps {
  currentMode: BreakMode;
  settings: BreakSettings;
  onEditClick: () => void;
}

export interface SettingsFormProps {
  settings: BreakSettings;
  onSettingsChange: (updated: BreakSettings) => void;
  onSave: () => void;
  onCancel: () => void;
}