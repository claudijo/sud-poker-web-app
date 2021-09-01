import CanvasCircle from '../canvas-shapes/circle';

export default function Chip({ x, y, color }) {
  return (
    <CanvasCircle
      x={x}
      y={y}
      radius={16}
      fillStyle={color}
      shadowColor="#00000055"
      shadowOffsetX={4}
      shadowOffsetY={4}
      shadowBlur={4}
    >
      <CanvasCircle
        radius={14}
        lineWidth={6}
        strokeStyle="#fff"
        lineDash="5.5, 9.1"
      />
    </CanvasCircle>
  )
}