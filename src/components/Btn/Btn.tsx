import styles from "./Btn.module.scss";

interface IBtn {
  // Action triggered on click
  action: () => void,
  // Title
  title?: string
}

const Btn: React.FC<IBtn> = ({ action, title, children }) => {
  return (
    <button 
      className={styles.btn} 
      onClick={action} 
      title={title}>
        {children}
    </button>
  )
}

Btn.defaultProps = {
  title: ""
}

export default Btn;