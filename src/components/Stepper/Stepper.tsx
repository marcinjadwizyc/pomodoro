/* eslint-disable react-hooks/exhaustive-deps */
import { FaPlus, FaMinus } from "react-icons/fa";
import btnTitles from "./enums/btnTitles";
import getId from "../../helpers/getId";
import styles from "./Stepper.module.scss";
import React from "react";

interface IStepper {
	// Input value in seconds
	value: number;
	// Value setter
	setter: React.Dispatch<React.SetStateAction<number>>;
	// Label
	label: string;
	// Min value in minutes - optional
	min?: number;
	// Max value in minutes - optional
	max?: number;
}

const Stepper: React.FC<IStepper> = ({ value, setter, label, min, max }) => {
	// Variables
	const id = getId(label);

	// Methods
	// Add 1 minute to the value
	const add = () => {
		if (value < max!) {
			setter((prevState) => prevState + 1);
		}
	};

	// Subtract 1 minute from the value
	const subtract = () => {
		if (value > min!) {
			setter((prevState) => prevState - 1);
		}
	};

	// Handle value change on the input
	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(event.target.value);

		if (newValue >= min! && newValue <= max!) {
			setter(newValue);
		}
	};

	return (
		<div className={styles.stepper}>
			<label htmlFor={id} className={styles.label}>
				{label}
			</label>
			<div className={styles.container}>
				<button className={styles.btn} title={btnTitles.sub} onClick={subtract}>
					<FaMinus />
				</button>
				<input
					id={id}
					className={styles.input}
					type="text"
					value={value}
					onChange={(event) => changeHandler(event)}
				/>
				<button className={styles.btn} title={btnTitles.add} onClick={add}>
					<FaPlus />
				</button>
			</div>
		</div>
	);
};

Stepper.defaultProps = {
	min: 1,
	max: 60
};

export default Stepper;
