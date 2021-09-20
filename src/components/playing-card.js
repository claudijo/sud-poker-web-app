import CanvasImage from '../canvas-shapes/canvas-image';
import { generateFaceUpCard } from '../util/card';
import CanvasRectangle from '../canvas-shapes/rectangle';
import backSideImage from '../icons/card-back-side.svg';
import { animated, useSpring } from '@react-spring/web';
import { useMemo, useState } from 'react';

const AnimatedImage = animated(CanvasImage);
const AnimatedRectangle = animated(CanvasRectangle);

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
    animationDelay = 0,
  },
) {
  const faceUpImage = useMemo(() => generateFaceUpCard(card), [card?.suit, card?.rank]);

  const [src, setSrc] = useState(faceUp ? faceUpImage : backSideImage)
  const [cardYOffset, setcardYOffset] = useState(0)
  const [shadowYOffset, setshadowYOffset] = useState(4)
  const [shadowXOffset, setshadowXOffset] = useState( 4)
  const [shadowWidth, setShadowWidth] = useState(50)

  const animatedCardProps = useSpring({
    scaleX: faceUp ?  1 : -1,
    onChange: ({ value }) => {
      setSrc(value.scaleX < 0 ? backSideImage : faceUpImage)
      setcardYOffset(Math.abs(value.scaleX * 16) - 16)
      setshadowYOffset(4 + -Math.abs(value.scaleX * 4) + 4)
      setShadowWidth(50 + Math.abs(value.scaleX * 16) - 16)
      setshadowXOffset(4 - Math.abs(value.scaleX * 16) + 16)
    },
    delay: animationDelay,
  })

  const animatedElevatedProps = useSpring({
    y: elevated ? y - 8 : y,
  })

  const animatedDimmedProps = useSpring({
    globalAlpha: dimmed ? 0.5 : globalAlpha,
  })

  const animatedRotationProps = useSpring({
    rotation,
  })

  return (
    <AnimatedRectangle
      {...animatedElevatedProps}
      x={x}
    >
      <AnimatedRectangle
        {...animatedDimmedProps}
        {...animatedRotationProps}
        y={shadowYOffset}
        x={shadowXOffset}
        fillStyle="#00000055"
        width={shadowWidth}
        height={70}
        originX={0.5}
        originY={0.5}
        globalAlpha={globalAlpha}
      />
      <AnimatedImage
        {...animatedCardProps}
        {...animatedDimmedProps}
        {...animatedRotationProps}
        src={src}
        y={cardYOffset}
        x={0}
        width={50}
        height={70}
        originX={0.5}
        originY={0.5}
      />
    </AnimatedRectangle>
  );
}