import PlayerButton from './player-button';
import TextLabel from './text-label';

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
      <TextLabel
        x={x}
        y={y - 80}
        backgroundColor="#e16057"
        color="#fff"
        fontSize={24}
        fontFamily="Krungthep"
        paddingTop={8}
        paddingBottom={8}
        paddingLeft={12}
        paddingRight={12}
        radius={16}
        borderColor="#fff"
        borderWidth={4}
        originX={-0.5}
      >
        ${stack}
      </TextLabel>
      <TextLabel
        x={x}
        y={y + 40}
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
        minWidth={60}
        maxWidth={100}
        originX={-0.5}
      >
        {nickname}
      </TextLabel>
    </>
  );
}