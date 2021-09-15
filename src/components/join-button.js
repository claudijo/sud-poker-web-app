import CanvasCircle from '../canvas-shapes/circle';
import CanvasImage from '../canvas-shapes/canvas-image';
import AddUserIcon from '../icons/add-user.svg';
import { useState } from 'react';
import { BUTTON_BACKGROUND_COLOR, BUTTON_BORDER_COLOR, BUTTON_HOVER_BACKGROUND_COLOR, BUTTON_ACTIVE_BACKGROUND_COLOR } from '../util/colors';

export default function JoinButton({ children, x, y, disabled, onClick, ...props }) {

  const [fillStyle, setFillStyle] = useState(BUTTON_BACKGROUND_COLOR);

  const onMouseEnter = event => {
    if (disabled) {
      return;
    }
    document.body.style.cursor = 'pointer';
    setFillStyle(BUTTON_HOVER_BACKGROUND_COLOR);
  };

  const onMouseLeave = event => {
    document.body.style.cursor = 'default';
    setFillStyle(BUTTON_BACKGROUND_COLOR);
  };

  const onMouseDown = event => {
    if (disabled) {
      return;
    }
    setFillStyle(BUTTON_ACTIVE_BACKGROUND_COLOR);
  };

  const onMouseUp = event => {
    if (disabled) {
      return;
    }
    setFillStyle(BUTTON_BACKGROUND_COLOR);
  };

  const onClickProxy = event => {
    if (disabled) {
      return;
    }

    onClick && onClick(event)
  }

  return (
    <CanvasCircle
      {...props}
      x={x}
      y={y}
      radius={32}
      fillStyle={fillStyle}
      strokeStyle={BUTTON_BORDER_COLOR}
      lineWidth={6}
      globalAlpha={disabled ? 0.5 : 1}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={onClickProxy}
    >
      <CanvasImage
        x={-20}
        y={-20}
        width={40}
        height={40}
        globalAlpha={disabled ? 0.5 : 1}
        src={AddUserIcon}
      />
    </CanvasCircle>
  );
}