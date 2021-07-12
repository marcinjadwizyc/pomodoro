import btnTypes from "./enums/btnTypes";
import styles from "./Btn.module.scss";

interface IBtn {
	// Button action
	action: () => void;
	// Button type - optional
	type?: btnTypes;
	// Button title - optional
	title?: string;
}

const Btn: React.FC<IBtn> = ({ action, type, title, children }) => {
	// Methods
	// Get Btn classes
	const getClasses = () => {
		return [ styles.btn, styles[`btn--${type}`] ].join(" ");
	};

	return (
		<button className={getClasses()} onClick={action} title={title}>
			{children}
		</button>
	);
};

Btn.defaultProps = {
	type: btnTypes.default,
	title: ""
};

export default Btn;
