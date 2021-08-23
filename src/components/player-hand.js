import CanvasRectangle from '../canvas-shapes/rectangle';
import CanvasImage from '../canvas-shapes/canvas-image';
import FaceUpCard from './face-up-card';

export default function PlayerHand({ x, y, holeCards = []}) {
  console.log('Hole1', holeCards)
  return (
    <>
      {
        holeCards.map(({rank, suit}, index) => (
          <FaceUpCard
            key={`${suit}${rank}`}
            x={x + 40 + index * 48}
            y={y -32}
            rank={rank}
            suit={suit}
          />
        ))
      }
    </>
  );
}