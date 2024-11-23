import React, { useState } from 'react';
import { TimerContext } from './TimerContext';
import TimerDisplay from './TimerDisplay';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import "./App.css";

const App = () => {
  const [timerId, setTimerId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(null);

  const startTimer = async () => {
    try {
      const response = await fetch('https://time-tracker-ilik.onrender.com/api/timer/start', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.timerId) {
        throw new Error("Invalid response data");
      }

      setTimerId(data.timerId);
      setStartTime(new Date().toISOString());
      toast.success("Timer started successfully!"); // Success toast
    } catch (error) {
      console.error("Error starting the timer", error);
      toast.error(`Error starting the timer: ${error.message}`); // Error toast
    }
  };

  const stopTimer = (time) => {
    setStartTime(null);
    setTotalTime(time);
    toast.info("Timer stopped."); // Info toast when the timer is stopped
  };

  return (
    <TimerContext.Provider value={{ timerId, startTime, stopTimer, totalTime }}>
      <div className="app-container">
        <h1>Timer Application</h1>
        {!startTime && !totalTime ? (
          <button onClick={startTimer} className='start-button'>Start Timer</button>
        ) : (
          <TimerDisplay />
        )}
      </div>
      <ToastContainer /> {/* Toast container to show notifications */}
    </TimerContext.Provider>
  );
};

export default App;
