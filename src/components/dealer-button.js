import CanvasCircle from '../canvas-shapes/circle';
import CanvasText from '../canvas-shapes/canvas-text';

export default function DealerButton({ x, y }) {
  return (
    <CanvasCircle
      x={x}
      y={y}
      radius={14}
      fillStyle="#eaeaea"
      shadowColor="#00000055"
      shadowOffsetX={4}
      shadowOffsetY={4}
      shadowBlur={4}
    >
      <CanvasText
        originX={-0.5}
        originY={-0.5}
        fillStyle="#666"
        font="20px Krungthep"
      >
        D
      </CanvasText>
    </CanvasCircle>
  )
}