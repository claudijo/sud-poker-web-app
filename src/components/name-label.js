import TextLabel from './text-label';
import { NAME_LABEL_BACKGROUND_COLOR } from '../util/colors';
import { animated, config, useSpring} from '@react-spring/web';

const AnimatedTextLabel = animated(TextLabel);

export default function NameLabel(
  {
    children,
    flash = '',
    x,
    y,
  },
) {

  const animatedProps = useSpring({
    progress: flash ? 1 : 0,
    backgroundColor: flash ? '#fff' : NAME_LABEL_BACKGROUND_COLOR,
    borderColor: flash ? NAME_LABEL_BACKGROUND_COLOR : '#fff',
    color: flash ? NAME_LABEL_BACKGROUND_COLOR : '#fff',
    config: config.slow,
  });

  return (
    <AnimatedTextLabel
      scale={animatedProps.progress.to({
        range: [0, 0.5, 1],
        output: [1, flash ? 1.5 : 1, 1],
      })}
      backgroundColor={animatedProps.backgroundColor}
      color={animatedProps.color}
      borderColor={animatedProps.borderColor}
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
      {flash || children}
    </AnimatedTextLabel>
  );
}