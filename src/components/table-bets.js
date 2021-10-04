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
    positions,
  },
) {
  const tablePotX = centerX;
  const tablePotY = centerY - 64;

  const potSize = potSizes.reduce((acc, size) => acc + size, 0);

  const chipStacks = betSizes.reduce((acc, betSize, index) => {
    if (!betSize) return acc;
    const position = positions[index];
    const { x, y } = chipPositionOffset(index, position);
    acc.push({ betSize, index, x, y });
    return acc;
  }, [])

  const transitions = useTransition(chipStacks, {
    leave: { x: tablePotX, y: tablePotY, opacity: 0 },
    from: (chipStack) => {
      const { x, y } = chipStack
      return { x, y, opacity: 1 };
    },
    keys: chipStack => chipStack.index,
    config: config.slow,
  });

  return (
    <>
      {
        potSize > 0 && (
          <ChipStack
            x={tablePotX}
            y={tablePotY}
            size={potSize}
          />
        )
      }
      {
        // Display chips only (will animate on remove)
        transitions((animatedProps, item, transition, index) => {
          return (
            <AnimatedChipStack
              {...animatedProps}
              size={item.betSize}
              hideLabel={true}
            />
          );
        })
      }
      {
        // Display labels only
        chipStacks.map(({index, betSize, x, y}) => (
          <ChipStack
            key={`${index}:${betSize}`}
            x={x}
            y={y}
            size={betSize}
            hideChips={true}
          />
        ))
      }
    </>
  );
}