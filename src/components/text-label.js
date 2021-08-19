import CanvasText from '../canvas-shapes/canvas-text';
import React, { useEffect, useRef, useState } from 'react';
import RoundedRectangle from '../canvas-shapes/rounded-rectangle';

export default function TextLabel(
  {
    children,
    x,
    y,
    color = '#000000',
    backgroundColor = 'transparent',
    fontSize = 10,
    fontFamily = 'sans-serif',
    paddingTop = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    paddingRight = 0,
    radius = 0,
    borderWidth,
    borderColor,
  },
) {
  const [measuredChildWidth, setMeasuredChildWidth] = useState(0)
  const childRef = useRef(null)

  useEffect(() => {
    setMeasuredChildWidth(childRef.current.width)
  }, [])

  return (
    <RoundedRectangle
      x={x}
      y={y}
      width={measuredChildWidth + paddingLeft + paddingRight}
      height={fontSize + paddingTop + paddingBottom}
      originX={-0.5}
      fillStyle={backgroundColor}
      radius={radius}
      strokeStyle={borderColor}
      lineWidth={borderWidth}
    >
      <CanvasText
        ref={childRef}
        x={paddingLeft / 2 - paddingRight / 2}
        y={paddingTop}
        fillStyle={color}
        font={`${fontSize}px ${fontFamily}`}
        originX={-0.5}
      >{children}</CanvasText>
    </RoundedRectangle>
  );
}