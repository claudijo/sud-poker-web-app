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

const commandQueue = new CommandQueue();

export default function RealTimeEventHandler({ tableId }) {
  const dispatch = useDispatch()

  const onStartHand = useCallback(payload => {
    if (payload.table.id !== tableId) {
      return;
    }

    commandQueue.enqueue(() => {
      dispatch(setCommunityCards([]));
      dispatch(setHoleCards([]));
      dispatch(setPots([]));
      dispatch(setButton(payload.table.button))
    }, { delayEnd: 800 });

    commandQueue.enqueue(() => {
      dispatch(setPlayerToAct(payload.table.playerToAct));
    }, { delayEnd: 800 });

    commandQueue.enqueue(() => {
      dispatch(setSeats(payload.table.seats));
    });

    commandQueue.enqueue(() => {
      dispatch(setHoleCards(payload.holeCards));
    }, { delayEnd: 1200 });

    commandQueue.enqueue(() => {
      dispatch(setLegalActions(payload.table.legalActions));
    });
  }, [dispatch, tableId]);

  const onBettingRoundEnd = useCallback(payload => {
    if (payload.table.id !== tableId) {
      return;
    }

    commandQueue.enqueue(() => {
      dispatch(setSeats(payload.table.seats));
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
      dispatch(setLegalActions(payload.table.legalActions));
      dispatch(setPlayerToAct(payload.table.playerToAct));
    });

  },[dispatch, tableId]);

  const onActionTaken = useCallback(payload => {
    if (payload.table.id !== tableId) {
      return;
    }

    commandQueue.enqueue(() => {
      dispatch(setSeats(payload.table.seats));
    }, { delayEnd: 400 });

    commandQueue.enqueue(() => {
      dispatch(setLegalActions(payload.table.legalActions));
      dispatch(setPlayerToAct(payload.table.playerToAct));
    });
  }, [dispatch, tableId]);

  const onReservationChange = useCallback(payload => {
    if (payload.table.id !== tableId) {
      return;
    }
    dispatch(setReservations(payload.table.reservations))
  }, [dispatch, tableId])

  const onSitDown = useCallback(payload => {
    if (payload.table.id !== tableId) {
      return;
    }
    dispatch(setReservations(payload.table.reservations))
    dispatch(setSeats(payload.table.seats))
  }, [dispatch, tableId])

  // Set up table change listeners
  useEffect(() => {
    clientSocketEmitter.on('reserveSeat', onReservationChange);
    clientSocketEmitter.on('cancelReservation', onReservationChange);
    clientSocketEmitter.on('sitDown', onSitDown);
    //
    clientSocketEmitter.on('startHand', onStartHand);
    clientSocketEmitter.on('actionTaken', onActionTaken);
    clientSocketEmitter.on('bettingRoundEnd', onBettingRoundEnd);
    //
    // clientSocketEmitter.on('showdown', onBettingRoundEnd);

    return () => {
      clientSocketEmitter.off('reserveSeat', onReservationChange);
      clientSocketEmitter.off('cancelReservation', onReservationChange);
      clientSocketEmitter.off('sitDown', onSitDown);
      //
      // clientSocketEmitter.off('startHand', onHoleCardsChange);

      clientSocketEmitter.off('startHand', onStartHand);
      clientSocketEmitter.off('actionTaken', onActionTaken);
      clientSocketEmitter.off('bettingRoundEnd', onBettingRoundEnd);
      //
      // clientSocketEmitter.off('showdown', onBettingRoundEnd);
    };
  }, [onReservationChange, onStartHand, onActionTaken, onBettingRoundEnd]);

  return null;
}