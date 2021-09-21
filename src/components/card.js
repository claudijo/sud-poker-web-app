import CanvasRectangle from '../canvas-shapes/rectangle';
import CanvasImage from '../canvas-shapes/canvas-image';

export default function Card(
  {
    x,
    y,
    width,
    height,
    elevation = 0,
    demotion = 0,
    globalAlpha = 1,
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
    <CanvasRectangle
      x={x + shadowXOffset - elevation / 4}
      y={y + shadowYOffset / 2 + elevation / 2}
      width={shadowWidth}
      height={height}
      fillStyle="#00000055"
      originX={0.5}
      originY={0.5}
      scaleX={scaleX}
      globalAlpha={Math.max(globalAlpha- demotion, 0)}
      rotation={rotation}
    >
      <CanvasImage
        x={-shadowXOffset - elevation / 4}
        y={-4 - shadowYOffset - elevation}
        width={width}
        height={height}
        src={src}
        originX={0.5}
        originY={0.5}
        scaleX={scaleX}
        globalAlpha={Math.max(globalAlpha- demotion, 0)}
        rotation={rotation}
      />
    </CanvasRectangle>
  )
}