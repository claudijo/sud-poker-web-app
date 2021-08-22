import PlayerButton from './player-button';
import StackLabel from './stack-label';
import NameLabel from './name-label';
import FaceDownCard from './face-down-card';

export default function PlayerMarker(
  {
    x,
    y,
    avatarStyle,
    nickname,
    showFaceDownCards,
    stack,
  },
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
      {showFaceDownCards && (
        <>
          <FaceDownCard
            x={x + 65}
            y={y - 38}
            rotation={20 * Math.PI / 180}
          />
          <FaceDownCard
            x={x + 35}
            y={y - 32}
          />
        </>
      )}
    </>
  );
}