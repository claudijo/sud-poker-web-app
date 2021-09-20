import React from 'react';
import { PlayingCard } from './playing-card';

export default function OpponentHand({ x, y, rtl = true }) {
  const offset = rtl ? -196 : 0;

  return (
    <>
      <PlayingCard
        x={x + 73 + offset}
        y={y - 71}
        rotation={20 * Math.PI / 180}
        faceUp={false}
      />
      <PlayingCard
        x={x + 43 + offset}
        y={y - 71}
        faceUp={false}
      />
    </>
  )
}