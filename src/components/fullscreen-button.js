import CanvasCircle from '../canvas-shapes/circle';
import CanvasImage from '../canvas-shapes/canvas-image';
import FullScreenIcon from '../icons/fullscreen.svg';
import AddUserIcon from '../icons/add-user.svg';

export default function FullscreenButton({ children, x, y, ...props }) {

  const onMouseEnter = event => {
    document.body.style.cursor = 'pointer'
  }

  const onMouseLeave = event => {
    document.body.style.cursor = 'default'
  }

  return (
    <CanvasCircle
      {...props}
      x={x}
      y={y}
      radius={32}
      fillStyle="#fff"
      globalAlpha="1"
      shadowColor="#00000055"
      shadowOffsetY={8}
      shadowBlur={16}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CanvasImage
        x={-24}
        y={-24}
        width={48}
        height={48}
        source={FullScreenIcon}
      />
    </CanvasCircle>
  );
}