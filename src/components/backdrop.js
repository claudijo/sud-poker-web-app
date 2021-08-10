import styles from './backdrop.module.css'
import classNames from 'classnames';

export default function Backdrop({ children, blurred = false }) {
  return (
    <div className={classNames(styles.backdrop, { [styles.blurred]: blurred })}>
      {children}
    </div>
  )
}