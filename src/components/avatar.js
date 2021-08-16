import { createAvatar } from '@dicebear/avatars';
import styles from './avatar.module.css'

export default function Avatar({children, style, ...options}) {
  return (
    <div className={styles.avatar} dangerouslySetInnerHTML={{
      __html: createAvatar(style, options),
    }}/>
  )
}