import React, { useState, useEffect, useContext } from 'react';
import { TimerContext } from './TimerContext';
import './TimerDisplay.css';

const TimerDisplay = () => {
  const { timerId, startTime, stopTimer, totalTime } = useContext(TimerContext);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (startTime && !totalTime) {
      interval = setInterval(() => {
        const currentTime = new Date();
        const timeElapsed = Math.abs(currentTime - new Date(startTime)) / 1000;
        setElapsedTime(timeElapsed);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTime, totalTime]);

  // Function to format seconds into HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStop = async () => {
    if (timerId) {
      try {
        const response = await fetch(`https://time-tracker-ilik.onrender.com/api/timer/end/${timerId}`, { method: 'POST' });
        const data = await response.json();
        stopTimer(data.total_time);
      } catch (error) {
        console.error("Error stopping the timer", error);
      }
    }
  };

  return (
    <div className="timer-container">
      <h1 className="timer-title">Timer</h1>

      <div className="time-display">
        {totalTime !== null ? (
          <p className="total-time">Total Time: {formatTime(totalTime)}</p>
        ) : (
          <p className="elapsed-time">Elapsed Time: {formatTime(elapsedTime)}</p>
        )}
      </div>

      {totalTime === null && (
        <button className="stop-btn" onClick={handleStop}>Complete Timer</button>
      )}
    </div>
  );
};

export default TimerDisplay;
