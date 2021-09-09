import PlayerButton from './player-button';
import StackLabel from './stack-label';
import NameLabel from './name-label';
import FaceDownCard from './face-down-card';
import { useEffect } from 'react';

export default function PlayerMarker(
  {
    x,
    y,
    avatarStyle,
    nickname,
    showFaceDownCards,
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
      {showFaceDownCards && (
        <>
          <FaceDownCard
            x={x + 65}
            y={y - 44}
            rotation={20 * Math.PI / 180}
          />
          <FaceDownCard
            x={x + 35}
            y={y - 36}
          />
        </>
      )}
    </>
  );
}