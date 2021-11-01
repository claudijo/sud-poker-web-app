import PlayerButton from './player-button';
import StackLabel from './stack-label';
import NameLabel from './name-label';
import { capitalizeFirstLetter } from '../lib/text';
import { rankingDescriptions } from '../util/card';
import { useEffect, useRef, useState } from 'react';
import { NAME_LABEL_BACKGROUND_COLOR } from '../util/colors';

export default function PlayerMarker(
  {
    x,
    y,
    avatarStyle,
    nickname,
    stack,
    isActing,
    action = '',
    winner,
  },
) {

  const flash = action
    ? capitalizeFirstLetter(action)
    : winner ?
      capitalizeFirstLetter(rankingDescriptions[winner.ranking])
      : '';

  const [isLabelBig, setIsLabelBig] = useState(false)
  const labelFlashTimeout = useRef(null)

  useEffect(() => {
    if (flash) {
      clearTimeout(labelFlashTimeout.current)
      setIsLabelBig(true)
      labelFlashTimeout.current = setTimeout(() => {
        setIsLabelBig(false)
      }, 400)
    }
    return () => {
      clearTimeout(labelFlashTimeout.current)
    }
  }, [flash])

  return (
    <>
      <PlayerButton
        x={x}
        y={y}
        avatarStyle={avatarStyle}
        nickname={nickname}
        isActing={isActing}
      />
      <StackLabel x={x} y={y - 56}>
        {stack}
      </StackLabel>
      <NameLabel
        x={x}
        y={y + 54}
        scale={isLabelBig ? 1.5 : 1}
        backgroundColor={flash ? '#fff' : NAME_LABEL_BACKGROUND_COLOR}
        borderColor={flash ? NAME_LABEL_BACKGROUND_COLOR : '#fff'}
        color={flash ? NAME_LABEL_BACKGROUND_COLOR : '#fff'}
      >
        { flash || nickname }
      </NameLabel>
    </>
  );
}