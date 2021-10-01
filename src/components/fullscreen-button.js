import { Circle, Image } from 'react-2d-canvas';
import FullScreenIcon from '../icons/fullscreen.svg';

export default function FullscreenButton({ children, x, y, ...props }) {

  const onMouseOver = event => {
    document.body.style.cursor = 'pointer'
  }

  const onMouseOut = event => {
    document.body.style.cursor = 'default'
  }

  return (
    <Circle
      {...props}
      x={x}
      y={y}
      radius={32}
      backgroundColor="#eee"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <Image
        width={48}
        height={48}
        src={FullScreenIcon}
      />
    </Circle>
  );
}