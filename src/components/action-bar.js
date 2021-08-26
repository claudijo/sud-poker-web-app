import styles from './action-bar.module.css';

export default function ActionBar(
  {
    children,
  },
) {
  return (
    <div className={styles.actionBar}>
      {children}
    </div>
  );
}