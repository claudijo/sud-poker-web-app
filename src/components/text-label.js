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
    minWidth = 0,
    maxWidth = Number.POSITIVE_INFINITY,
    originX = 0,
  },
) {
  const [measuredChildWidth, setMeasuredChildWidth] = useState(0)
  const childRef = useRef(null)

  useEffect(() => {
    setMeasuredChildWidth(childRef.current.width)
  }, [children])

  const width = Math.min(maxWidth, Math.max(minWidth, measuredChildWidth))

  return (
    <RoundedRectangle
      x={x}
      y={y}
      width={width + paddingLeft + paddingRight}
      height={fontSize + paddingTop + paddingBottom}
      originX={originX}
      fillStyle={backgroundColor}
      radius={radius}
      strokeStyle={borderColor}
      lineWidth={borderWidth}
    >
      <CanvasText
        ref={childRef}
        x={paddingLeft + paddingLeft * originX + paddingRight * originX}
        y={paddingTop}
        fillStyle={color}
        font={`${fontSize}px ${fontFamily}`}
        originX={originX}
        maxWidth={maxWidth}
      >{children}</CanvasText>
    </RoundedRectangle>
  );
}