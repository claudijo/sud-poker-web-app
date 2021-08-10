import { createAvatar } from '@dicebear/avatars';
import * as femaleStyle from '@dicebear/avatars-female-sprites';
import * as gridyStyle from '@dicebear/avatars-gridy-sprites';
import * as maleStyle from '@dicebear/avatars-male-sprites';
import * as initialsStyle from '@dicebear/avatars-initials-sprites'
import styles from './avatar.module.css'

export const AvatarStyle = {
  FEMALE: femaleStyle,
  MALE: maleStyle,
  GRIDY: gridyStyle,
  INITIALS: initialsStyle,
}

export default function Avatar({children, style, ...options}) {
  return (
    <div className={styles.avatar} dangerouslySetInnerHTML={{
      __html: createAvatar(style, options),
    }}/>
  )
}