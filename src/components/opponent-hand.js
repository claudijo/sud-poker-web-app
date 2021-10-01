import React from 'react';
import { PlayingCard } from './playing-card';
import { isWinningCard } from '../util/card';

export default function OpponentHand({ x, y, rtl = true, winner }) {
  const offset = rtl ? -140 : 20;

  return (
    <>
      <PlayingCard
        x={x + 73 + offset + (winner ? (rtl ? 0 : 18) : 0)}
        y={y}
        rotation={winner ? 0 : 10 * Math.PI / 180}
        faceUp={!!winner}
        elevated={winner && isWinningCard([winner], winner?.holeCards[0])}
        card={winner?.holeCards[0]}
      />
      <PlayingCard
        x={x + offset + (winner ? (rtl ? 24 : 43) : 43)}
        y={y}
        faceUp={!!winner}
        elevated={winner && isWinningCard([winner], winner?.holeCards[1])}
        card={winner?.holeCards[1]}
      />
    </>
  )
}