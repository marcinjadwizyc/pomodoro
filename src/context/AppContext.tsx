import React, { createContext, useState } from "react";

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

const AppContext = createContext<IAppContext>(undefined!);

export const AppContextProvider: React.FC = ({ children }) => {
  // State
  const [session, setSession] = useState(5);
  const [shortBreak, setShortBreak] = useState(2);
  const [longBreak, setLongBreak] = useState(4);
  const [isActive, setIsActive] = useState(false);

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