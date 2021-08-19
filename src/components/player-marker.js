import PlayerButton from './player-button';
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
        y={y + 40}
        center={true}
        backgroundColor="#009557"
        color="#fff"
        fontSize={20}
        fontFamily="Krungthep"
        paddingTop={8}
        paddingBottom={8}
        paddingLeft={12}
        paddingRight={12}
        radius={16}
        borderColor="#fff"
        borderWidth={4}
      >
        {nickname}
      </TextLabel>
    </>
  );
}