import CanvasRectangle from '../canvas-shapes/rectangle';
import CanvasText from '../canvas-shapes/canvas-text';
import { parseRank, parseSuit, suitColor } from '../util/card';

export default function FaceUpCard({ x, y, globalAlpha, rank, suit}) {
  const color = suitColor(suit);

  return (
    <CanvasRectangle
      x={x}
      y={y}
      width={50}
      height={70}
      fillStyle="#faffec"
      shadowColor="#00000055"
      shadowOffsetX={4}
      shadowOffsetY={4}
      shadowBlur={4}
      globalAlpha={globalAlpha}
    >
      <CanvasText
        y={4}
        x={4}
        globalAlpha={globalAlpha}
        fillStyle={color}
        font="34px CardCharacters"
      >
        {parseRank(rank)}
      </CanvasText>
      <CanvasText
        x={20}
        y={38}
        globalAlpha={globalAlpha}
        fillStyle={color}
        font="28px CardCharacters"
      >
        {parseSuit(suit)}
      </CanvasText>
    </CanvasRectangle>
  )
}