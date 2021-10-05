import { animated, useSpring, config } from '@react-spring/web';
import { Circle, Label } from 'react-2d-canvas';

const AnimatedCircle = animated(Circle);

export default function DealerButton({ x, y }) {

  const [animatedProps] = useSpring({
    to: { x, y },
    config: config.stiff,
  }, [x, y])

  return (
    <AnimatedCircle
      {...animatedProps}
      radius={14}
      backgroundColor="#eaeaea"
      shadowColor="#00000055"
      shadowOffsetX={2}
      shadowOffsetY={4}
    >
      <Label
        y={3}
        x={1}
        baseline="middle"
        align="center"
        color="#666"
        fontSize={20}
        fontFamily="Krungthep"
      >
        D
      </Label>
    </AnimatedCircle>
  )
}