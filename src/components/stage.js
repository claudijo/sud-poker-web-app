import styles from './stage.module.css'

export default function Stage({ width, height, children}) {
    return (
        <div className={styles.stage} style={{width, height}}>
            {children}
        </div>
    )
}