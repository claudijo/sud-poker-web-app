import FaceDownCard from './face-down-card';
import React from 'react';

export default function OpponentHand({ x, y, rtl = true }) {

  const offset = rtl ? -146 : 0;

  return (
    <>
      <FaceDownCard
        x={x + 65 + offset}
        y={y - 44}
        rotation={20 * Math.PI / 180}
      />
      <FaceDownCard
        x={x + 35 + offset}
        y={y - 36}
      />
    </>
  )
}