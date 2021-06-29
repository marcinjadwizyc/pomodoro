import { useContext } from "react";
import inputLabels from "./enums/inputLabels";
import styles from "./Settings.module.scss";

import AppContext from "../../context/AppContext";
import Stepper from "../Stepper/Stepper";

const Settings: React.FC = () => {
  // Context values
  const { session, shortBreak, longBreak, setSession, setShortBreak, setLongBreak} = useContext(AppContext);

  return (
    <div className={styles.settings}>
      <Stepper label={inputLabels.session} value={session} setter={setSession} />
      <Stepper label={inputLabels.short_break} value={shortBreak} setter={setShortBreak} />
      <Stepper label={inputLabels.long_break} value={longBreak} setter={setLongBreak} />
    </div>
  )
};

export default Settings;