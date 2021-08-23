import CanvasRectangle from '../canvas-shapes/rectangle';
import CanvasText from '../canvas-shapes/canvas-text';
import { parseRank, parseSuit, suitColor } from '../util/card';
import { useTransition } from '@react-spring/web';

export default function FaceUpCard({ x, y, globalAlpha, rank, suit}) {
  const color = suitColor(suit);

  return (
    <CanvasRectangle
      x={x}
      y={y}
      width={40}
      height={60}
      fillStyle="#faffec"
      shadowColor="#00000055"
      shadowOffsetX={4}
      shadowOffsetY={4}
      shadowBlur={4}
      globalAlpha={globalAlpha}
    >
      <CanvasText
        y={6}
        x={4}
        globalAlpha={globalAlpha}
        fillStyle={color}
        font="28px CardCharacters"
      >
        {parseRank(rank)}
      </CanvasText>
      <CanvasText
        x={16}
        y={32}
        globalAlpha={globalAlpha}
        fillStyle={color}
        font="24px CardCharacters"
      >
        {parseSuit(suit)}
      </CanvasText>
    </CanvasRectangle>
  )
}