import TextLabel from './text-label';
import Chip from './chip';

export default function ChipStack({ x, y, size, bigBlind, globalAlpha = 1 }) {
  return (
    <>
      { globalAlpha === 1 && (
        <TextLabel
          x={x}
          y={y}
          backgroundColor="#fff"
          color="#666"
          fontSize={28}
          fontFamily="Krungthep"
          paddingTop={4}
          paddingBottom={4}
          paddingLeft={8}
          paddingRight={8}
          radius={8}
        >
          {size}
        </TextLabel>
      )}
      <Chip x={x - 26} y={y + 18} color="#e16057" globalAlpha={globalAlpha}/>
      { size === bigBlind && (
        <Chip x={x - 26} y={y + 10} color="#e16057" globalAlpha={globalAlpha}/>
      )}
      {
        size > bigBlind && (
          <>
            <Chip x={x - 52} y={y + 18} color="#e16057" globalAlpha={globalAlpha}/>
            <Chip x={x - 40} y={y + 10} color="#555555" globalAlpha={globalAlpha}/>
          </>
        )
      }
    </>
  );
}