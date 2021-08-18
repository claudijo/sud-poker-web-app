import CanvasText from '../canvas-shapes/canvas-text';
import { useRef } from 'react';
import RoundedRectangle from '../canvas-shapes/rounded-rectangle';

export default function TextLabel({ children, x, y, backgroundColor}) {

  return (
    <RoundedRectangle
      x={x}
      y={y}
      width="50"
      height="24"
      fillStyle={backgroundColor}
    >
      <CanvasText
        fillStyle="#000000"
        font="30px Krungthep"
        textBaseline="top"
      >{children}</CanvasText>
    </RoundedRectangle>
  )
}