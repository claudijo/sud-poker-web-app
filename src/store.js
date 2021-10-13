import { configureStore } from '@reduxjs/toolkit';
import me from './slices/me-slice';
import seatIndex from './slices/seat-index';
import seat from './slices/seat';
import holeCards from './slices/hole-cards';
import playerToAct from './slices/player-to-act';
import communityCards from './slices/community-cards';
import legalActions from './slices/legal-actions';
import seats from './slices/seats';
import pots from './slices/pots';
import button from './slices/button';
import reservations from './slices/reservations';
import winners from './slices/winners';
import handPlayers from './slices/hand-players';
import action from './slices/action';
import automaticActions from './slices/automatic-actions'

export default configureStore({
  reducer: {
    me,
    seatIndex,
    seat,
    holeCards,
    playerToAct,
    communityCards,
    legalActions,
    seats,
    pots,
    button,
    reservations,
    winners,
    handPlayers,
    action,
    automaticActions,
  },
});