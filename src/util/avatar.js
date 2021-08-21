import * as femaleStyle from '@dicebear/avatars-female-sprites';
import * as gridyStyle from '@dicebear/avatars-gridy-sprites';
import * as maleStyle from '@dicebear/avatars-male-sprites';
import * as initialsStyle from '@dicebear/avatars-initials-sprites'
import { createAvatar } from '@dicebear/avatars';

export const AvatarStyle = {
  FEMALE: femaleStyle,
  MALE: maleStyle,
  GRIDY: gridyStyle,
  INITIALS: initialsStyle,
}

export const generateUserIcon = (nickname, avatarStyle) => {
  return createAvatar(AvatarStyle[avatarStyle], {
    seed: nickname,
    radius: 50,
    background: '#89d9d1',
    backgroundColors: [],
    dataUri: true,

    // Firefox needs width and height on root svg element
    width: 58,
    height: 58,
    // margin: avatarStyle === 'INITIALS' ? 8 : 0,
  })
}