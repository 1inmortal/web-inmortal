import { useState, useEffect } from 'react';

const CONFIG = {
  timeZone: 'Europe/Zagreb',
  timeUpdateInterval: 1000,
};

/**
 * useTimeDisplay Hook
 * Muestra la hora actual con formato
 */
export const useTimeDisplay = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateDisplay = () => {
      const now = new Date();
      const options = {
        timeZone: CONFIG.timeZone,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(now);
      const hours = parts.find((part) => part.type === 'hour').value;
      const minutes = parts.find((part) => part.type === 'minute').value;
      const dayPeriod = parts.find((part) => part.type === 'dayPeriod').value;
      setTimeString(
        `${hours}<span class="time-blink">:</span>${minutes} ${dayPeriod}`
      );
    };

    updateDisplay();
    const interval = setInterval(updateDisplay, CONFIG.timeUpdateInterval);

    return () => clearInterval(interval);
  }, []);

  return timeString;
};
