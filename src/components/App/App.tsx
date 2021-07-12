import { useState } from "react";
import { FaCog } from "react-icons/fa";
import btnTypes from "../Btn/enums/btnTypes";
import settingsTitles from "./enums/settingsTitles";
import styles from "./App.module.scss";

import Timer from "../Timer/Timer";
import Settings from "../Settings/Settings";
import Btn from "../Btn/Btn";

const App: React.FC = () => {
	// State
	const [ isSettingsOpen, setIsSettingsOpen ] = useState(false);

	// Methods
	// Toggle isSettingsOpen
	const toggleIsSettingsOpen = () => {
		setIsSettingsOpen((prevState) => !prevState);
	};

	return (
		<div className={styles.container}>
			<Timer />
			<Settings isOpen={isSettingsOpen} />
			<Btn
				action={toggleIsSettingsOpen}
				type={btnTypes.square}
				title={isSettingsOpen ? settingsTitles.close : settingsTitles.open}
			>
				<FaCog />
			</Btn>
		</div>
	);
};

export default App;
