import PlayerButton from './player-button';
import StackLabel from './stack-label';
import NameLabel from './name-label';
import { capitalizeFirstLetter } from '../lib/text';

export default function PlayerMarker(
  {
    x,
    y,
    avatarStyle,
    nickname,
    stack,
    isActing,
    action = '',
  },
) {
  return (
    <>
      <PlayerButton
        x={x}
        y={y}
        avatarStyle={avatarStyle}
        nickname={nickname}
        isActing={isActing}
      />
      <StackLabel x={x} y={y - 56}>
        {stack}
      </StackLabel>
      <NameLabel
        x={x}
        y={y + 54}
        flash={capitalizeFirstLetter(action)}
      >
        {nickname}
      </NameLabel>
    </>
  );
}