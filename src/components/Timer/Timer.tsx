/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect, useContext } from "react";
import stageNames from "./enums/stageNames";
import styles from "./Timer.module.scss";

import AppContext from "../../context/AppContext";
import Progress from "./components/Progress";
import Controls from "./components/Controls";

const Timer: React.FC = () => {
  // Context values
  const { session, shortBreak, longBreak, setIsActive } = useContext(AppContext);

  // State
  const [time, setTime] = useState(session);
  const [isOn, setIsOn] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(1);

  // Timer interval reference
  const timerIntervalRef = useRef<NodeJS.Timeout>(undefined!);

  // Methods
  // Start the Timer
  const startTimer = () => {
    setIsActive(true);
    setIsOn(true);
  }

  // Toggle the Timer
  const toggleIsOn = () => {
    setIsOn(prevState => !prevState);
  }

  // Reset state values
  const resetState = () => {
    setTime(session);
    setIsOn(false);
    setIsBreak(false);
    setSessionCount(1);
    setIsActive(false);
  }

  // Return Timer interval
  const getTimerInterval = (): NodeJS.Timeout => {
    return setInterval(() => {
      setTime(prevState => prevState - 1);
    }, 1000)
  };

  // Set new Timer stage
  const setTimerStage = () => {
    if (isBreak) {
      setTime(session);
      setSessionCount(prevState => prevState + 1);
    } else {
      sessionCount % 4 === 0 ? setTime(longBreak) : setTime(shortBreak);
    }

    setIsBreak(prevState => !prevState);
  }

  // Get current Timer stage name
  const getStageName = () => {
    if(isBreak) {
      return sessionCount % 4 === 0 ? stageNames.long_break : stageNames.short_break;
    } else {
      return stageNames.session;
    }
  }

  // Get current time in minutes:seconds format
  const getCurrentTime = () => {
    const minutes = ("0" + Math.floor(time / 60)).slice(-2);
    const seconds = ("0" + time % 60).slice(-2);

    return `${minutes}:${seconds}`
  }

  // Effects
  // Start or stop Timer interval based on isOn value
  useEffect(() => {
    if(isOn) {
      timerIntervalRef.current = getTimerInterval();
    } else {
      clearInterval(timerIntervalRef.current);
    }
  }, [isOn])

  // Change stage when time hits 0
  useEffect(() => {
    if(time <= 0) {
      setTimerStage();
    }
  }, [time])

  // Update Timer state if any of the settings changed
  useEffect(() => {
    resetState();
  }, [session, shortBreak, longBreak])

  return (
    <div className={styles.timer}>
      <div className={styles.stage}>{getStageName()}</div>
      <Progress>
        <div className={styles.time}>{getCurrentTime()}</div>
      </Progress>
      <Controls 
        isOn={isOn} 
        startHandler={startTimer} 
        toggleHandler={toggleIsOn} 
        resetHandler={resetState} />
    </div>
  )
}

export default Timer;