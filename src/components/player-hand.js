import FaceUpCard from './face-up-card';
import { useSpring, useChain, animated, useSpringRef } from '@react-spring/web';

const AnimatedFaceUpCard = animated(FaceUpCard);

export default function PlayerHand({ x, y, holeCards = [] }) {
  const slideDownRef = useSpringRef()
  const slideSideRef = useSpringRef()

  const slideSideProps = useSpring({
    to: { x: x + 40 },
    from: { x: x + 88 },
    onStart: () => {
      console.log('Start slide side')
    },
    ref: slideSideRef
  })

  const slideDownProps = useSpring({
    to: { y: y - 32, globalAlpha: 1 },
    from: { y: y - 82, globalAlpha: 0 },
    onStart: () => {
      console.log('Start slide down')
    },
    ref: slideDownRef
  })

  useChain([slideDownRef, slideSideRef], [0, 0.5])

  return (
    <>
      {holeCards.length === 2 && (
        <>
          <AnimatedFaceUpCard
            {...slideSideProps}
            {...slideDownProps}
            rank={holeCards[1].rank}
            suit={holeCards[1].suit}
          />
          <AnimatedFaceUpCard
            {...slideDownProps}
            x={x + 88}
            rank={holeCards[0].rank}
            suit={holeCards[0].suit}
          />
        </>
      )}

    </>
  );
}