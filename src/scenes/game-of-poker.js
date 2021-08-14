import Stage, { ScaleMode } from '../components/stage';
import Canvas from '../components/canvas';
import Table from '../components/table';
import { useEffect, useState } from 'react';
import JoinButton from '../components/join-button';
import JoinForm from '../components/join-form';
import useEventState, { numberOrEmptyStringFromEvent } from '../hooks/use-event-state';
import useFullscreen from '../hooks/use-fullscreen';
import FullscreenButton from '../components/fullscreen-button';
import Popup from '../components/popup';
import { centerForPositions } from '../util/table';
import { useSelector, useDispatch } from 'react-redux'
import { fetchTable, reserveSeat } from '../slices/table-slice';
import { fetchMe } from '../slices/me-slice';

const stageWidth = 1280;
const stageHeight = 720;

const tableWidth = 600;
const tableHeight = 300;
const tableY = 120;
const tableX = stageWidth / 2 - tableWidth / 2

const positions = centerForPositions(tableWidth, tableHeight, tableX, tableY)

export default function GameOfPoker({ tableId }) {
  const [joinFormHidden, setJoinFormHidden] = useState(true);
  const [joinFormDisabled, setJoinFormDisabled] = useState(false);

  const [avatar, onAvatarChange] = useEventState('INITIALS');
  const [nickname, onNicknameChange] = useEventState('');
  const [buyIn, onBuyInChange] = useEventState(200, numberOrEmptyStringFromEvent);
  const [joinDisabled, setJoinDisabled] = useState(false)

  const dispatch = useDispatch()
  const table = useSelector(state => state.table.value)
  const me = useSelector(state => state.me.value)

  console.log(table)
  console.log(me)

  useEffect(() => {
    dispatch(fetchMe())
  }, [])

  useEffect(() => {
    if (me?.uid) {
      dispatch(fetchTable(tableId))
    }
  }, [tableId, me?.uid]);

  useEffect(() => {
    const uid = me?.uid;
    const hasReservation = table?.reservations.find(user => user?.uid === uid)
    const hasSeat = table?.seats.find(user => user?.uid === uid)
    if (joinFormHidden && uid && hasReservation && !hasSeat) {
      setJoinFormHidden(false)
    }
  }, [me?.uid, table?.reservations.length, table?.seats.length])

  const {
    isEnabled: isFullscreenEnabled,
    isFullscreen,
    request: requestFullScreen,
  } = useFullscreen();

  const onFullscreenButtonClick = event => {
    requestFullScreen();
  };

  const onJoinButtonClick = seatIndex => async event => {
    setJoinDisabled(true)
    const result = await dispatch(reserveSeat({ tableId, seatIndex }))
    if (result.error) {
      setJoinDisabled(false)
      return;
    }
  };

  const onJoinFormSubmit = event => {
    // console.log(seatIndex, nickname, buyIn, avatar);
    event.preventDefault();
  };

  const onJoinFormCancel = event => {
    // setSeatIndex(-1);
    // setIsJoinFormVisible(false);
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
        {table?.reservations.map((reservation, index) => (
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
      <Popup show={!joinFormHidden}>
        <JoinForm
          disabled={joinFormDisabled}
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