/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useContext } from "react";
import stageNames from "./enums/stageNames";
import beep from "../../assets/beep.mp3";
import styles from "./Timer.module.scss";

import AppContext from "../../context/AppContext";
import Progress from "./components/Progress";
import Controls from "./components/Controls";

const Timer: React.FC = () => {
  // Context values
  const { session, shortBreak, longBreak, isAlarmOn, setIsActive } = useContext(AppContext);

  // State
  const [time, setTime] = useState(session);
  const [isOn, setIsOn] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(1);

  // Timer interval reference
  const timerIntervalRef = useRef<NodeJS.Timeout>(undefined!);
  // Total stage time reference (for Progress)
  const stageTotalTimeRef = useRef<number>(session);
  // Beep sound reference
  const beepSoundRef = useRef(new Audio(beep));

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
    stageTotalTimeRef.current = session;
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
      stageTotalTimeRef.current = session;
    } else {
      sessionCount % 4 === 0 ? setTime(longBreak) : setTime(shortBreak);
      stageTotalTimeRef.current = sessionCount % 4 === 0 ? longBreak : shortBreak;
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

      if(isAlarmOn) {
        beepSoundRef.current.play();
      }
    }
  }, [time])

  // Update Timer state if any of the settings changed
  useEffect(() => {
    resetState();
  }, [session, shortBreak, longBreak])

  return (
    <div className={styles.timer}>
      <div className={styles.stage}>{getStageName()}</div>
      <Progress currentTime={time} totalTime={stageTotalTimeRef.current} />
      <Controls 
        isOn={isOn} 
        startHandler={startTimer} 
        toggleHandler={toggleIsOn} 
        resetHandler={resetState} />
    </div>
  )
}

export default Timer;