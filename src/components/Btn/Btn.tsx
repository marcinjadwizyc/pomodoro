import styles from "./Btn.module.scss";

interface IBtn {
  // Button action
  action: () => void,
  // Button title - optional
  title?: string
}

const Btn: React.FC<IBtn> = ({ action, title, children }) => {
  return (
    <button className={styles.btn} onClick={action} title={title}>
        {children}
    </button>
  )
}

Btn.defaultProps = {
  title: ""
}

export default Btn;