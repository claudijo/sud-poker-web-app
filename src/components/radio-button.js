import * as styles from './radio-button.module.css';
import classNames from 'classnames';

export default function RadioButton(
  {
    children,
    name,
    value,
    disabled,
    onChange,
    checked,
    onClick,
  },
) {

  return (
    <label
      className={classNames(styles.radioButton, {
        [styles.enabled]: !disabled,
        [styles.disabled]: disabled,
        [styles.checked]: checked,
      })}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
      />
      <span className={styles.checkBackground}></span>
      <span className={styles.label}>
        {children}
      </span>
    </label>
  );
}