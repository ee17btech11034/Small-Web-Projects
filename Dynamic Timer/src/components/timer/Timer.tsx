import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CustomTimer } from './CustomTimer';
import { ScheduleDashboard } from './ScheduleDashboard';
import { SettingsForm } from './SettingsForm';
import type { BreakSettings, BreakMode } from '../../types/timerTypes';

export const Timer: React.FC = () => {
  const [settings, setSettings] = useState<BreakSettings>({
    smallRestDuration: 10,
    smallRestFrequency: 1,
    longBreakDuration: 20,
    longBreakFrequency: 3,
    hasLunchBreak: false,
    lunchBreakTime: '13:00',
  });

  const [currentMode, setCurrentMode] = useState<BreakMode>('Work');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isTimerSettingOpen, setIsTimerSettingOpen] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Core Active Timer values
  const [timeRemaining, setTimeRemaining] = useState<number>(3600); 
  const [totalDuration, setTotalDuration] = useState<number>(3600);
  const lunchTriggeredToday = useRef<boolean>(false);

  // 3-Box Manual Input Fields State
  const [inputHours, setInputHours] = useState<string>('00');
  const [inputMinutes, setInputMinutes] = useState<string>('00');
  const [inputSeconds, setInputSeconds] = useState<string>('00');

  // Voice Alert Synth Engine
  const triggerVoiceAlert = useCallback((message: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } else {
      alert(message);
    }
  }, []);

  // Completion Switching Rules
  const handleTimeCompletion = useCallback(() => {
    if (currentMode === 'Work') {
      setCurrentMode('Small Rest');
      const restSec = settings.smallRestDuration * 60;
      setTimeRemaining(restSec);
      setTotalDuration(restSec);
      triggerVoiceAlert("Work session complete. Please take your small rest break now.");
    } else {
      setCurrentMode('Work');
      setTimeRemaining(3600);
      setTotalDuration(3600);
      triggerVoiceAlert("Break finished. Welcome back. Returning to your primary work session.");
    }
  }, [currentMode, settings.smallRestDuration, triggerVoiceAlert]);

  // Main Background Countdown Engine
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeCompletion();
          return 0;
        }

        if (settings.hasLunchBreak && !lunchTriggeredToday.current) {
          const now = new Date();
          const currentHHMM = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
          if (currentHHMM === settings.lunchBreakTime) {
            lunchTriggeredToday.current = true;
            setCurrentMode('Lunch');
            triggerVoiceAlert("Attention. It is now time for your scheduled daily lunch break.");
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, settings.hasLunchBreak, settings.lunchBreakTime, handleTimeCompletion, triggerVoiceAlert]);

  // Handler to compute 3-input-boxes into clean timer seconds
  const handleApplyCustomTime = () => {
    const hrs = parseInt(inputHours || '0', 10);
    const mins = parseInt(inputMinutes || '0', 10);
    const secs = parseInt(inputSeconds || '0', 10);

    const calculatedSeconds = (hrs * 3600) + (mins * 60) + secs;

    if (calculatedSeconds > 0) {
      setTimeRemaining(calculatedSeconds);
      setTotalDuration(calculatedSeconds);
      setIsTimerSettingOpen(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center gap-8 select-none text-slate-100 font-sans">
      
      {/* Left side Timer layout */}
      <CustomTimer 
        currentMode={currentMode}
        timeRemaining={timeRemaining}
        totalDuration={totalDuration}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(!isPaused)}
        onDialClick={() => setIsTimerSettingOpen(!isTimerSettingOpen)}
      />

      {/* Right column view controls dashboard panels */}
      <div className="flex-1 w-full flex flex-col justify-between self-stretch py-1">
        {!isEditing && !isTimerSettingOpen ? (
          <ScheduleDashboard 
            currentMode={currentMode}
            settings={settings}
            onEditClick={() => setIsEditing(true)}
          />
        ) : isTimerSettingOpen ? (
          /* THE 3 INPUT TIME-SET FACILITY SCREEN */
          <div className="flex flex-col gap-3 font-mono">
            <h3 className="text-xs font-sans font-bold tracking-wider text-amber-400 uppercase border-b border-slate-900 pb-1">
              Set Custom Timer Duration
            </h3>
            
            <div className="flex justify-center items-center gap-3 mt-2">
              {/* Hours Input */}
              <div className="flex flex-col items-center gap-1">
                <input 
                  type="text" maxLength={2} placeholder="00"
                  value={inputHours}
                  onChange={(e) => setInputHours(e.target.value.replace(/\D/g, ''))}
                  className="w-14 h-12 bg-slate-900 border border-slate-800 rounded-xl text-center text-lg font-bold text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                <span className="text-[10px] font-sans text-slate-500 font-semibold uppercase">Hours</span>
              </div>
              <span className="text-xl font-bold text-slate-700 mb-4">:</span>

              {/* Minutes Input */}
              <div className="flex flex-col items-center gap-1">
                <input 
                  type="text" maxLength={2} placeholder="00"
                  value={inputMinutes}
                  onChange={(e) => setInputMinutes(e.target.value.replace(/\D/g, ''))}
                  className="w-14 h-12 bg-slate-900 border border-slate-800 rounded-xl text-center text-lg font-bold text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                <span className="text-[10px] font-sans text-slate-500 font-semibold uppercase">Mins</span>
              </div>
              <span className="text-xl font-bold text-slate-700 mb-4">:</span>

              {/* Seconds Input */}
              <div className="flex flex-col items-center gap-1">
                <input 
                  type="text" maxLength={2} placeholder="00"
                  value={inputSeconds}
                  onChange={(e) => setInputSeconds(e.target.value.replace(/\D/g, ''))}
                  className="w-14 h-12 bg-slate-900 border border-slate-800 rounded-xl text-center text-lg font-bold text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                <span className="text-[10px] font-sans text-slate-500 font-semibold uppercase">Secs</span>
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-3 font-sans">
              <button 
                onClick={handleApplyCustomTime}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-1.5 rounded-xl text-xs transition-all shadow-md"
              >
                Set Time
              </button>
              <button 
                onClick={() => setIsTimerSettingOpen(false)}
                className="text-slate-500 hover:text-slate-400 text-xs px-2"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <SettingsForm 
            settings={settings}
            onSettingsChange={setSettings}
            onSave={() => { setIsEditing(false); lunchTriggeredToday.current = false; }}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Timer;