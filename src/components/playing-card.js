import CanvasImage from '../canvas-shapes/canvas-image';
import { generateFaceUpCard } from '../util/card';
import CanvasRectangle from '../canvas-shapes/rectangle';
import backSideImage from '../icons/card-back-side.svg';
import { animated, useSpring } from '@react-spring/web';
import { useMemo, useState } from 'react';
import Card from './card';

const AnimatedCard = animated(Card);

export function PlayingCard(
  {
    x,
    y,
    rotation,
    dimmed,
    elevated,
    globalAlpha= 1,
    faceUp = true,
    card,
    flipDelay = 0,
  },
) {
  const faceUpImage = useMemo(() => generateFaceUpCard(card), [card?.suit, card?.rank]);

  const animatedFaceUpProps = useSpring({
    flip: faceUp ? 0 : Math.PI,
    delay: flipDelay,
  })

  const animatedDimmedProps = useSpring({
    globalAlpha: dimmed ? 0.5 : globalAlpha,
  })

  const animatedRotationProps = useSpring({
    rotation,
  })

  const animatedElevatedProps = useSpring({
    elevation: elevated ? 8 : 0,
  })

  return (
    <AnimatedCard
      {...animatedFaceUpProps}
      {...animatedElevatedProps}
      {...animatedRotationProps}
      {...animatedDimmedProps}
      x={x}
      y={y}
      width={50}
      height={70}
      frontSide={faceUpImage}
      backSide={backSideImage}
    />
  );
}