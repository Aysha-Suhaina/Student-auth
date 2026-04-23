import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const TIMER_MODES = {
  microtask: { type: "single", duration: 5 * 60 },
  pomodoro_20_5: { type: "cycle", work: 20 * 60, break: 5 * 60 },
  pomodoro_40_10: { type: "cycle", work: 40 * 60, break: 10 * 60 },
};

function Timer() {
  const [mode, setMode] = useState("microtask");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("work");
  const [customMinutes, setCustomMinutes] = useState(1);

  const startTimeRef = useRef(null);
  const completedRef = useRef(null); // null = not done, true/false = finished

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const saveTimer = useCallback(async (completed) => {
    try {
      await axios.post("http://localhost:5000/api/timer/save", {
        category: mode,
        startTime: startTimeRef.current,
        endTime: Date.now(),
        duration: timeLeft,
        completed,
      });
    } catch (err) {
      console.error(err);
    }
  }, [mode, timeLeft]);

  const startTimer = () => {
    const selected = TIMER_MODES[mode];
    startTimeRef.current = Date.now();
    completedRef.current = null;

    if (mode === "custom") {
      setTimeLeft(customMinutes * 60);
    } else if (selected.type === "single") {
      setTimeLeft(selected.duration);
    } else {
      setPhase("work");
      setTimeLeft(selected.work);
    }

    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    saveTimer(false);
  };

  // Separate effect just for the tick
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const selected = TIMER_MODES[mode];

          if (mode === "custom" || selected?.type === "single") {
            completedRef.current = true; // signal completion
            setIsRunning(false);
            return 0;
          }

          // Pomodoro phase switch
          if (phase === "work") {
            setPhase("break");
            return selected.break;
          } else {
            setPhase("work");
            return selected.work;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode, phase]);

  // Separate effect to react to completion signal
  useEffect(() => {
    if (!isRunning && completedRef.current === true) {
      completedRef.current = null; // reset so it doesn't fire again
      alert("Timer completed 🔔");
      saveTimer(true);
    }
  }, [isRunning, saveTimer]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{formatTime(timeLeft)}</h1>
      <h3>{mode.includes("pomodoro") && `Phase: ${phase}`}</h3>

      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="microtask">Microtask (5 min)</option>
        <option value="pomodoro_20_5">Pomodoro 20/5</option>
        <option value="pomodoro_40_10">Pomodoro 40/10</option>
        <option value="custom">Custom</option>
      </select>

      {mode === "custom" && (
        <div>
          <input
            type="number"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(Number(e.target.value))}
            placeholder="Minutes"
          />
        </div>
      )}

      <br /><br />

      {!isRunning ? (
        <button onClick={startTimer}>Start</button>
      ) : (
        <button onClick={stopTimer}>Stop</button>
      )}
    </div>
  );
}

export default Timer;