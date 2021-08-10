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
import Popup from '../components/popup';
import { centerForPositions } from '../util/table';

const stageWidth = 1280;
const stageHeight = 720;

const tableWidth = 600;
const tableHeight = 300;
const tableY = 120;
const tableX = stageWidth / 2 - tableWidth / 2

const positions = centerForPositions(tableWidth, tableHeight, tableX, tableY)

export default function GameOfPoker({ tableId }) {
  const [isJoinFormVisible, setIsJoinFormVisible] = useState(false);

  const [avatar, onAvatarChange] = useEventState('INITIALS');
  const [nickname, onNicknameChange] = useEventState('');
  const [buyIn, onBuyInChange] = useEventState(200, numberOrEmptyStringFromEvent);
  const [seatIndex, setSeatIndex] = useState(-1);
  const [joinDisabled, setJoinDisabled] = useState(false)

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

  const onJoinButtonClick = index => async event => {
    setJoinDisabled(true)
    // setSeatIndex(index);
    // setIsJoinFormVisible(true);
  };

  const onJoinFormSubmit = event => {
    console.log(seatIndex, nickname, buyIn, avatar);
    event.preventDefault();
  };

  const onJoinFormCancel = event => {
    setSeatIndex(-1);
    setIsJoinFormVisible(false);
  };

  return (
    <Stage width={stageWidth} height={stageHeight} scaleMode={ScaleMode.SCALE_TO_FIT}>
      {/*Background layer*/}
      <Canvas>
        <Table
          x={tableX}
          y={tableY}
          width={tableWidth}
          height={tableHeight}
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
            disabled={joinDisabled}
            key={index}
            x={positions[index].x}
            y={positions[index].y}
            onClick={onJoinButtonClick(index)}
          />
        ))}
        {isFullscreenEnabled && !isFullscreen && (
          <FullscreenButton
            x={stageWidth - 64}
            y={stageHeight - 64}
            onClick={onFullscreenButtonClick}
          />
        )}
      </Canvas>
      {/*Html overlays*/}
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