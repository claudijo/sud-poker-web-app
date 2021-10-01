import { animated, useSpring } from '@react-spring/web';
import { Arc } from 'react-2d-canvas';

const AnimatedArc = animated(Arc);

export default function CircularTimeoutMeter({ x, y, duration = 25000, borderColor }) {
  const arcProgressProps = useSpring({
    to: { endAngle: 360 * Math.PI / 180 },
    from: { endAngle: 0 },
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
      borderColor={borderColor}
      borderWidth={6}
    />
  )
}