import * as femaleStyle from '@dicebear/avatars-female-sprites';
import * as gridyStyle from '@dicebear/avatars-gridy-sprites';
import * as maleStyle from '@dicebear/avatars-male-sprites';
import * as identiconStyle from '@dicebear/avatars-identicon-sprites'
import * as botttsStyle from '@dicebear/avatars-bottts-sprites'
import { createAvatar } from '@dicebear/avatars';

export const AvatarStyle = {
  FEMALE: femaleStyle,
  MALE: maleStyle,
  GRIDY: gridyStyle,
  IDENTICON: identiconStyle,
  BOTTTS: botttsStyle,
}

export const generateUserIcon = (nickname, avatarStyle) => {
  return createAvatar(AvatarStyle[avatarStyle], {
    seed: nickname,
    radius: 50,
    dataUri: true,

    // Firefox needs width and height on root svg element
    width: 58,
    height: 58,
  })
}