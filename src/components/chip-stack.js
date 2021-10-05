import TextLabel from './text-label';
import Chip from './chip';
import { CHIP_STACK_LABEL_BACKGROUND_COLOR, CHIP_STACK_LABEL_TEXT_COLOR, CHIP_COLOR } from '../util/colors';
import { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

const AnimatedChip = animated(Chip)

const easeInSine = x => {
  return 1 - Math.cos((x * Math.PI) / 2);
}

export default function ChipStack(
  {
    x,
    y,
    size,
    hideLabel = false,
    hideChips = false,
    opacity = 1,
  },
) {

  const [flipProps, api] = useSpring(() => (
    {
      spin: 0,
      onRest: () => {
        api.set({ spin: 0 });
      },
      config: {
        duration: 800,
        easing: easeInSine,
      },
    }
  ))

  useEffect(() => {
    api.start({ spin: 6 * 360 * Math.PI/180})
  }, [size])


  return (
    <>
      {!hideLabel && (
        <TextLabel
          x={x + 24}
          y={y}
          backgroundColor={CHIP_STACK_LABEL_BACKGROUND_COLOR}
          color={CHIP_STACK_LABEL_TEXT_COLOR}
          fontSize={28}
          fontFamily="Krungthep"
          paddingTopBottom={4}
          paddingLeftRight={8}
          radius={8}
          align="left"
        >
          {size}
        </TextLabel>
      )}
      {!hideChips && (
        <AnimatedChip {...flipProps} x={x} y={y} color={CHIP_COLOR} opacity={opacity}/>
      )}
    </>
  );
}