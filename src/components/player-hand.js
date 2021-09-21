import { useSpring, useChain, animated, useSpringRef } from '@react-spring/web';
import dealCardAudio from '../audio/deal-card.mp3';
import { Sound } from '../lib/sound';
import React, { useEffect, useState } from 'react';
import { isWinningCard } from '../util/card';
import { PlayingCard } from './playing-card';

const AnimatedPlayingCard = animated(PlayingCard)
const dealCardSound = new Sound(dealCardAudio);

export default function PlayerHand({ x, y, holeCards, rtl, winners }) {
  const slideDownRef = useSpringRef();
  const slideSideRef = useSpringRef();

  const offset = rtl ? -196 : 0;

  const slideSideProps = useSpring({
    to: { x: x + 15 + offset },
    from: { x: x + 73 + offset },
    onStart: () => {
      dealCardSound.play();
    },
    ref: slideSideRef,
  });

  const slideDownProps = useSpring({
    to: { y: y - 71, globalAlpha: 1 },
    from: { y: y - 141, globalAlpha: 0 },
    onStart: () => {
      dealCardSound.play();
    },
    ref: slideDownRef,
  });

  useChain([slideDownRef, slideSideRef], [0, 0.5]);

  return (
    <>
      <AnimatedPlayingCard
        {...slideSideProps}
        {...slideDownProps}
        card={holeCards[1]}
        elevated={isWinningCard(winners, holeCards[1])}
      />
      <AnimatedPlayingCard
        {...slideDownProps}
        x={x + 73 + offset}
        card={holeCards[0]}
        elevated={isWinningCard(winners, holeCards[0])}
        animationDelay={100}
      />
    </>
  );
}