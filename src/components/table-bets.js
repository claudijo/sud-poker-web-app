import StackLabel from './stack-label';
import { chipPositionOffset } from '../util/table';
import ChipStack from './chip-stack';

export default function TableBets(
  {
    potSizes,
    betSizes,
    bigBlind,
    positions,
  },
) {
  return (
    <>
      {
        positions.map((position, index) => {
          if (!betSizes[index]) {
            return null;
          }

          const { x, y } = chipPositionOffset(index, position);
          return (
            <ChipStack
              key={index}
              x={x}
              y={y}
              betSize={betSizes[index]}
              bigBlind={bigBlind}
            />
          );
        })
      }
    </>
  );
}