import TextLabel from './text-label';
import { NAME_LABEL_BACKGROUND_COLOR } from '../util/colors';
import { animated, useTransition } from '@react-spring/web';

const AnimatedTextLabel = animated(TextLabel)

export default function NameLabel(
  {
    children,
    flash = '',
    x,
    y,
    backgroundColor = NAME_LABEL_BACKGROUND_COLOR,
  },
) {

  const transitions = useTransition(!!flash, {
    from: { textOpacity: 0},
    enter: { textOpacity: 1},
    leave: { textOpacity: 0},
  })

  return transitions((animatedProps, item) =>
    item ? (
      <AnimatedTextLabel
        {...animatedProps}
        x={x}
        y={y}
        backgroundColor={backgroundColor}
        color="#fff"
        fontSize={20}
        fontFamily="Krungthep"
        paddingTopBottom={4}
        paddingLeftRight={12}
        radius={16}
        borderColor="#fff"
        borderWidth={4}
        minWidth={70}
        maxWidth={70}
      >
        {flash}
      </AnimatedTextLabel>
    ) : (
    <AnimatedTextLabel
      {...animatedProps}
      x={x}
      y={y}
      backgroundColor={backgroundColor}
      color="#fff"
      fontSize={20}
      fontFamily="Krungthep"
      paddingTopBottom={4}
      paddingLeftRight={12}
      radius={16}
      borderColor="#fff"
      borderWidth={4}
      minWidth={70}
      maxWidth={70}
    >
      {children}
    </AnimatedTextLabel>
    )
  )
}