export interface ClockProps {
  size?: number;
  rotationIntervalMs?: number;
  isPaused?: boolean; // Set to true to stop layout cycling
}

export interface ClockLayoutProps {
  time: Date;
  size: number;
}
export interface DigitalClockProps {
  size?: number; // Container width in pixels
}