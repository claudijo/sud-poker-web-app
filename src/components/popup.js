import { animated, useTransition } from '@react-spring/web';
import Backdrop from './backdrop';
import ConditionalWrapper from './conditional-wrapper';

export default function Popup({ children, styles, show }) {

  const transitions = useTransition(show, {
    from: { top: '200%' },
    enter: { top: '50%' },
    leave: { top: '200%' },
    reverse: show,
    config: {
      mass: 1,
      friction: 20,
      tension: 400,
    },
  });

  return transitions(
    (animatedStyle, item) => item && (
      <ConditionalWrapper
        condition={show}
        wrapper={children => (
          <Backdrop>
            {children}
          </Backdrop>
        )}
      >
        <animated.div style={{
          position: 'absolute',
          left: '25%',
          width: '50%',
          transform: 'translateY(-50%)',
          ...styles,
          ...animatedStyle,
        }}>
          {children}
        </animated.div>
      </ConditionalWrapper>
    ),
  );


}