import { useCallback, useEffect, useMemo } from 'react';
import { setCommunityCards } from '../slices/community-cards';
import { setHoleCards } from '../slices/hole-cards';
import { setPots } from '../slices/pots';
import { setButton } from '../slices/button';
import { setPlayerToAct } from '../slices/player-to-act';
import { setSeats } from '../slices/seats';
import { setLegalActions } from '../slices/legal-actions';
import { clientSocketEmitter } from '../socket/client-socket-emitter';
import { useDispatch } from 'react-redux';
import CommandQueue from '../util/command-queue';
import { setReservations } from '../slices/reservations';
import { setWinners } from '../slices/winners';
import { setHandPlayers } from '../slices/hand-players';
import { setAutomaticActions } from '../slices/automatic-actions';
import { setUnfoldingAction } from '../slices/unfolding-actions';

const commandQueue = new CommandQueue();

const actionTakenTimeouts = [];

export default function RealTimeEventHandler({ tableId }) {
  const dispatch = useDispatch();

  const onStartHand = useCallback(payload => {
    if (payload.table.id !== tableId) {
      return;
    }

    commandQueue.enqueue(() => {
      dispatch(setButton(payload.table.button));
      dispatch(setWinners([]));
    }, { delayEnd: 800 });

    commandQueue.enqueue(() => {
      dispatch(setSeats(payload.table.seats));
    });

    commandQueue.enqueue(() => {
      dispatch(setHoleCards(payload.holeCards));
      dispatch(setHandPlayers(payload.table.handPlayers));
    }, { delayEnd: 1200 });

    commandQueue.enqueue(() => {
      dispatch(setPlayerToAct(payload.table.playerToAct));
      dispatch(setAutomaticActions(payload.automaticActions));
      dispatch(setLegalActions(payload.table.legalActions));
    });
  }, [dispatch, tableId]);

  const onBettingRoundEnd = useCallback(payload => {
    if (payload.table.id !== tableId) {
      return;
    }

    commandQueue.enqueue(() => {
      dispatch(setSeats(payload.table.seats));
    }, {
      delayStart: 1200,
    });

    commandQueue.enqueue(() => {
      dispatch(setPots(payload.table.pots));
    });

    commandQueue.enqueue(() => {
      dispatch(setCommunityCards(payload.table.communityCards));
    }, {
      delayEnd: payload.table.communityCards.length === 3 ? 2400 : 800,
    });

    commandQueue.enqueue(() => {
      dispatch(setPlayerToAct(payload.table.playerToAct));
      dispatch(setAutomaticActions(payload.automaticActions));
      dispatch(setLegalActions(payload.table.legalActions));
    });

  }, [dispatch, tableId]);

  const onActionTaken = useCallback(payload => {
    if (payload.table.id !== tableId) {
      return;
    }

    const unfoldingActions = [...payload.unfoldingAutomaticActions];
    unfoldingActions[payload.actor] = payload.action;

    // Flash unfolding actions
    unfoldingActions.forEach((action, seatIndex) => {
      if (action) {
        dispatch(setUnfoldingAction({ action, seatIndex }));
        clearTimeout(actionTakenTimeouts[seatIndex]);
        actionTakenTimeouts[seatIndex] = setTimeout(() => {
          dispatch(setUnfoldingAction({ action: '', seatIndex }));
        }, 2000);
      }
    })

    commandQueue.enqueue(() => {
      dispatch(setHandPlayers(payload.table.handPlayers));
      dispatch(setSeats(payload.table.seats));
    }, { delayEnd: 400 });

    commandQueue.enqueue(() => {
      dispatch(setAutomaticActions(payload.automaticActions));
      dispatch(setLegalActions(payload.table.legalActions));
      dispatch(setPlayerToAct(payload.table.playerToAct));
    });
  }, [dispatch, tableId]);

  const onReservationChange = useCallback(payload => {
    if (payload.table.id !== tableId) {
      return;
    }

    dispatch(setReservations(payload.table.reservations));
  }, [dispatch, tableId]);

  const onSitDown = useCallback(payload => {
    if (payload.table.id !== tableId) {
      return;
    }

    commandQueue.enqueue(() => {
      // Order matters
      dispatch(setReservations(payload.table.reservations));
      dispatch(setSeats(payload.table.seats));
    })
  }, [dispatch, tableId]);

  const onStandUp = useCallback(payload => {
    if (payload.table.id !== tableId) {
      return;
    }

    commandQueue.enqueue(() => {
      // Order matters
      dispatch(setSeats(payload.table.seats));
      dispatch(setReservations(payload.table.reservations));
    })

  }, [dispatch, tableId]);

  const onShowdown = useCallback(payload => {
    if (payload.table.id !== tableId) {
      return;
    }

    commandQueue.enqueue(() => {
      dispatch(setPots(payload.table.pots));
      dispatch(setSeats(payload.table.seats));
    })

    payload.table.winners.forEach(potWinners => {
      commandQueue.enqueue(() => {
        dispatch(setWinners(potWinners));
      }, { delayEnd: 3500 });
    });

    commandQueue.enqueue(() => {
      dispatch(setHoleCards([]));
      dispatch(setCommunityCards([]));
      dispatch(setHandPlayers([]));
    })
  }, [dispatch, tableId]);

  // Set up table change listeners
  useEffect(() => {
    clientSocketEmitter.on('reserveSeat', onReservationChange);
    clientSocketEmitter.on('cancelReservation', onReservationChange);
    clientSocketEmitter.on('sitDown', onSitDown);
    clientSocketEmitter.on('standUp', onStandUp);
    clientSocketEmitter.on('startHand', onStartHand);
    clientSocketEmitter.on('actionTaken', onActionTaken);
    clientSocketEmitter.on('bettingRoundEnd', onBettingRoundEnd);
    clientSocketEmitter.on('showdown', onShowdown);

    return () => {
      clientSocketEmitter.off('reserveSeat', onReservationChange);
      clientSocketEmitter.off('cancelReservation', onReservationChange);
      clientSocketEmitter.off('sitDown', onSitDown);
      clientSocketEmitter.on('standUp', onStandUp);
      clientSocketEmitter.off('startHand', onStartHand);
      clientSocketEmitter.off('actionTaken', onActionTaken);
      clientSocketEmitter.off('bettingRoundEnd', onBettingRoundEnd);
      clientSocketEmitter.off('showdown', onShowdown);
    };
  }, [onReservationChange, onStartHand, onActionTaken, onBettingRoundEnd]);

  return null;
}