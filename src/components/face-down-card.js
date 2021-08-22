import CardBackSide from '../icons/card-back-side.svg';
import CanvasImage from '../canvas-shapes/canvas-image';

export default function FaceDownCard({ x, y, rotation }) {
  return (
    <CanvasImage
      x={x}
      y={y}
      width="40"
      height="56"
      shadowColor="#00000055"
      shadowOffsetX={4}
      shadowOffsetY={4}
      shadowBlur={4}
      source={CardBackSide}
      rotation={rotation}
    />
  );
}