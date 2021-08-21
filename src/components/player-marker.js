import PlayerButton from './player-button';
import TextLabel from './text-label';
import StackLabel from './stack-label';
import NameLabel from './name-label';

export default function PlayerMarker(
  {
    children,
    x,
    y,
    avatarStyle,
    nickname,
    showFaceDownCards,
    stack,
  }
) {

  return (
    <>
      <PlayerButton
        x={x}
        y={y}
        avatarStyle={avatarStyle}
        nickname={nickname}
      />
      <StackLabel x={x} y={y - 80}>
        ${stack}
      </StackLabel>
      <NameLabel x={x} y={y + 40}>
        {nickname}
      </NameLabel>
    </>
  );
}