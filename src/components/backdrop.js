import styles from './backdrop.module.css'

export default function Backdrop({ children }) {
  return (
    <div className={styles.backdrop}>
      {children}
    </div>
  )
}