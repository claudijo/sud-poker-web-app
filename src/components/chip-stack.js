import TextLabel from './text-label';
import Chip from './chip';
import { CHIP_STACK_LABEL_BACKGROUND_COLOR, CHIP_STACK_LABEL_TEXT_COLOR, CHIP_COLOR } from '../util/colors';

export default function ChipStack(
  {
    x,
    y,
    size,
    hideLabel = false,
    hideChips = false,
    opacity = 1,
  },
) {
  return (
    <>
      {!hideLabel && (
        <TextLabel
          x={x}
          y={y}
          backgroundColor={CHIP_STACK_LABEL_BACKGROUND_COLOR}
          color={CHIP_STACK_LABEL_TEXT_COLOR}
          fontSize={28}
          fontFamily="Krungthep"
          paddingTopBottom={4}
          paddingLeftRight={8}
          radius={8}
          align="left"
        >
          {size}
        </TextLabel>
      )}
      {!hideChips && (
        <Chip x={x - 26} y={y} color={CHIP_COLOR} opacity={opacity}/>
      )}
    </>
  );
}