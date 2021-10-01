import { Circle } from 'react-2d-canvas';

export default function Chip({ x, y, color, opacity }) {
  return (
    <Circle
      x={x}
      y={y}
      radius={18}
      backgroundColor={color}
      shadowColor="#00000055"
      shadowOffsetX={3}
      shadowOffsetY={5}
      opacity={opacity}
    >
      <Circle
        radius={18}
        BorderWidth={6}
        borderColor="#fff"
        borderDash="6, 7.6"
        opacity={opacity}
      />
    </Circle>
  )
}