import * as styles from './button.module.css';
import classNames from 'classnames';

export default function Button({ children, wide, theme = 'primary' }) {
  return (
    <button className={classNames(styles.button, styles[theme], {
      [styles.wide]: wide,
    })}>{children}</button>
  );
}