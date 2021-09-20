import React from 'react';
import { PlayingCard } from './playing-card';
import { isWinningCard } from '../util/card';

export default function OpponentHand({ x, y, rtl = true, winner }) {
  const offset = rtl ? -196 : 0;

  console.log('Opponent is winner', winner)

  return (
    <>
      <PlayingCard
        x={x + 73 + offset}
        y={y - 71}
        rotation={winner ? 0 : 20 * Math.PI / 180}
        faceUp={!!winner}
        elevated={winner && isWinningCard([winner], winner?.holeCards[0])}
        dimmed={winner && !isWinningCard([winner], winner?.holeCards[0])}
        card={winner?.holeCards[0]}
      />
      <PlayingCard
        x={x + offset + (winner ? 15 : 43)}
        y={y - 71}
        faceUp={!!winner}
        elevated={winner && isWinningCard([winner], winner?.holeCards[1])}
        dimmed={winner && !isWinningCard([winner], winner?.holeCards[1])}
        card={winner?.holeCards[1]}
      />
    </>
  )
}