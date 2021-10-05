import { Circle } from 'react-2d-canvas';

export default function Chip({ x, y, color, opacity, spin = 0 }) {
  return (
    <>
      <Circle
        x={x + 3}
        y={y + 5}
        radius={18}
        backgroundColor="#00000055"
        opacity={opacity}
      />
      <Circle
        x={x}
        y={y}
        radius={18}
        backgroundColor={color}
        opacity={opacity}
        scaleX={Math.sin(spin + Math.PI * 0.5) * 0.3 + 0.7}
        rotation={spin * 0.2}
      >
        <Circle
          radius={18}
          BorderWidth={6}
          borderColor="#fff"
          borderDash="6, 7.6"
        />
      </Circle>
    </>

  );
}