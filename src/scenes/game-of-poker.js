import React from 'react';
import Table from '../components/table';
import { useEffect, useState } from 'react';
import JoinButton from '../components/join-button';
import JoinForm from '../components/join-form';
import useEventState, { numberOrEmptyStringFromEvent } from '../hooks/use-event-state';
import useFullscreen from '../hooks/use-fullscreen';
import Popup from '../components/popup';
import { buttonPositionOffset, centerForPositions, showCardsRtl } from '../util/table';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionTaken,
  cancelReservation,
  fetchTable,
  reserveSeat,
  setAutomaticAction,
  sitDown, standUp,
} from '../slices/table-slice';
import { fetchMe } from '../slices/me-slice';
import PlayerMarker from '../components/player-marker';
import PlayerHand from '../components/player-hand';
import ActionBar from '../components/action-bar';
import ActionForm from '../components/action-form';
import TableBets from '../components/table-bets';
import CommunityCards from '../components/community-cards';
import OpponentHand from '../components/opponent-hand';
import DealerButton from '../components/dealer-button';
import { STAGE_BACKGROUND_COLOR } from '../util/colors';
import { Stage, Layer, ScaleMode } from 'react-2d-canvas';
import AutomaticActionForm from '../components/automatic-action-form';
import ToolBar from '../components/tool-bar';
import Button from '../components/button';
import { ReactComponent as LeaveIcon } from '../icons/leave.svg';
import { ReactComponent as FullScreenIcon } from '../icons/fullscreen.svg';
import { ReactComponent as ExitFullScreenIcon } from '../icons/exit-fullscreen.svg';

const stageWidth = 1280;
const stageHeight = 720;

const tableWidth = 600;
const tableHeight = 300;
const tableY = 310;
const tableX = stageWidth / 2;

const positions = centerForPositions(tableWidth, tableHeight, tableX - tableWidth / 2, tableY - tableHeight / 2);

export default function GameOfPoker({ tableId }) {
  const dispatch = useDispatch();

  const [joinFormHidden, setJoinFormHidden] = useState(true);
  const [joinFormDisabled, setJoinFormDisabled] = useState(false);
  const [actionFormDisabled, setActionFormDisabled] = useState(false);
  const [actionFormHidden, setActionFormHidden] = useState(true);
  const [automaticActionFormHidden, setAutomaticActionFormHidden] = useState(true);
  const [joinButtonsDisabled, setJoinButtonsDisabled] = useState(false);

  const [avatar, onAvatarChange] = useEventState('IDENTICON');
  const [nickname, onNicknameChange] = useEventState('');
  const [buyIn, onBuyInChange] = useEventState(200, numberOrEmptyStringFromEvent);
  const [betSize, onBetSizeChange, setBetSize] = useEventState(0, numberOrEmptyStringFromEvent);

  const me = useSelector(state => state.me.value);
  const seatIndex = useSelector(state => state.seatIndex.value);
  const holeCards = useSelector(state => state.holeCards.value);
  const playerToAct = useSelector(state => state.playerToAct.value);
  const communityCards = useSelector(state => state.communityCards.value);
  const legalActions = useSelector(state => state.legalActions.value);
  const seats = useSelector(state => state.seats.value);
  const pots = useSelector(state => state.pots.value);
  const button = useSelector(state => state.button.value);
  const reservations = useSelector(state => state.reservations.value);
  const winners = useSelector(state => state.winners.value);
  const handPlayers = useSelector(state => state.handPlayers.value);
  const unfoldingActions = useSelector(state => state.unfoldingActions.value);
  const automaticActions = useSelector(state => state.automaticActions.value);

  useEffect(() => {
    setBetSize(legalActions.chipRange.min);
  }, [setBetSize, legalActions.chipRange.min]);

  // Kick off by fetching user
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  // Fetch once we have current user
  useEffect(() => {
    if (me?.uid) {
      (async () => {
        await dispatch(fetchTable(tableId));
      })();
    }
  }, [dispatch, tableId, me?.uid]);

  // Show initial join form if applicable
  useEffect(() => {
    if (!seats[seatIndex] && seatIndex > -1) {
      setJoinButtonsDisabled(true);
      setJoinFormHidden(false);
    }
  }, [seats, seatIndex, setJoinButtonsDisabled, setJoinFormHidden]);

  useEffect(() => {
    setActionFormHidden(playerToAct === -1 || playerToAct !== seatIndex);
  }, [playerToAct, seatIndex]);

  useEffect(() => {
    setAutomaticActionFormHidden(!seats[seatIndex] || playerToAct === -1 || playerToAct === seatIndex || !automaticActions.canSetAutomaticActions);
  }, [playerToAct, seatIndex, automaticActions.canSetAutomaticActions, seats[seatIndex]]);

  const {
    fullScreen: isFullscreen,
    open: openFullScreen,
    close: closeFullScreen,
  } = useFullscreen();

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
      nickname,
      buyIn,
      avatarStyle: avatar,
    }));

    setJoinFormDisabled(false);

    if (error) {
      return;
    }

    setJoinFormHidden(true);
    setJoinButtonsDisabled(false);
  };

  const onJoinFormCancel = async event => {
    setJoinFormHidden(true);

    const { error } = await dispatch(cancelReservation({
      tableId,
    }));

    if (error) {
      setJoinFormHidden(false);
      return;
    }

    setJoinButtonsDisabled(false);
  };

  const onBetFormSubmit = async event => {
    event.preventDefault();
    const action = legalActions.actions.includes('bet') ? 'bet' : 'raise';

    setActionFormDisabled(true);

    const { error } = await dispatch(actionTaken({
      tableId,
      action,
      betSize,
    }));

    setActionFormDisabled(false);

    if (!error) {
      setActionFormHidden(true);
    }
  };

  const onActionButtonClick = action => async event => {
    setActionFormDisabled(true);

    const { error } = await dispatch(actionTaken({
      tableId,
      action,
    }));

    setActionFormDisabled(false);

    if (!error) {
      setActionFormHidden(true);
    }
  };

  const onAutomaticActionChange = async event => {
    await dispatch(setAutomaticAction({
      tableId,
      action: event.target.value,
    }));
  };

  const onAutomaticActionClick = async event => {
    if (event.target.value === automaticActions.automaticAction) {
      await dispatch(setAutomaticAction({
        tableId,
        action: null,
      }));
    }
  };

  const onLeaveClick = async event => {
    await dispatch(standUp({ tableId }));
  };

  const onFullscreenClick = event => {
    if (isFullscreen) {
      closeFullScreen();
    } else {
      openFullScreen();
    }
  };

  return (
    <Stage
      width={stageWidth}
      height={stageHeight}
      scaleMode={ScaleMode.SCALE_TO_FIT}
      backgroundColor={STAGE_BACKGROUND_COLOR}
    >
      {/*Background layer*/}
      <Layer>
        <Table
          x={tableX}
          y={tableY}
          width={tableWidth}
          height={tableHeight}
          borderWidth={16}
        />
      </Layer>

      {/*Game action layer*/}
      <Layer>
        <>
          {
            button !== -1 && (
              <DealerButton
                x={buttonPositionOffset(button, positions[button]).x}
                y={buttonPositionOffset(button, positions[button]).y}
              />
            )
          }
          {positions[seatIndex] && holeCards.length && (
            <PlayerHand
              x={positions[seatIndex].x}
              y={positions[seatIndex].y}
              holeCards={holeCards}
              rtl={showCardsRtl(seatIndex)}
              isHandPlayer={handPlayers[seatIndex]}
              winners={winners}
            />
          )}
          <TableBets
            centerX={tableX}
            centerY={tableY}
            positions={positions}
            potSizes={pots.map(pot => pot.size) ?? []}
            betSizes={seats.map(seat => seat?.betSize ?? null) ?? []}
          />
          {
            communityCards.length && (
              <CommunityCards
                x={tableX}
                y={tableY}
                cards={communityCards}
                winners={winners}
              />
            )
          }
        </>
      </Layer>
      {/*/!*Ui layer*!/*/}
      <Layer>
        {
          seats.map((seat, index) => (
            // Need a compound `key` so that the child <OpponentHand/> is
            // re-rendered properly
            <React.Fragment key={`${index}${!!handPlayers[index]}`}>
              {seats[index] && (
                <>
                  <PlayerMarker
                    action={unfoldingActions[index]}
                    x={positions[index].x}
                    y={positions[index].y}
                    totalChips={seats[index].totalChips}
                    stack={seats[index].stack}
                    betSize={seats[index].betSize}
                    nickname={reservations[index]?.name}
                    avatarStyle={reservations[index]?.avatarStyle}
                    isActing={index === playerToAct}
                  />
                  {handPlayers[index] && index !== seatIndex && (
                    <OpponentHand
                      x={positions[index].x}
                      y={positions[index].y}
                      rtl={showCardsRtl(index)}
                      winner={winners.find(winner => winner.seatIndex === index)}
                    />
                  )}
                </>
              )}
            </React.Fragment>
          ))
        }

        {
          !seats[seatIndex] && reservations.map((reservation, index) => (
            <React.Fragment key={index}>
              {!seats[index] && (
                <JoinButton
                  disabled={joinButtonsDisabled || !!reservations[index]}
                  key={index}
                  x={positions[index].x}
                  y={positions[index].y}
                  onClick={onJoinButtonClick(index)}
                />
              )}
            </React.Fragment>
          ))
        }
      </Layer>
      {/*/!*Html overlays*!/*/}
      <ToolBar>
        {
          seatIndex !== -1 && seats[seatIndex] && (
            <Button onClick={onLeaveClick} theme="toolbar" title="Leave table">
              <LeaveIcon/>
            </Button>
          )
        }
        <Button onClick={onFullscreenClick} theme="toolbar" title="Toggle fullscreen">
          {isFullscreen
            ? <ExitFullScreenIcon/>
            : <FullScreenIcon/>
          }
        </Button>
      </ToolBar>
      {!actionFormHidden && legalActions.actions.length > 0 && (
        <ActionBar>
          <ActionForm
            disabled={actionFormDisabled}
            onSubmit={onBetFormSubmit}
            actions={legalActions.actions}
            onBetSizeChange={onBetSizeChange}
            betSize={betSize}
            min={legalActions.chipRange.min}
            max={legalActions.chipRange.max}
            onActionButtonClick={onActionButtonClick}
          />
        </ActionBar>
      )}

      {!automaticActionFormHidden && automaticActions.legalAutomaticActions.length > 0 && (
        <ActionBar>
          <AutomaticActionForm
            onChange={onAutomaticActionChange}
            onClick={onAutomaticActionClick}
            automaticActions={automaticActions.legalAutomaticActions}
            automaticAction={automaticActions.automaticAction}
          />
        </ActionBar>
      )}

      <Popup show={!joinFormHidden} blurredBackdrop={true}>
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