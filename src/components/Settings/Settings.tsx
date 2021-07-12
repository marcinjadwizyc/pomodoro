import { useContext } from "react";
import inputLabels from "./enums/inputLabels";
import classModifiers from "./enums/classModifiers";
import styles from "./Settings.module.scss";

import AppContext from "../../context/AppContext";
import Stepper from "../Stepper/Stepper";
import Separator from "../Separator/Separator";
import Checkbox from "../Checkbox/Checkbox";

interface ISettings {
	// Is Settings open
	isOpen: boolean;
}

const Settings: React.FC<ISettings> = ({ isOpen }) => {
	// Context values
	const {
		session,
		shortBreak,
		longBreak,
		isAlarmOn,
		setSession,
		setShortBreak,
		setLongBreak,
		setIsAlarmOn
	} = useContext(AppContext);

	// Methods
	// Get Settings classes
	const getClasses = () => {
		return [ styles.settings, isOpen ? styles[classModifiers.visible] : styles[classModifiers.hidden] ].join(" ");
	};

	return (
		<div className={getClasses()}>
			<Stepper label={inputLabels.session} value={session} setter={setSession} />
			<Stepper label={inputLabels.short_break} value={shortBreak} setter={setShortBreak} />
			<Stepper label={inputLabels.long_break} value={longBreak} setter={setLongBreak} />
			<Separator />
			<Checkbox label={inputLabels.alarm} value={isAlarmOn} setter={setIsAlarmOn} />
		</div>
	);
};

export default Settings;
