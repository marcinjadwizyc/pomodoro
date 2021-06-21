import styles from "../Timer.module.scss";

import Btn from "../../Btn/Btn";

interface IControls {
  // Toggle Timer isOn flag
  isOnHandler: () => void,
  // Reset Timer
  resetHandler: () => void
}

const Controls: React.FC<IControls> = ({ isOnHandler, resetHandler }) => {
  return (
    <div className={styles.controls}>
      <Btn action={isOnHandler}>Start/Pause</Btn>
      <Btn action={resetHandler}>Reset</Btn>
    </div>
  )
};

export default Controls;