"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const METRONOME_INTERVAL = 857; // 70 BPM => 857ms per beat

export default function FocusApp() {
  const [focusDuration, setFocusDuration] = useState(25);
  const [restDuration, setRestDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(30);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const [sessionCount, setSessionCount] = useState(0);
  const [goalSessions, setGoalSessions] = useState(8);
  const [theme, setTheme] = useState("light");
  const [showSummary, setShowSummary] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const metronomeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      if (isFocus) {
        metronomeRef.current = setInterval(() => {
          const audio = new Audio("/click.wav");
          audio.play();
        }, METRONOME_INTERVAL);
      }
    } else {
      clearInterval(intervalRef.current!);
      clearInterval(metronomeRef.current!);
    }
    return () => {
      clearInterval(intervalRef.current!);
      clearInterval(metronomeRef.current!);
    };
  }, [isRunning, isFocus]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (isFocus) {
        const newSessionCount = sessionCount + 1;
        setSessionCount(newSessionCount);
        if (newSessionCount % 4 === 0) {
          setSecondsLeft(longBreakDuration * 60);
          setIsFocus(false);
          playNotification();
        } else {
          setSecondsLeft(restDuration * 60);
          setIsFocus(false);
          playNotification();
        }
      } else {
        setSecondsLeft(focusDuration * 60);
        setIsFocus(true);
      }
    }
  }, [secondsLeft]);

  useEffect(() => {
    if (sessionCount >= goalSessions && goalSessions !== 0) {
      setShowSummary(true);
      setIsRunning(false);
    }
  }, [sessionCount, goalSessions]);

  const toggleRunning = () => setIsRunning(!isRunning);

  const reset = () => {
    setIsRunning(false);
    setIsFocus(true);
    setSessionCount(0);
    setSecondsLeft(focusDuration * 60);
    setShowSummary(false);
  };

  const skipSession = () => {
    setSecondsLeft(0);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const playNotification = () => {
    const audio = new Audio("/notification.wav");
    audio.play();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (showSummary) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen gap-8 p-4 ${theme}`}>
        <div className="container animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Congratulations!</h1>
          <p className="text-2xl mb-8">You've completed your goal of {goalSessions} sessions!</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={reset}>Start Again</Button>
            <Button onClick={toggleTheme}>{theme === "light" ? "Dark Mode" : "Light Mode"}</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen gap-8 p-4 ${theme}`}>
      <div className="container animate-fade-in">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Focus App</h1>
        <div className="text-7xl font-mono mb-6 font-bold">{formatTime(secondsLeft)}</div>
        <div className="text-2xl mb-8 font-semibold">
          {isFocus ? "Focus Time" : sessionCount % 4 === 0 && sessionCount !== 0 ? "Long Break" : "Short Break"}
        </div>
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button onClick={toggleRunning} className="min-w-[120px]">
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button onClick={reset} className="min-w-[120px]">Reset</Button>
          <Button onClick={skipSession} className="min-w-[120px]">Skip</Button>
        </div>
        <div className="text-lg font-semibold">Sessions completed: {sessionCount}</div>
      </div>
      <div className="bottom-left-buttons">
        <Button onClick={() => setSettingsOpen(true)}>⚙️ Settings</Button>
        <Button onClick={toggleTheme}>{theme === "light" ? "Dark Mode" : "Light Mode"}</Button>
      </div>
      {/* Settings Modal */}
      {settingsOpen && (
        <div className="modal-backdrop animate-fade-in">
          <div className="modal animate-scale-in">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Settings</h2>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold">Session Goal:</label>
                <input
                  type="number"
                  value={goalSessions}
                  onChange={(e) => setGoalSessions(Number(e.target.value))}
                  className="border rounded px-3 py-2 w-32 text-center self-center"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold">Focus Duration (minutes):</label>
                <input
                  type="number"
                  value={focusDuration}
                  onChange={(e) => setFocusDuration(Number(e.target.value))}
                  className="border rounded px-3 py-2 w-32 text-center self-center"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold">Short Break Duration (minutes):</label>
                <input
                  type="number"
                  value={restDuration}
                  onChange={(e) => setRestDuration(Number(e.target.value))}
                  className="border rounded px-3 py-2 w-32 text-center self-center"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold">Long Break Duration (minutes):</label>
                <input
                  type="number"
                  value={longBreakDuration}
                  onChange={(e) => setLongBreakDuration(Number(e.target.value))}
                  className="border rounded px-3 py-2 w-32 text-center self-center"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => setSettingsOpen(false)}>Save</Button>
              <Button onClick={() => setSettingsOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}