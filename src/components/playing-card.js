import { generateFaceUpCard } from '../util/card';
import backSideImage from '../icons/card-back-side.svg';
import { animated, useChain, useSpring, useSpringRef } from '@react-spring/web';
import { useMemo, useState } from 'react';
import Card from './card';

const AnimatedCard = animated(Card);

export function PlayingCard(
  {
    x,
    y,
    rotation = 0,
    dimmed = false,
    elevated = false,
    globalAlpha= 1,
    faceUp = true,
    card = null,
    flipDelay = 0,
  },
) {
  const faceUpImage = useMemo(() => generateFaceUpCard(card), [card?.suit, card?.rank]);

  const animatedFaceUpRef = useSpringRef();
  const animatedElevatedRef = useSpringRef()
  const animatedDimmedRef = useSpringRef()
  const animatedRotationRef = useSpringRef()

  const animatedFaceUpProps = useSpring({
    flip: faceUp ? 0 : Math.PI,
    delay: flipDelay,
    ref: animatedFaceUpRef,
  })

  const animatedDimmedProps = useSpring({
    demotion: dimmed ? 0.25 : 0,
    ref: animatedDimmedRef,
  })

  const animatedRotationProps = useSpring({
    rotation,
    animatedRotationRef,
  })

  const animatedElevatedProps = useSpring({
    elevation: elevated ? 8 : 0,
    ref: animatedElevatedRef,
  })

  useChain([
    animatedRotationRef,
    animatedFaceUpRef,
    animatedDimmedRef,
    animatedElevatedRef
  ], [
    0, 0.2, 0.4, 0.8
  ])

  return (
    <AnimatedCard
      {...animatedFaceUpProps}
      {...animatedElevatedProps}
      {...animatedRotationProps}
      {...animatedDimmedProps}
      x={x}
      y={y}
      gloabalAlpha={globalAlpha}
      width={50}
      height={70}
      frontSide={faceUpImage}
      backSide={backSideImage}
    />
  );
}