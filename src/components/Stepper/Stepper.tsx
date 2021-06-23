/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import btnTitles from "./enums/btnTitles";
import styles from "./Stepper.module.scss";

interface IStepper {
  // Input value in seconds
  value: number,
  // Value setter
  setter: React.Dispatch<React.SetStateAction<number>>,
  // Label
  label: string,
  // Min value in minutes - optional
  min?: number,
  // Max value in minutes - optional
  max?: number
}

const Stepper: React.FC<IStepper> = ({ value, setter, label, min, max }) => { 
  // State
  const [valueInMinutes, setValueInMinutes] = useState(value / 60);

  // Methods
  // Get ID based on the label
  const getId = () => {
    return label.toLowerCase().replace(" ", "_").replace(":", "");
  }

  // Add 1 minute to the value
  const add = () => {
    console.log(valueInMinutes, min, max);
    if (valueInMinutes < max!) {
      setValueInMinutes(prevState => prevState + 1);
    }
  }

  // Subtract 1 minute from the value
  const subtract = () => {
    if (valueInMinutes > min!) {
      setValueInMinutes(prevState => prevState - 1);
    }
  }

  // Handle value change from the input
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);

    if (newValue <= max! && newValue >= min!) {
      setValueInMinutes(newValue);
    }
  }

  // Effect
  // Set parent value on every change of the internal state
  useEffect(() => {
    setter(valueInMinutes * 60);
  }, [valueInMinutes])

  return (
    <div className={styles.stepper}>
      <label htmlFor={getId()} className={styles.label}>{ label }</label>
      <div className={styles.container}>
        <button className={styles.btn} title={btnTitles.sub} onClick={subtract}>
          <FaMinus />
        </button>
        <input id={getId()} className={styles.input} type="text" value={valueInMinutes} onChange={event => changeHandler(event)} />
        <button className={styles.btn} title={btnTitles.add} onClick={add}>
          <FaPlus />
        </button>
      </div>
    </div>
  )
};

Stepper.defaultProps = {
  min: 1,
  max: 60
}

export default Stepper;