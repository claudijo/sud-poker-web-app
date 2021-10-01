import { Image, Rectangle } from 'react-2d-canvas';

export default function Card(
  {
    x,
    y,
    width,
    height,
    elevation = 0,
    demotion = 0,
    opacity = 1,
    rotation,
    frontSide,
    backSide,
    flip = 0
  }
) {
  const scaleX = Math.sin(flip - Math.PI * -0.5)
  const shadowWidth = width + Math.abs(scaleX * 16) - 16
  const shadowXOffset = 4 - Math.abs(scaleX * 16) + 16
  const shadowYOffset = -Math.abs(scaleX * 16) + 16
  const src = scaleX > 0 ? frontSide : backSide

  return (
    <Rectangle
      x={x + shadowXOffset - elevation / 4}
      y={y + shadowYOffset / 2 + elevation / 2}
      width={shadowWidth}
      height={height}
      backgroundColor="#00000055"
      scaleX={scaleX}
      opacity={Math.max(opacity- demotion, 0)}
      rotation={rotation}
    >
      <Image
        x={-shadowXOffset - elevation / 4}
        y={-4 - shadowYOffset - elevation}
        width={width}
        height={height}
        src={src}
        scaleX={scaleX}
        opacity={Math.max(opacity- demotion, 0)}
      />
    </Rectangle>
  )
}