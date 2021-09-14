import TextLabel from './text-label';
import Chip from './chip';

const CHIP_STACK_LABEL_BACKGROUND_COLOR = '#fff'
const CHIP_STACK_LABEL_TEXT_COLOR = '#4D435B'
const CHIP_COLOR = '#EB4448'

export default function ChipStack(
  {
    x,
    y,
    size,
    hideLabel = false,
    hideChips = false,
    globalAlpha = 1,
  },
) {
  return (
    <>
      {!hideLabel && (
        <TextLabel
          x={x}
          y={y - 18}
          backgroundColor={CHIP_STACK_LABEL_BACKGROUND_COLOR}
          color={CHIP_STACK_LABEL_TEXT_COLOR}
          fontSize={28}
          fontFamily="Krungthep"
          paddingTop={4}
          paddingBottom={4}
          paddingLeft={8}
          paddingRight={8}
          radius={8}
        >
          {size}
        </TextLabel>
      )}
      {!hideChips && (
        <Chip x={x - 26} y={y} color={CHIP_COLOR} globalAlpha={globalAlpha}/>
      )}
    </>
  );
}