import CanvasCircle from '../canvas-shapes/circle';
import CanvasImage from '../canvas-shapes/canvas-image';

export default function PlayerButton({ children, x, y }) {
  return (
    <CanvasCircle
      x={x}
      y={y}
      radius={32}
      fillStyle="#89d9d1"
      strokeStyle="#009557"
      lineWidth={6}
    />
  )
}