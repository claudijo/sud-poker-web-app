import { useMemo } from 'react';
import { generateUserIcon } from '../util/avatar';
import CanvasCircle from '../canvas-shapes/circle';
import CanvasImage from '../canvas-shapes/canvas-image';

export default function PlayerButton({x, y, avatarStyle, nickname}) {
  const userIcon = useMemo(() => {
    return generateUserIcon(nickname, avatarStyle);
  }, [nickname, avatarStyle]);

  const avatarSize = 48;

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
        x={-avatarSize / 2}
        y={-avatarSize / 2}
        width={avatarSize}
        height={avatarSize}
        source={userIcon}
      />
    </CanvasCircle>
  );
}