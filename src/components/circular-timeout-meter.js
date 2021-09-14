import { animated, useSpring } from '@react-spring/web';
import CanvasArc from '../canvas-shapes/canvas-arc';

const AnimatedArc = animated(CanvasArc);

export default function CircularTimeoutMeter({ x, y, duration = 25000, strokeStyle }) {
  const arcProgressProps = useSpring({
    to: { endAngle: 1.5 * Math.PI },
    from: { endAngle: -0.5 * Math.PI },
    config: {
      duration,
    }
  });

  return (
    <AnimatedArc
      x={x}
      y={y}
      {...arcProgressProps}
      radius={32}
      strokeStyle={strokeStyle}
      lineWidth={6}
      startAngle={-0.5 * Math.PI}
    />
  )
}