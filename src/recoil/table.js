import { atom, selector, selectorFamily } from 'recoil';
import { socketEmitterState } from './socket-emitter';


export const tableState = selectorFamily({
  key: 'Table',
  default: null,
  get: tableId => async ({ get }) => {
    const socket = get(socketEmitterState('ws://localhost:3000/ws/poker'));
    const response = await socket.request('join', {id: tableId})

    console.log(response)
    return response.table
  },
  set: value => ({set}, newValue) => {
    console.log('Setting value', newValue)
    set(newValue)
  }
});

// export const reservationsState = selector({
//   key: 'Reservations',
//   default: null,
//   get: async ({ get }) => {
//     console.log(get(meState()));
//     get(meState());
//     return get(tableState);
//   },
// });

