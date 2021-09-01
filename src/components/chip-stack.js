import CanvasText from '../canvas-shapes/canvas-text';
import StackLabel from './stack-label';
import TextLabel from './text-label';
import CanvasCircle from '../canvas-shapes/circle';
import CanvasImage from '../canvas-shapes/canvas-image';
import { range } from '../lib/array';
import CanvasArc from '../canvas-shapes/canvas-arc';
import Chip from './chip';

export default function ChipStack({ x, y, betSize, bigBlind }) {

  return (
    <>
      <TextLabel
        x={x}
        y={y}
        backgroundColor="#fff"
        color="#666"
        fontSize={28}
        fontFamily="Krungthep"
        paddingTop={4}
        paddingBottom={4}
        paddingLeft={8}
        paddingRight={8}
        radius={8}
      >
        {betSize}
      </TextLabel>
      <Chip x={x - 14} y={y + 18} color="#e16057"/>
      { betSize === bigBlind && (
        <Chip x={x - 14} y={y + 10} color="#e16057"/>
      )}
      {
        betSize > bigBlind && (
          <>
            <Chip x={x - 40} y={y + 18} color="#e16057"/>
            <Chip x={x - 28} y={y + 10} color="#555555"/>
          </>
        )
      }

    </>
  );
}