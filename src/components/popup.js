import { useSpring, animated } from '@react-spring/web';

export default function Popup({ children, style, done }) {
  const props = useSpring({
    to: { top: '50%' },
    from: { top: '200%' },
    onRest: done ?? (() => {}),
    config: {
      mass: 1,
      friction: 20,
      tension: 400,
    },
  });

  return (
    <animated.div style={{
      position: 'absolute',
      left: '25%',
      width: '50%',
      transform: 'translateY(-50%)',
      ...style,
      ...props,
    }}>
      {children}
    </animated.div>
  );
}