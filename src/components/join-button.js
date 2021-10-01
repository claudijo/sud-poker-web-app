import AddUserIcon from '../icons/add-user.svg';
import { useState } from 'react';
import { Image, Circle } from 'react-2d-canvas'
import { BUTTON_BACKGROUND_COLOR, BUTTON_BORDER_COLOR, BUTTON_HOVER_BACKGROUND_COLOR, BUTTON_ACTIVE_BACKGROUND_COLOR } from '../util/colors';

export default function JoinButton({ x, y, disabled, onClick }) {

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
    <Circle
      x={x}
      y={y}
      radius={32}
      backgroundColor={fillStyle}
      borderColor={BUTTON_BORDER_COLOR}
      borderWidth={6}
      opacity={disabled ? 0.5 : 1}
      onMouseOver={onMouseEnter}
      onMouseOut={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={onClickProxy}
    >
      <Image
        x={-20}
        y={-20}
        width={40}
        height={40}
        opacity={disabled ? 0.5 : 1}
        src={AddUserIcon}
      />
    </Circle>
  );
}