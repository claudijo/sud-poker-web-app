import TextLabel from './text-label';
import { STACK_LABEL_BACKGROUND_COLOR } from '../util/colors';

export default function StackLabel({ children, x, y}) {
  return (
    <TextLabel
      x={x}
      y={y}
      backgroundColor={STACK_LABEL_BACKGROUND_COLOR}
      color="#fff"
      fontSize={24}
      fontFamily="Krungthep"
      paddingTopBottom={4}
      paddingLeftRight={12}
      radius={16}
      borderColor="#fff"
      borderWidth={6}
    >
      {children}
    </TextLabel>
  )
}