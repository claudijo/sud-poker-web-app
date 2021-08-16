import CanvasCircle from '../canvas-shapes/circle';
import CanvasImage from '../canvas-shapes/canvas-image';
import { createAvatar } from '@dicebear/avatars';
import { AvatarStyle } from '../util/avatar';

export default function PlayerButton({ children, x, y, avatarStyle, nickname }) {

  const userIcon = 'data:image/svg+xml,' + encodeURIComponent(createAvatar(AvatarStyle[avatarStyle], {
    seed: nickname,

    // Firefox needs width and height on root svg element
    width: 44,
    height: 44,
  }));

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
        x={-22}
        y={-22}
        width={44}
        height={44}
        source={userIcon}
      />
    </CanvasCircle>

  )
}