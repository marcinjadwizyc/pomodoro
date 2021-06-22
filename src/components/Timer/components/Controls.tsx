import { Fragment, useContext } from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import btnTitles from "../enums/btnTitles";
import styles from "../Timer.module.scss";

import AppContext from "../../../context/AppContext";
import Btn from "../../Btn/Btn";

interface IControls {
  // Is the Timer on
  isOn: boolean,
  // Start the Timer
  startHandler: () => void,
  // Toggle the Timer isOn value
  toggleHandler: () => void,
  // Reset the Timer
  resetHandler: () => void
}

const Controls: React.FC<IControls> = ({isOn, startHandler, toggleHandler, resetHandler }) => {
  // Context values
  const { isActive } = useContext(AppContext);

  // Get the buttons
  const getButtons = () => {
    if (isActive) {
      return (
        <Fragment>
          <Btn action={toggleHandler} title={isOn ? btnTitles.pause : btnTitles.start}>
            {isOn ? <FaPause /> : <FaPlay />}
          </Btn>
          <Btn action={resetHandler} title={btnTitles.reset}>
            <FaStop />
          </Btn>
        </Fragment>
      )
    }
    
    return (
      <Btn action={startHandler} title={btnTitles.start}>
        <FaPlay />
      </Btn>
    )
  }

  return (
    <div className={styles.controls}>
      {getButtons()}
    </div>
  )
};

export default Controls;