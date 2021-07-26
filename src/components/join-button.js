import CanvasCircle from '../canvas-shapes/circle';
import CanvasImage from '../canvas-shapes/canvas-image';
import AddUserIcon from '../icons/add-user.svg';
import { useState } from 'react';

export default function JoinButton({ children, x, y, ...props }) {

  const [fillStyle, setFillStyle] = useState('#89d9d1')

  const onMouseEnter = event => {
    document.body.style.cursor = 'pointer'
    setFillStyle('#69bfb6')
  }

  const onMouseLeave = event => {
    document.body.style.cursor = 'default'
    setFillStyle('#89d9d1')
  }

  const onMouseDown = event => {
    setFillStyle('#54a89f')
  }

  const onMouseUp = event => {
    setFillStyle('#69bfb6')
  }

  return (
    <CanvasCircle
      {...props}
      x={x}
      y={y}
      radius={32}
      fillStyle={fillStyle}
      strokeStyle="#009557"
      lineWidth={6}
      globalAlpha="1"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <CanvasImage
        x={-20}
        y={-20}
        width={40}
        height={40}
        source={AddUserIcon}
      />
    </CanvasCircle>
  );
}