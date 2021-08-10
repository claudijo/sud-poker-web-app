import Stage, { ScaleMode } from '../components/stage';
import Canvas from '../components/canvas';
import Table from '../components/table';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentTableIdState, tableState } from '../recoil/table';
import JoinButton from '../components/join-button';
import JoinForm from '../components/join-form';
import useEventState, { numberOrEmptyStringFromEvent } from '../hooks/use-event-state';
import { useSpring, animated, config } from '@react-spring/web';
import useFullscreen from '../hooks/use-fullscreen';
import FullscreenButton from '../components/fullscreen-button';
import Backdrop from '../components/backdrop';
// import useAnimation from '../hooks/use-animation';
// import { easeInOutSine, easeOutBounce } from '../lib/tweens';

const width = 1280;
const height = 720;

export default function GameOfPoker({ tableId }) {
  const [isJoinFormVisible, setIsJoinFormVisible] = useState(false);

  const [avatar, onAvatarChange] = useEventState('MALE');
  const [nickname, onNicknameChange] = useEventState('');
  const [buyIn, onBuyInChange] = useEventState('', numberOrEmptyStringFromEvent);
  const [seatIndex, setSeatIndex] = useState(-1);

  // const [animatedValue, animate] = useAnimation(720, 100, 400, easeOutBounce)

  const setTableId = useSetRecoilState(currentTableIdState);
  const table = useRecoilValue(tableState);

  const [style, api] = useSpring({
    top: '720px',
    onRest: () => {
      console.log(
        'done',
      );
    },
    config: {
      // ...config.wobbly,
      mass: 1,
      friction: 15,
      tension: 600,
    },
  }, []);

  useEffect(() => {
    setTableId(tableId);
  }, [setTableId, tableId]);

  const {
    isEnabled: isFullscreenEnabled,
    isFullscreen,
    request: requestFullScreen,
    exit: exitFullscreen,
  } = useFullscreen();

  const onFullscreenButtonClick = event => {
    requestFullScreen();
  };

  const onJoinButtonClick = index => event => {
    setSeatIndex(index);
    setIsJoinFormVisible(true);
    // animate()
    api.start({ top: '100px' });
  };

  const onJoinFromSubmit = event => {
    console.log(seatIndex, nickname, buyIn, avatar);
    event.preventDefault();
  };

  return (
    <Stage width={width} height={height} scaleMode={ScaleMode.SCALE_TO_FIT}>
      {/*Background layer*/}
      <Canvas>
        <Table
          x={width / 2 - 600 / 2}
          y={120}
          width={600}
          height={300}
          borderWidth={16}
        />
      </Canvas>
      {/*Animation layer*/}
      <Canvas>

      </Canvas>
      {/*Ui layer*/}
      <Canvas interactive={true}>
        {table && table.reservations.map((reservation, index) => (
          <JoinButton
            key={index}
            x={50 * index}
            y={100}
            onClick={onJoinButtonClick(index)}
          />
        ))}
        {isFullscreenEnabled && !isFullscreen && (
          <FullscreenButton
            x={width - 64}
            y={height - 64}
            onClick={onFullscreenButtonClick}
          />
        )}
      </Canvas>
      {isJoinFormVisible && (
        <>
          <Backdrop/>
          <animated.div
            style={{
              position: 'absolute',
              left: '25%',
              width: '50%',
              // top: `${animatedValue}px`,
              top: '720px',
              ...style,
            }}
          >
            <JoinForm
              onSubmit={onJoinFromSubmit}
              avatar={avatar}
              onAvatarChange={onAvatarChange}
              nickname={nickname}
              onNicknameChange={onNicknameChange}
              buyIn={buyIn}
              onBuyInChange={onBuyInChange}
            />
          </animated.div>
        </>
      )}
    </Stage>
  );
}