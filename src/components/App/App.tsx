import styles from "./App.module.scss";

import Timer from "../Timer/Timer";
import Settings from "../Settings/Settings";

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Timer />
      <Settings />
    </div>
  )
}

export default App;