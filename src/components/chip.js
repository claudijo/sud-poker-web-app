import CanvasCircle from '../canvas-shapes/circle';

export default function Chip({ x, y, color, globalAlpha }) {
  return (
    <CanvasCircle
      x={x}
      y={y}
      radius={18}
      fillStyle={color}
      shadowColor="#00000055"
      shadowOffsetX={4}
      shadowOffsetY={4}
      shadowBlur={4}
      globalAlpha={globalAlpha}
    >
      <CanvasCircle
        radius={16}
        lineWidth={6}
        strokeStyle="#fff"
        lineDash="7, 10"
        globalAlpha={globalAlpha}
      />
    </CanvasCircle>
  )
}