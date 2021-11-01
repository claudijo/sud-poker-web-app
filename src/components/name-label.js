import TextLabel from './text-label';
import { NAME_LABEL_BACKGROUND_COLOR } from '../util/colors';
import { animated, useSpring} from '@react-spring/web';

const AnimatedTextLabel = animated(TextLabel);

export default function NameLabel(
  {
    children,
    x,
    y,
    backgroundColor = NAME_LABEL_BACKGROUND_COLOR,
    borderColor = '#fff',
    color = '#fff',
    scale = 1,
  },
) {

  const animatedProps = useSpring({
    backgroundColor,
    borderColor,
    color,
    scale,
  })

  return (
    <AnimatedTextLabel
      {...animatedProps}
      x={x}
      y={y}
      fontSize={20}
      fontFamily="Krungthep"
      paddingTopBottom={4}
      paddingLeftRight={12}
      radius={16}
      borderWidth={6}
      minWidth={80}
      maxWidth={80}
    >
      {children}
    </AnimatedTextLabel>
  );
}