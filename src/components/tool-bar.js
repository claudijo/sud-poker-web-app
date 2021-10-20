import styles from './tool-bar.module.css';

export default function ToolBar(
  {
    children,
  },
) {
  return (
    <div className={styles.toolBar}>
      {children}
    </div>
  );
}