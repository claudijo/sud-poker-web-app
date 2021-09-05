import { chipPositionOffset } from '../util/table';
import ChipStack from './chip-stack';
import { animated, useTransition, config } from '@react-spring/web';
import { useMemo, useState } from 'react';

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
  });

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