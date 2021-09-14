import CanvasCircle from '../canvas-shapes/circle';
import CanvasText from '../canvas-shapes/canvas-text';
import { animated, useSpring } from '@react-spring/web';

const AnimatedCircle = animated(CanvasCircle);

export default function DealerButton({ x, y }) {

  const [animatedProps] = useSpring({
    to: { x, y },
  }, [x, y])

  return (
    <AnimatedCircle
      {...animatedProps}
      radius={14}
      fillStyle="#eaeaea"
      shadowColor="#00000055"
      shadowOffsetX={2}
      shadowOffsetY={4}
    >
      <CanvasText
        originX={-0.5}
        originY={-0.5}
        fillStyle="#666"
        font="20px Krungthep"
      >
        D
      </CanvasText>
    </AnimatedCircle>
  )
}