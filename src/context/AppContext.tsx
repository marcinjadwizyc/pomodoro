/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useRef, useEffect } from "react";

interface IAppContext {
  // Session time in seconds
  session: number,
  // Session time setter
  setSession: React.Dispatch<React.SetStateAction<number>>,
  // Short break time in seconds
  shortBreak: number,
  // Short break time setter
  setShortBreak: React.Dispatch<React.SetStateAction<number>>,
  // Long break time in seconds
  longBreak: number
  // Long break time setter
  setLongBreak: React.Dispatch<React.SetStateAction<number>>,
  // Is Timer active
  isActive: boolean,
  // isActive setter
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

// Settings object interface
interface ISettings {
  session: number,
  shortBreak: number,
  longBreak: number
}

const AppContext = createContext<IAppContext>(undefined!);

export const AppContextProvider: React.FC = ({ children }) => {
  // State
  const [session, setSession] = useState(60);
  const [shortBreak, setShortBreak] = useState(30);
  const [longBreak, setLongBreak] = useState(90);
  const [isActive, setIsActive] = useState(false);

  // Local storage key reference
  const localStorageKey = useRef("pomodoroSettings");

  // Methods
  // Save the settings in the local storage
  const setLocalStorage = () => {
    const settings = {
      session,
      shortBreak,
      longBreak
    };

    localStorage.setItem(localStorageKey.current, JSON.stringify(settings));
  }

  // Get the settings from the local storage
  const getLocalStorage = () => {
    const settings: ISettings = JSON.parse(localStorage.getItem(localStorageKey.current)!);

    if(settings) {
      setSession(settings.session);
      setShortBreak(settings.shortBreak);
      setLongBreak(settings.longBreak);
    } else {
      setLocalStorage();
    }
  }

  // Effects
  // Get the saved settings on startup
  useEffect(() => {
    getLocalStorage();
  }, [])

  // Save the settings on change
  useEffect(() => {
    setLocalStorage();
  }, [session, shortBreak, longBreak])

  return (
    <AppContext.Provider value={{
      session,
      setSession,
      shortBreak,
      setShortBreak,
      longBreak,
      setLongBreak,
      isActive,
      setIsActive
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext;