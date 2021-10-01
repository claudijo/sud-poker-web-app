import { RoundedRectangle, Rectangle, Label } from 'react-2d-canvas';
import React from 'react';
import { range } from '../lib/array';
import { TABLE_HIGHLIGHT_COLOR, TABLE_SHADOW_COLOR, TABLE_BACKGROUND_COLOR, TABLE_TEXT_COLOR } from '../util/colors';

export default function Table({ x, y, width, height, borderWidth }) {
  return (
    <>
      <RoundedRectangle
        x={x}
        y={y}
        width={width - borderWidth}
        height={height - borderWidth}
        radius={Math.min(width - borderWidth, height - borderWidth) / 2}
        backgroundColor={TABLE_SHADOW_COLOR}
      />
      <RoundedRectangle
        x={x + borderWidth / 2}
        y={y + borderWidth / 2}
        width={width - borderWidth * 2}
        height={height - borderWidth * 2}
        radius={Math.min(width - borderWidth * 2, height - borderWidth * 2) / 2}
        backgroundColor={TABLE_BACKGROUND_COLOR}
        // opacity={0.5}
      />
      <RoundedRectangle
        x={x}
        y={y}
        width={width}
        height={height}
        radius={Math.min(width - borderWidth, height - borderWidth) / 2}
        borderColor={TABLE_HIGHLIGHT_COLOR}
        borderWidth={borderWidth}
      />
      <Label
        x={x}
        y={y - 54}
        color={TABLE_TEXT_COLOR}
        fontSize={30}
        fontFamily="Krungthep"
        align="center"
        baseline="center"
      >
        shuffleupanddeal.online
      </Label>
      {
        range(5).map(index => (
          <Rectangle
            key={index}
            x={x - (index - 2) * 64}
            y={y}
            width={56}
            height={76}
            borderColor={TABLE_TEXT_COLOR}
            borderWidth={4}
          />
        ))
      }
    </>
  );
}