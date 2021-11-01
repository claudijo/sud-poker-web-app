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
    borderWidth = 0,
    borderColor,
    minWidth = 0,
    maxWidth = Number.POSITIVE_INFINITY,
    align = 'center',
    textOpacity = 1,
    opacity = 1,
    scale = 1,
  },
) {
  const [measuredChildWidth, setMeasuredChildWidth] = useState(0);
  const labelElementRef = useRef(null);

  useEffect(() => {
    setMeasuredChildWidth(labelElementRef.current.width);
  }, [children]);

  const width = Math.min(maxWidth, Math.max(minWidth, measuredChildWidth));

  const originX = (align) => {
    switch (align) {
      case 'start':
      case 'left':
        return 0;
      case 'end':
      case 'right':
        return 1;
      default:
        return 0.5;
    }
  };

  const labelWidth = width + paddingLeftRight * 2 + borderWidth * 2;

  return (
    <RoundedRectangle
      x={x}
      y={y}
      width={scale * labelWidth}
      height={scale * (fontSize + paddingTopBottom * 2 + borderWidth * 2)}
      backgroundColor={backgroundColor}
      radius={scale * radius}
      borderColor={borderColor}
      borderWidth={scale * borderWidth}
      originX={originX(align)}
      opacity={opacity}
    >
      <Label
        ref={labelElementRef}
        y={1}
        x={align === 'center' ? 0 : labelWidth / 2}
        color={color}
        fontSize={fontSize}
        fontFamily={fontFamily}
        maxWidth={maxWidth}
        baseline="middle"
        align="center"
        borderWidth={0}
        opacity={textOpacity}
        scaleX={scale}
        scaleY={scale}
      >{children}</Label>
    </RoundedRectangle>
  );
}