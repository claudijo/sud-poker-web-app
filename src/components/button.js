import * as styles from './button.module.css';
import classNames from 'classnames';

export default function Button({ children, type= 'button', theme = '', ...props }) {
  return (
    <button
      {...props}
      type={type}
      className={classNames.call(null, [styles.button, ...theme.split(' ').map(theme => styles[theme])])}
    >
      {children}
    </button>
  );
}