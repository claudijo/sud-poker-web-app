import React from 'react';
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
import { actionTaken, cancelReservation, fetchTable, reserveSeat, setTable, sitDown } from '../slices/table-slice';
import { fetchMe } from '../slices/me-slice';
import { clientSocketEmitter } from '../socket/client-socket-emitter';
import PlayerMarker from '../components/player-marker';
import PlayerHand from '../components/player-hand';
import ActionBar from '../components/action-bar';
import ActionForm from '../components/action-form';
import TableBets from '../components/table-bets';
import CommunityCards from '../components/community-cards';
import { setHoleCards } from '../slices/hole-cards';
import { useTransition } from "react";

const stageWidth = 1280;
const stageHeight = 720;

const tableWidth = 600;
const tableHeight = 300;
const tableY = 160;
const tableX = stageWidth / 2 - tableWidth / 2;

const positions = centerForPositions(tableWidth, tableHeight, tableX, tableY);

export default function GameOfPoker({ tableId }) {
  const [joinFormHidden, setJoinFormHidden] = useState(true);
  const [joinFormDisabled, setJoinFormDisabled] = useState(false);
  const [actionFormDisabled, setActionFormDisabled] = useState(false);

  const [avatar, onAvatarChange] = useEventState('IDENTICON');
  const [nickname, onNicknameChange] = useEventState('');
  const [buyIn, onBuyInChange] = useEventState(200, numberOrEmptyStringFromEvent);
  const [joinButtonsDisabled, setJoinButtonsDisabled] = useState(false);

  const [betSize, onBetSizeChange, setBetSize] = useEventState(0, numberOrEmptyStringFromEvent);

  const dispatch = useDispatch();
  const table = useSelector(state => state.table.value);
  const me = useSelector(state => state.me.value);
  const seatIndex = useSelector(state => state.seatIndex.value);
  const holeCards = useSelector(state => state.holeCards.value);

  useEffect(() => {
    setBetSize(table?.legalActions?.chipRange.min ?? 0);
  }, [setBetSize, table?.legalActions?.chipRange.min]);

  // Set up table change listeners
  useEffect(() => {
    const onTableChange = payload => {
      if (payload.table.id === tableId) {
        dispatch(setTable(payload));
      }
    };

    const onHoleCardsChange = payload => {
      if (payload.table.id === tableId) {
        dispatch(setHoleCards(payload))
      }
    }

    const onBettingRoundEnd = payload => {
      if (payload.table.id === tableId) {
        dispatch(setTable(payload));
      }
    }

    clientSocketEmitter.on('reserveSeat', onTableChange);
    clientSocketEmitter.on('cancelReservation', onTableChange);
    clientSocketEmitter.on('sitDown', onTableChange);

    clientSocketEmitter.on('startHand', onTableChange);
    clientSocketEmitter.on('startHand', onHoleCardsChange);

    clientSocketEmitter.on('actionTaken', onTableChange);
    clientSocketEmitter.on('bettingRoundEnd', onBettingRoundEnd);

    clientSocketEmitter.on('showdown', onBettingRoundEnd);

    return () => {
      clientSocketEmitter.off('reserveSeat', onTableChange);
      clientSocketEmitter.off('cancelReservation', onTableChange);
      clientSocketEmitter.off('sitDown', onTableChange);

      clientSocketEmitter.off('startHand', onTableChange);
      clientSocketEmitter.off('startHand', onHoleCardsChange);

      clientSocketEmitter.off('actionTaken', onTableChange);
      clientSocketEmitter.off('bettingRoundEnd', onBettingRoundEnd);

      clientSocketEmitter.off('showdown', onBettingRoundEnd);
    };
  }, [dispatch, tableId]);

  // Kick off by fetching user
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  // Fetch table if current user and show initial join form if applicable
  useEffect(() => {
    if (me?.uid) {
      (async () => {
        const { payload } = await dispatch(fetchTable(tableId));

        if (payload) {
          const { table, index: seatIndex } = payload;
          if (!table.seats[seatIndex] && seatIndex > -1) {
            setJoinButtonsDisabled(true);
            setJoinFormHidden(false);
          }
        }
      })();
    }
  }, [dispatch, tableId, me?.uid]);

  const {
    fullScreen: isFullscreen,
    open: requestFullScreen,
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

    setJoinFormHidden(false);
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
      return;
    }

    setJoinFormHidden(true);
    setJoinButtonsDisabled(false);
  };

  const onJoinFormCancel = async event => {
    setJoinFormHidden(true);

    const { error } = await dispatch(cancelReservation({
      tableId,
      seatIndex,
    }));

    if (error) {
      setJoinFormHidden(false);
      return;
    }

    setJoinButtonsDisabled(false);
  };

  const onBetFormSubmit = async event => {
    event.preventDefault();
    const action = table.legalActions.actions.includes('bet') ? 'bet' : 'raise';

    setActionFormDisabled(true);

    await dispatch(actionTaken({
      tableId,
      action,
      betSize,
    }));

    setActionFormDisabled(false);
  };

  const onActionButtonClick = action => async event => {
    setActionFormDisabled(true);

    await dispatch(actionTaken({
      tableId,
      action,
    }));

    setActionFormDisabled(false);
  };

  return (
    <Stage
      width={stageWidth}
      height={stageHeight}
      scaleMode={ScaleMode.SCALE_TO_FIT}
      backgroundColor="#fefcca"
    >
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
        <>
          {positions[seatIndex] && holeCards.length && (
            <PlayerHand
              x={positions[seatIndex].x}
              y={positions[seatIndex].y}
              holeCards={holeCards}
            />
          )}
          {
            table?.communityCards?.length && (
              <CommunityCards
                x={tableX + tableWidth / 2 - 33 - 2 * 60}
                y={tableY + tableHeight / 2 - 11 }
                cards={table.communityCards}
              />
            )
          }
          { table && (
            <TableBets
              centerX={tableX + tableWidth / 2}
              centerY={tableY + tableHeight / 2}
              positions={positions}
              potSizes={table?.pots?.map(pot => pot.size) ?? []}
              betSizes={table?.seats?.map(seat => seat?.betSize ?? null) ?? []}
              bigBlind={table?.forcedBets.bigBlind}
            />
          )}
        </>

      </Canvas>
      {/*Ui layer*/}
      <Canvas interactive={true}>
        {
          table?.seats
            .map((seat, index) => (
              <React.Fragment key={index}>
                {table.seats[index] && (
                  <PlayerMarker
                    key={index}
                    x={positions[index].x}
                    y={positions[index].y}
                    totalChips={table.seats[index].totalChips}
                    stack={table.seats[index].stack}
                    betSize={table.seats[index].betSize}
                    nickname={table.reservations[index].name}
                    avatarStyle={table.reservations[index].avatarStyle}
                    showFaceDownCards={table.hasHoleCards?.[index] && index !== seatIndex}
                  />
                )}
              </React.Fragment>
            ))
        }

        {
          !table?.seats[seatIndex] && table?.reservations
            .map((reservation, index) => (
              <React.Fragment key={index}>
                {!table.seats[index] && (
                  <JoinButton
                    disabled={joinButtonsDisabled || !!table.reservations[index]}
                    key={index}
                    x={positions[index].x}
                    y={positions[index].y}
                    onClick={onJoinButtonClick(index)}
                  />
                )}
              </React.Fragment>
            ))
        }

        {!isFullscreen && (
          <FullscreenButton
            x={stageWidth - 56}
            y={stageHeight - 56}
            onClick={onFullscreenButtonClick}
          />
        )}
      </Canvas>
      {/*Html overlays*/}
      {table?.legalActions?.actions.length && table.playerToAct === seatIndex && (
        <ActionBar>
          <ActionForm
            disabled={actionFormDisabled}
            onSubmit={onBetFormSubmit}
            actions={table.legalActions.actions}
            onBetSizeChange={onBetSizeChange}
            betSize={betSize}
            min={table?.legalActions?.chipRange.min}
            max={table?.legalActions?.chipRange.max}
            onActionButtonClick={onActionButtonClick}
          />
        </ActionBar>
      )}

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