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
import { useSelector, useDispatch } from 'react-redux';
import { cancelReservation, fetchTable, reserveSeat, sitDown } from '../slices/table-slice';
import { fetchMe } from '../slices/me-slice';

const stageWidth = 1280;
const stageHeight = 720;

const tableWidth = 600;
const tableHeight = 300;
const tableY = 150;
const tableX = stageWidth / 2 - tableWidth / 2;

const positions = centerForPositions(tableWidth, tableHeight, tableX, tableY);

export default function GameOfPoker({ tableId }) {
  const [joinFormHidden, setJoinFormHidden] = useState(true);
  const [joinFormDisabled, setJoinFormDisabled] = useState(false);

  const [avatar, onAvatarChange] = useEventState('INITIALS');
  const [nickname, onNicknameChange] = useEventState('');
  const [buyIn, onBuyInChange] = useEventState(200, numberOrEmptyStringFromEvent);
  const [joinButtonsDisabled, setJoinButtonsDisabled] = useState(false);

  const dispatch = useDispatch();
  const table = useSelector(state => state.table.value);
  const me = useSelector(state => state.me.value);
  const seatIndex = useSelector(state => state.seatIndex.value);

  console.log(table);
  // console.log({ seatIndex });
  // console.log(seatIndex)
  // console.log(me)


  // Kick off by fetching user
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  // Fetch table if current user and show initial join form if applicable
  useEffect(() => {
    if (me?.uid) {
      (async () => {
        const { payload } = await dispatch(fetchTable(tableId))

        if (payload) {
          const { table, index: seatIndex } = payload
          if (!table.seats[seatIndex] && seatIndex > -1) {
            setJoinButtonsDisabled(true)
            setJoinFormHidden(false)
          }
        }
      })();
    }
  }, [tableId, me?.uid, dispatch]);


  const {
    isEnabled: isFullscreenEnabled,
    isFullscreen,
    request: requestFullScreen,
  } = useFullscreen();

  const onFullscreenButtonClick = event => {
    requestFullScreen();
  };

  const onJoinButtonClick = index => async event => {
    setJoinButtonsDisabled(true);

    const { error } = await dispatch(reserveSeat({
      tableId,
      seatIndex: index,
    }));

    if (error) {
      setJoinButtonsDisabled(false);
      return;
    }

    setJoinFormHidden(false)
  };

  const onJoinFormSubmit = async event => {
    event.preventDefault();

    setJoinFormDisabled(true);

    const { error } = await dispatch(sitDown({
      tableId,
      seatIndex,
      nickname,
      buyIn,
      avatarStyle: avatar,
    }));

    if (error) {
      setJoinFormDisabled(false);
      return
    }

    setJoinFormHidden(true)
    setJoinButtonsDisabled(false)
  };

  const onJoinFormCancel = async event => {
    setJoinFormHidden(true);

    const { error } = await dispatch(cancelReservation({
      tableId,
      seatIndex,
    }));

    if (error) {
      setJoinFormHidden(false);
      return
    }

    setJoinButtonsDisabled(false)
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
            disabled={joinButtonsDisabled}
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