import RoundedRectangle from '../canvas-shapes/rounded-rectangle';
import CanvasRectangle from '../canvas-shapes/rectangle';
import React from 'react';
import { range } from '../lib/array';
import CanvasText from '../canvas-shapes/canvas-text';
import { TABLE_HIGHLIGHT_COLOR, TABLE_SHADOW_COLOR, TABLE_BACKGROUND_COLOR, TABLE_TEXT_COLOR } from '../util/colors';

export default function Table({ x, y, width, height, borderWidth }) {
  return (
    <>
      <RoundedRectangle
        x={x + borderWidth * 0.5}
        y={y + borderWidth * 0.5}
        width={width - borderWidth}
        height={height - borderWidth}
        radius={Math.min(width - borderWidth, height - borderWidth) / 2}
        fillStyle={TABLE_SHADOW_COLOR}
      />
      <RoundedRectangle
        x={x + borderWidth * 1.5}
        y={y + borderWidth * 1.5}
        width={width - borderWidth * 2}
        height={height - borderWidth * 2}
        radius={Math.min(width - borderWidth * 2, height - borderWidth * 2) / 2}
        fillStyle={TABLE_BACKGROUND_COLOR}
      />
      <RoundedRectangle
        x={x + borderWidth * 0.5}
        y={y + +borderWidth * 0.5}
        width={width - borderWidth}
        height={height - borderWidth}
        radius={Math.min(width - borderWidth, height - borderWidth) / 2}
        strokeStyle={TABLE_HIGHLIGHT_COLOR}
        lineWidth={borderWidth}

      />
      <CanvasText
        x={x + width / 2}
        y={y + height / 2 - 54}
        fillStyle={TABLE_TEXT_COLOR}
        font="30px Krungthep"
        originX={-0.5}
      >
        shuffleupanddeal.online
      </CanvasText>
      {
        range(5).map(index => (
          <CanvasRectangle
            key={index}
            x={x + width / 2 - 28 - (index - 2) * 64}
            y={y + height / 2 - 14}
            width={56}
            height={76}
            strokeStyle={TABLE_TEXT_COLOR}
            lineWidth={4}
          />
        ))
      }

    </>
  );
}