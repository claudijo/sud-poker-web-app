import TextLabel from './text-label';
import { NAME_LABEL_BACKGROUND_COLOR } from '../util/colors';

export default function NameLabel({ children, x, y }) {
  return (
    <TextLabel
      x={x}
      y={y}
      backgroundColor={NAME_LABEL_BACKGROUND_COLOR}
      color="#fff"
      fontSize={20}
      fontFamily="Krungthep"
      paddingTopBottom={8}
      paddingLeftRight={12}
      radius={16}
      borderColor="#fff"
      borderWidth={4}
      minWidth={60}
      maxWidth={100}
      originX={-0.5}
    >
      {children}
    </TextLabel>
  )
}