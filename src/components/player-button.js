import CanvasCircle from '../canvas-shapes/circle';
import CanvasImage from '../canvas-shapes/canvas-image';
import { createAvatar } from '@dicebear/avatars';
import { AvatarStyle } from '../util/avatar';
import { useMemo } from 'react';

export default function PlayerButton({ children, x, y, avatarStyle, nickname }) {

  const userIcon = useMemo(() => {
    return 'data:image/svg+xml,' + encodeURIComponent(createAvatar(AvatarStyle[avatarStyle], {
      seed: nickname,
      radius: 50,

      // Firefox needs width and height on root svg element
      width: 58,
      height: 58,
      margin: avatarStyle === 'INITIALS' ? 8 : 0,
    }))
  }, [nickname, avatarStyle]);

  const avatarSize = avatarStyle === 'INITIALS' ? 70 : 48;

  return (
    <CanvasCircle
      x={x}
      y={y}
      radius={32}
      fillStyle="#89d9d1"
      strokeStyle="#009557"
      lineWidth={6}
    >
      <CanvasImage
        x={-avatarSize/2}
        y={-avatarSize/2}
        width={avatarSize}
        height={avatarSize}
        source={userIcon}
      />
    </CanvasCircle>
  )
}