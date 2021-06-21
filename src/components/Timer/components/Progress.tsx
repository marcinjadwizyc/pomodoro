import styles from "../Timer.module.scss";

const Progress: React.FC = ({ children }) => {
  return (
    <div className={styles.progress}>
      {children}
    </div>
  )
};

export default Progress;