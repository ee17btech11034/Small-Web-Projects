import { useMemo } from 'react';

export const useClockMath = (time: Date, size: number) => {
  return useMemo(() => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const dateNum = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();

    const secondsRatio = seconds / 60;
    const minutesRatio = (minutes + secondsRatio) / 60;
    const hoursRatio = ((hours % 12) + minutesRatio) / 12;

    const secondsDegrees = secondsRatio * 360;
    const minutesDegrees = minutesRatio * 360;
    const hoursDegrees = hoursRatio * 360;

    const center = size / 2;
    const strokeWidth = size * 0.04;

    const rSec = size * 0.42;
    const rMin = rSec - strokeWidth - 4;
    const rHr = rMin - strokeWidth - 4;

    const cSec = 2 * Math.PI * rSec;
    const cMin = 2 * Math.PI * rMin;
    const cHr = 2 * Math.PI * rHr;

    return {
      hours,
      minutes,
      seconds,
      dateNum,
      month,
      year,
      secondsRatio,
      minutesRatio,
      hoursRatio,
      secondsDegrees,
      minutesDegrees,
      hoursDegrees,
      center,
      strokeWidth,
      rSec,
      rMin,
      rHr,
      cSec,
      cMin,
      cHr,
    };
  }, [time, size]);
};
