import { FaCheck } from "react-icons/fa";
import getId from "../../helpers/getId";
import checkboxTitles from "./enums/checkboxTitles";
import styles from "./Checkbox.module.scss";

interface ICheckbox {
	// Checkbox value
	value: boolean;
	// Value setter
	setter: React.Dispatch<React.SetStateAction<boolean>>;
	// Label
	label: string;
}

const Checkbox: React.FC<ICheckbox> = ({ value, setter, label }) => {
	// Variables
	const id = getId(label);

	// Methods
	// Change handler
	const changeHandler = () => {
		setter((prevState) => !prevState);
	};

	// Change handler on key down
	const changeHandlerOnKey = (event: React.KeyboardEvent) => {
		if (event.code === "Enter" || event.code === "Space") {
			setter((prevState) => !prevState);
		}
	};

	return (
		<div className={styles.checkbox}>
			<label className={styles.label} htmlFor={id} onClick={changeHandler}>
				{label}
			</label>
			<div className={styles.container}>
				<div
					className={styles.check}
					id={id}
					tabIndex={0}
					role="checkbox"
					aria-checked={value}
					onClick={changeHandler}
					title={value ? checkboxTitles.off : checkboxTitles.on}
					onKeyDown={changeHandlerOnKey}
				>
					{value ? <FaCheck /> : null}
				</div>
			</div>
		</div>
	);
};

export default Checkbox;
