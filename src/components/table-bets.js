import { chipPositionOffset } from '../util/table';
import ChipStack from './chip-stack';

export default function TableBets(
  {
    centerX,
    centerY,
    potSizes,
    betSizes,
    bigBlind,
    positions,
  },
) {

  const potSize = potSizes.reduce((acc, size) => acc + size, 0)

  return (
    <>
      {
        potSize > 0 && (
          <ChipStack
            x={centerX}
            y={centerY - 60}
            size={potSize}
            bigBlind={bigBlind}
          />
        )
      }
      {
        positions.map((position, index) => {
          const { x, y } = chipPositionOffset(index, position);
          return betSizes[index] && (
            <ChipStack
              key={index}
              x={x}
              y={y}
              size={betSizes[index]}
              bigBlind={bigBlind}
            />
          );
        })
      }
    </>
  );
}