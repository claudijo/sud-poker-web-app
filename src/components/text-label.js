import React, { useEffect, useRef, useState } from 'react';
import { Label, RoundedRectangle } from 'react-2d-canvas';
export default function TextLabel(
  {
    children,
    x,
    y,
    color = '#000000',
    backgroundColor = 'transparent',
    fontSize = 10,
    fontFamily = 'sans-serif',
    paddingTopBottom = 0,
    paddingLeftRight = 0,
    radius = 0,
    borderWidth,
    borderColor,
    minWidth = 0,
    maxWidth = Number.POSITIVE_INFINITY,
  },
) {
  const [measuredChildWidth, setMeasuredChildWidth] = useState(0)
  const labelElementRef = useRef(null)

  useEffect(() => {
    setMeasuredChildWidth(labelElementRef.current.width)
  }, [children])

  const width = Math.min(maxWidth, Math.max(minWidth, measuredChildWidth))

  return (
    <RoundedRectangle
      x={x}
      y={y}
      width={width + paddingLeftRight * 2}
      height={fontSize + paddingTopBottom * 2}
      backgroundColor={backgroundColor}
      radius={radius}
      borderColor={borderColor}
      borderWidth={borderWidth}
    >
      <Label
        ref={labelElementRef}
        y={2}
        color={color}
        fontSize={fontSize}
        fontFamily={fontFamily}
        maxWidth={maxWidth}
        baseline="middle"
        align="center"
      >{children}</Label>
    </RoundedRectangle>
  );
}