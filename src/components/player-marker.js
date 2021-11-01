import PlayerButton from './player-button';
import StackLabel from './stack-label';
import NameLabel from './name-label';
import { capitalizeFirstLetter } from '../lib/text';
import { rankingDescriptions } from '../util/card';

export default function PlayerMarker(
  {
    x,
    y,
    avatarStyle,
    nickname,
    stack,
    isActing,
    action = '',
    winner,
  },
) {

  const flash = action
    ? capitalizeFirstLetter(action)
    : winner ?
      capitalizeFirstLetter(rankingDescriptions[winner.ranking])
      : '';

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
        flash={flash}
      >
        {nickname}
      </NameLabel>
    </>
  );
}