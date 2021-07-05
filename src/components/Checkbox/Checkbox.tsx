import getId from "../../helpers/getId";
import styles from "./Checkbox.module.scss";

interface ICheckbox {
  // Checkbox value
  value: boolean,
  // Value setter
  setter: React.Dispatch<React.SetStateAction<boolean>>,
  // Label
  label: string
}

const Checkbox: React.FC<ICheckbox> = ({ value, setter, label }) => {
  // Methods
  // Change handler
  const changeHandler = () => {
    setter(prevState => !prevState);
  }

  // Get check classes
  const getClasses = () => {
    return [styles.check, value ? styles["check--checked"] : null].join(" ");
  }

  return (
    <div className={styles.checkbox}>
      <label className={styles.label} htmlFor={getId(label)}>{label}</label>
      <div className={styles.container}>
        <div className={getClasses()} id={getId(label)} role="checkbox" aria-checked={value} onClick={changeHandler} />
      </div>
    </div>
  )
}

export default Checkbox;