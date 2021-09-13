import CanvasRectangle from '../canvas-shapes/rectangle';
import CanvasText from '../canvas-shapes/canvas-text';
import { parseRank, parseSuit, suitColor } from '../util/card';
import { animated, useSpring } from '@react-spring/web';

const AnimatedRectangle = animated(CanvasRectangle);
const AnimatedText = animated(CanvasText);

export default function FaceUpCard({ x, y, globalAlpha, elevated, dimmed, rank, suit }) {
  const color = suitColor(suit);

  const animatedDimmedProps = useSpring({
    from: { globalAlpha: dimmed ? globalAlpha  : globalAlpha * 0.75},
    to: { globalAlpha: dimmed ? globalAlpha * 0.75 : globalAlpha }
  })

  const animatedElevatedProps = useSpring({
    from: { x: x - (elevated ?  0 : 4), y: y - (elevated ?  0 : 8)},
    to: { x: x - (elevated ?  4 : 0), y: y - (elevated ?  8 : 0)},
  })

  return (
    <AnimatedRectangle
      {...animatedDimmedProps}
      {...animatedElevatedProps}
      width={50}
      height={70}
      fillStyle="#faffec"
      shadowColor="#00000055"
      shadowOffsetX={4 + (elevated ? 4 : 0)}
      shadowOffsetY={4 + (elevated ? 8 : 0)}
    >
      <AnimatedText
        {...animatedDimmedProps}
        y={4}
        x={4}
        fillStyle={color}
        font="34px CardCharacters"
      >
        {parseRank(rank)}
      </AnimatedText>
      <AnimatedText
        {...animatedDimmedProps}
        x={20}
        y={38}
        fillStyle={color}
        font="28px CardCharacters"
      >
        {parseSuit(suit)}
      </AnimatedText>
    </AnimatedRectangle>
  );
}