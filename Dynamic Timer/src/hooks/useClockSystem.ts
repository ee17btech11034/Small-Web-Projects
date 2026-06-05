import { useState, useEffect, useCallback } from 'react';
import type { ClockSystemHook } from '../types/clockSystemTypes';

export const useClockSystem = (): ClockSystemHook => {
  // 1. Core States
  const [smallDuration, setSmallDuration] = useState<number>(8);
  const [longDuration, setLongDuration] = useState<number>(30);
  const [longFrequency, setLongFrequency] = useState<number>(3);

  const [purpose, setPurpose] = useState<string>('');
  const [CustomTimeremaining, setCustomTimeremaining] = useState<number>(0);
  const [totalPurposeDuration, setTotalPurposeDuration] = useState<number>(0);
  const [isPurposeActive, setIsPurposeActive] = useState<boolean>(false);

  const [wallTime, setWallTime] = useState<Date>(new Date());

  // 2. Simple Native Audio Player Function
  const speakAlert = useCallback((msg: string) => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel(); // Stop any lingering audio immediately
    const utterance = new SpeechSynthesisUtterance(msg);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }, []);

  // 3. One Master Ticker Loop Checking Conditions
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setWallTime(now);

      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();

      // Calculate automated break minute targets
      const isLongBreakHour = h % longFrequency === 0;
      const longTriggerMinute = 60 - longDuration;
      const smallTriggerMinute = 60 - smallDuration;

      // Simple Boolean condition checks at exactly the 00-second mark
      const isLongTriggering = isLongBreakHour && m === longTriggerMinute && s === 0;
      const isSmallTriggering = m === smallTriggerMinute && s === 0;

      // Handle the user's custom purpose countdown reduction
      let isCustomTimerFinishing = false;
      if (isPurposeActive && CustomTimeremaining > 0) {
        setCustomTimeremaining((prev) => {
          if (prev <= 1) {
            isCustomTimerFinishing = true;
            setIsPurposeActive(false);
            return 0;
          }
          return prev - 1;
        });
      }

      // 4. Evaluate simple conditions and call the speech function with your messages
      if (isCustomTimerFinishing) {
        if (isLongTriggering) {
          speakAlert(`custom timer is completed and long break`);
        } else if (isSmallTriggering) {
          speakAlert(`custom timer is completed and small break`);
        } else {
          speakAlert(`Please completed ${purpose || 'your custom task'}`);
        }
      } else if (isLongTriggering) {
        speakAlert("long break time starts");
      } else if (isSmallTriggering) {
        speakAlert("small break time starts");
      }

    }, 1000);

    return () => clearInterval(timer);
  }, [isPurposeActive, CustomTimeremaining, purpose, smallDuration, longDuration, longFrequency, speakAlert]);

  return {
    smallDuration, setSmallDuration,
    longDuration, setLongDuration,
    longFrequency, setLongFrequency,
    purpose, setPurpose,
    CustomTimeremaining, setCustomTimeremaining,
    totalPurposeDuration, setTotalPurposeDuration,
    isPurposeActive, setIsPurposeActive,
    wallTime
  };
};
