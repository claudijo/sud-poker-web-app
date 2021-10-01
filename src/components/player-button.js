import { useMemo } from 'react';
import { generateUserIcon } from '../util/avatar';
import { Circle, Image } from 'react-2d-canvas';
import CircularTimeoutMeter from './circular-timeout-meter';
import { BUTTON_BACKGROUND_COLOR, BUTTON_BORDER_COLOR } from '../util/colors';

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
    <Circle
      x={x}
      y={y}
      radius={32}
      backgroundColor={BUTTON_BACKGROUND_COLOR}
      borderColor={isActing ? BUTTON_BACKGROUND_COLOR : BUTTON_BORDER_COLOR}
      borderWidth={6}
    >
      <Image
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        src={userIcon}
      />
      {isActing && (
        <CircularTimeoutMeter borderColor={BUTTON_BORDER_COLOR}/>
      )}
    </Circle>
  );
}