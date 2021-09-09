import PlayerButton from './player-button';
import StackLabel from './stack-label';
import NameLabel from './name-label';

export default function PlayerMarker(
  {
    x,
    y,
    avatarStyle,
    nickname,
    stack,
    isActing,
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
      <StackLabel x={x} y={y - 78}>
        {stack}
      </StackLabel>
      <NameLabel x={x} y={y + 37}>
        {nickname}
      </NameLabel>
    </>
  );
}