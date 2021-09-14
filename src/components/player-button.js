import { useMemo } from 'react';
import { generateUserIcon } from '../util/avatar';
import CanvasCircle from '../canvas-shapes/circle';
import CanvasImage from '../canvas-shapes/canvas-image';
import CircularTimeoutMeter from './circular-timeout-meter';

const AVATAR_SIZE = 48;
const BUTTON_BACKGROUND_COLOR = '#CBEDC6'
const BUTTON_BORDER_COLOR = '#29A079'

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
      fillStyle={BUTTON_BACKGROUND_COLOR}
      strokeStyle={isActing ? BUTTON_BACKGROUND_COLOR : BUTTON_BORDER_COLOR}
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
        <CircularTimeoutMeter strokeStyle={BUTTON_BORDER_COLOR}/>
      )}
    </CanvasCircle>
  );
}