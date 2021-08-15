import * as styles from './button.module.css';
import classNames from 'classnames';

export default function Button({ children, disabled, wide, theme = 'primary', onClick }) {
  return (
    <button
      className={classNames(styles.button, styles[theme], {
        [styles.wide]: wide,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}