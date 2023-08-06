import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State to keep track of break length and session length
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  // State to keep track of the timer status
  const [timerActive, setTimerActive] = useState(false);
  const [timerType, setTimerType] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60); // Time left in seconds

  // Function to handle the click event for decrementing break length
  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  // Function to handle the click event for incrementing break length
  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  // Function to handle the click event for decrementing session length
  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  // Function to handle the click event for incrementing session length
  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  // Function to handle the click event for starting or stopping the timer
  const handleStartStopTimer = () => {
    setTimerActive(!timerActive);
  };

  // Function to handle the click event for resetting the timer
  const handleResetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerActive(false);
    setTimerType("Session");
    setTimeLeft(25 * 60);
  };

  // Effect to handle the timer countdown and switching between break and session
  useEffect(() => {
    let interval: number | undefined;

    if (timerActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    // Switch to break when session timer ends
    if (timeLeft === 0) {
      if (timerType === "Session") {
        setTimerType("Break");
        setTimeLeft(breakLength * 60);
      } else {
        setTimerType("Session");
        setTimeLeft(sessionLength * 60);
      }
    }

    return () => clearInterval(interval);
  }, [timerActive, timerType, timeLeft, sessionLength, breakLength]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <>
      <div id="wrapper">
        <div id="label">
          <div id="break">
            <h2 id="break-label">Break Length</h2>
            <div className="inside">
              <button id="break-decrement" className="btn" onClick={handleBreakDecrement}>
                -
              </button>
              <h2 id="break-length">{breakLength}</h2>
              <button id="break-increment" className="btn" onClick={handleBreakIncrement}>
                +
              </button>
            </div>
          </div>
          <div id="session">
            <h2 id="session-label">Session Length</h2>
            <div className="inside">
              <button id="session-decrement" className="btn" onClick={handleSessionDecrement}>
                -
              </button>
              <h2 id="session-length">{sessionLength}</h2>
              <button id="session-increment" className="btn" onClick={handleSessionIncrement}>
                +
              </button>
            </div>
          </div>
        </div>
        <div id="timer">
          <h1 id="timer-label">{timerType}</h1>
          <h2 id="time-left">{formatTime(timeLeft)}</h2>
          <button id="start_stop" onClick={handleStartStopTimer}>
            {timerActive ? "Stop" : "Start"}
          </button>
          <button id="reset" onClick={handleResetTimer}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
