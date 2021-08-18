import PlayerButton from './player-button';
import CanvasText from '../canvas-shapes/canvas-text';
import TextLabel from './text-label';

export default function PlayerMarker({ children, x, y, avatarStyle, nickname, showFaceDownCards }) {

  return (
    <>
      <PlayerButton
        x={x}
        y={y}
        avatarStyle={avatarStyle}
        nickname={nickname}
      />
      <TextLabel
        x={x}
        y={y + 24}
        center={true}
        backgroundColor="#009557"
      >
        {nickname}
      </TextLabel>
    </>
  );
}