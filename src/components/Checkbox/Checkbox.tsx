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
  // Get ID based on the label
  const getId = () => {
    return label.toLowerCase().replace(" ", "_").replace(":", "");
  }

  // Change handler
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Boolean(event.target.checked);

    setter(newValue);
  }

  return (
    <div className={styles.checkbox}>
      <label className={styles.label} htmlFor={getId()}>{label}</label>
      <div className={styles.container}>
        <div className={styles.visibleCheck} />
        <input className={styles.hiddenCheck} id={getId()} type="checkbox" checked={value} onChange={(event) => changeHandler(event)} />
      </div>
    </div>
  )
}

export default Checkbox;