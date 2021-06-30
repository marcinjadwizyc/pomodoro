import { useState } from "react";
import { FaCog } from "react-icons/fa";
import styles from "./App.module.scss";

import Timer from "../Timer/Timer";
import Settings from "../Settings/Settings";
import Btn from "../Btn/Btn";

const App: React.FC = () => {
  // State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Methods
  const toggleIsSettingsOpen = () => {
    setIsSettingsOpen(prevState => !prevState);
  }

  return (
    <div className={styles.container}>
      <Timer />
      <Settings isOpen={isSettingsOpen} />
      <Btn action={toggleIsSettingsOpen} title="Open Settings">
        <FaCog />
      </Btn>
    </div>
  )
}

export default App;