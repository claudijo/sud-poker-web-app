import { chipPositionOffset } from '../util/table';
import ChipStack from './chip-stack';
import { animated, useTransition, config } from '@react-spring/web';
import { useEffect, useState } from 'react';

const AnimatedChipStack = animated(ChipStack);

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
  const potSize = potSizes.reduce((acc, size) => acc + size, 0);

  const sparseBetSizes = betSizes.reduce((acc, betSize, index) => {
    if (!betSize) return acc;
    acc.push({ betSize, index });
    return acc;
  }, []);

  const [isPotSizeHidden, setIsPotSizeHidden] = useState(true)

  useEffect(() => {
    if (isPotSizeHidden) {
      if (potSize > 0) {
        setIsPotSizeHidden(false)
      }
    } else {
      if (potSize === 0) {
        setIsPotSizeHidden(true)
      }
    }
  }, [potSize, isPotSizeHidden, setIsPotSizeHidden])

  const transitions = useTransition(sparseBetSizes, {
    leave: { x: centerX, y: centerY - 60, globalAlpha: 0 },
    from: (betSize) => {
      const position = positions[betSize.index];
      const { x, y } = chipPositionOffset(betSize.index, position);
      return { x, y, globalAlpha: 1 };
    },
    keys: item => item.index,
    delay: 800,
    config: config.slow,
    onRest: () => {
      setIsPotSizeHidden(false)
    }
  });

  return (
    <>
      {
        !isPotSizeHidden && (
          <ChipStack
            x={centerX}
            y={centerY - 60}
            size={potSize}
            bigBlind={bigBlind}
          />
        )
      }
      {
        transitions((animatedProps, item, transition, index) => {
          return (
            <AnimatedChipStack
              {...animatedProps}
              size={item.betSize}
              bigBlind={bigBlind}
            />
          );
        })
      }
    </>
  );
}