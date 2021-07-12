/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useRef, useEffect } from "react";

interface IAppContext {
	// Session time in minutes
	session: number;
	// Session time setter
	setSession: React.Dispatch<React.SetStateAction<number>>;
	// Short break time in minutes
	shortBreak: number;
	// Short break time setter
	setShortBreak: React.Dispatch<React.SetStateAction<number>>;
	// Long break time in minutes
	longBreak: number;
	// Long break time setter
	setLongBreak: React.Dispatch<React.SetStateAction<number>>;
	// Is alarm sound on
	isAlarmOn: boolean;
	// Alarm sound setter
	setIsAlarmOn: React.Dispatch<React.SetStateAction<boolean>>;
	// Is Timer active
	isActive: boolean;
	// isActive setter
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

// Settings object interface
interface ISettings {
	session: number;
	shortBreak: number;
	longBreak: number;
	isAlarmOn: boolean;
}

const AppContext = createContext<IAppContext>(undefined!);

export const AppContextProvider: React.FC = ({ children }) => {
	// State
	const [ session, setSession ] = useState(25); // 25 min
	const [ shortBreak, setShortBreak ] = useState(5); // 5 min
	const [ longBreak, setLongBreak ] = useState(15); // 15 min
	const [ isAlarmOn, setIsAlarmOn ] = useState(false);
	const [ isActive, setIsActive ] = useState(false);

	// Local storage key reference
	const localStorageKey = useRef("pomodoroSettings");

	// Methods
	// Save the settings in the local storage
	const setLocalStorage = () => {
		const settings = {
			session,
			shortBreak,
			longBreak,
			isAlarmOn
		};

		localStorage.setItem(localStorageKey.current, JSON.stringify(settings));
	};

	// Get the settings from the local storage
	const getLocalStorage = () => {
		const settings: ISettings = JSON.parse(localStorage.getItem(localStorageKey.current)!);

		if (settings) {
			setSession(settings.session);
			setShortBreak(settings.shortBreak);
			setLongBreak(settings.longBreak);
			setIsAlarmOn(settings.isAlarmOn);
		} else {
			setLocalStorage();
		}
	};

	// Effects
	// Get the saved settings on startup
	useEffect(() => {
		getLocalStorage();
	}, []);

	// Save the settings on change
	useEffect(
		() => {
			setLocalStorage();
		},
		[ session, shortBreak, longBreak, isAlarmOn ]
	);

	return (
		<AppContext.Provider
			value={{
				session,
				setSession,
				shortBreak,
				setShortBreak,
				longBreak,
				setLongBreak,
				isAlarmOn,
				setIsAlarmOn,
				isActive,
				setIsActive
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
