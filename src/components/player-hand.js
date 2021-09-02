import FaceUpCard from './face-up-card';
import { useSpring, useChain, animated, useSpringRef } from '@react-spring/web';
import dealCardAudio from '../audio/deal-card.mp3';
import { Sound } from '../lib/sound';
import React from 'react';

const AnimatedFaceUpCard = animated(FaceUpCard);
const dealCardSound = new Sound(dealCardAudio)

export default function PlayerHand({ x, y, holeCards }) {
  const slideDownRef = useSpringRef()
  const slideSideRef = useSpringRef()

  const slideSideProps = useSpring({
    to: { x: x + 40 },
    from: { x: x + 98 },
    onStart: () => {
      dealCardSound.play()
    },
    ref: slideSideRef
  })

  const slideDownProps = useSpring({
    to: { y: y - 36, globalAlpha: 1 },
    from: { y: y - 82, globalAlpha: 0 },
    onStart: () => {
      dealCardSound.play()
    },
    ref: slideDownRef
  })

  useChain([slideDownRef, slideSideRef], [0, 0.5])

  return (
    <>
      <AnimatedFaceUpCard
        {...slideSideProps}
        {...slideDownProps}
        rank={holeCards[1].rank}
        suit={holeCards[1].suit}
      />
      <AnimatedFaceUpCard
        {...slideDownProps}
        x={x + 98}
        rank={holeCards[0].rank}
        suit={holeCards[0].suit}
      />
    </>
  );
}