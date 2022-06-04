import React, { useEffect, useRef, useState } from 'react';
import styles from './timer.module.css';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const tick = useRef();

  const padNum = (value) => value.toString().padStart(2, '0');

  useEffect(() => {
    tick.current = setInterval(() => {
      setSeconds((prev) => prev + 1);

      if (seconds === 59) {
        setSeconds(0);
        setMinutes((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(tick.current);
  });

  return (
    <div className={styles.timer}>
      <p className={styles.description}>
        {padNum(minutes)}:{padNum(seconds)}
      </p>
    </div>
  );
};

export default Timer;
