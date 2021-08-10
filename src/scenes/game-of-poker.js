import Stage, { ScaleMode } from '../components/stage';
import Canvas from '../components/canvas';
import Table from '../components/table';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentTableIdState, tableState } from '../recoil/table';
import JoinButton from '../components/join-button';
import JoinForm from '../components/join-form';
import useEventState, { numberOrEmptyStringFromEvent } from '../hooks/use-event-state';
import useFullscreen from '../hooks/use-fullscreen';
import FullscreenButton from '../components/fullscreen-button';
import Backdrop from '../components/backdrop';
import Popup from '../components/popup';

const width = 1280;
const height = 720;

export default function GameOfPoker({ tableId }) {
  const [isJoinFormVisible, setIsJoinFormVisible] = useState(false);

  const [avatar, onAvatarChange] = useEventState('INITIALS');
  const [nickname, onNicknameChange] = useEventState('');
  const [buyIn, onBuyInChange] = useEventState(200, numberOrEmptyStringFromEvent);
  const [seatIndex, setSeatIndex] = useState(-1);

  const setTableId = useSetRecoilState(currentTableIdState);
  const table = useRecoilValue(tableState);

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
  };

  const onJoinFormSubmit = event => {
    console.log(seatIndex, nickname, buyIn, avatar);
    event.preventDefault();
  };

  const onJoinFormCancel = event => {
    setSeatIndex(-1);
    setIsJoinFormVisible(false);
  }

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
          <Popup show={isJoinFormVisible}>
            <JoinForm
              onSubmit={onJoinFormSubmit}
              onCancel={onJoinFormCancel}
              avatar={avatar}
              onAvatarChange={onAvatarChange}
              nickname={nickname}
              onNicknameChange={onNicknameChange}
              buyIn={buyIn}
              onBuyInChange={onBuyInChange}
            />
          </Popup>
    </Stage>
  );
}