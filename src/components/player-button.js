import { useMemo } from 'react';
import { generateUserIcon } from '../util/avatar';
import CanvasCircle from '../canvas-shapes/circle';
import CanvasImage from '../canvas-shapes/canvas-image';
import CircularTimeoutMeter from './circular-timeout-meter';

const AVATAR_SIZE = 48;

export default function PlayerButton(
  {
    x,
    y,
    avatarStyle,
    nickname,
    isActing,
  },
) {
  const userIcon = useMemo(() => {
    return generateUserIcon(nickname, avatarStyle);
  }, [nickname, avatarStyle]);

  return (
    <CanvasCircle
      x={x}
      y={y}
      radius={32}
      fillStyle="#89d9d1"
      strokeStyle={isActing ? '#89d9d1' : '#009557'}
      lineWidth={6}
    >
      <CanvasImage
        x={-AVATAR_SIZE / 2}
        y={-AVATAR_SIZE / 2}
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        src={userIcon}
      />
      {isActing && (
        <CircularTimeoutMeter/>
      )}
    </CanvasCircle>
  );
}