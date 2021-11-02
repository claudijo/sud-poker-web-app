import { Label } from 'react-2d-canvas';
import { animated, config, useTransition } from '@react-spring/web';
import { chipPositionOffset } from '../util/table';

const AnimatedLabel = animated(Label)

export default function SeatToasts(
  {
    positions = [],
    messages,
  },
) {
  const denseArray = messages
    .map((message, index) => {
      return message ? {
        message,
        index,
        position: chipPositionOffset(index, positions[index]),
      } : null
    })
    .filter(item => !!item)

  const transitions = useTransition(denseArray, {
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 1.5 },
    keys: item => item.index,
  });

  return transitions(({ opacity, scale }, item) => (
    <AnimatedLabel
      opacity={opacity}
      scaleX={scale}
      scaleY={scale}
      x={item.position.x}
      y={item.position.y}
      baseline="middle"
      align="center"
      fontSize={72}
      color="#FD9F28"
      borderColor={'#663d0a'}
      borderWidth={6}
      fontFamily="Commando"
    >{item.message}</AnimatedLabel>
  ));
}