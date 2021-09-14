import CanvasText from '../canvas-shapes/canvas-text';
import React from 'react';

export default function ShoutOut({ children, x, y }) {
  return <CanvasText
    x={x}
    y={y}
    fillStyle="#4D435B"
    font="20px Krungthep"
    originX={-0.5}
    originY={-0.5}
  >
    {children}
  </CanvasText>;
}