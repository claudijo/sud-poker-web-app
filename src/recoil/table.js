import { atom, atomFamily, selector } from 'recoil';
import { clientSocketEmitter } from '../socket/client-socket-emitter';

export const tableIdState = atom({
  key: 'TableIdState',
  default: '',
});

const joinTableEffect = tableId => ({ setSelf, trigger }) => {
  if (!tableId) {
    return
  }

  if (trigger === 'get') {
    const getTable = async () => {
      await fetch('/api/me', { credentials: 'same-origin' });
      const response = await clientSocketEmitter.request('join', { id: tableId });
      return response.table
    };

    setSelf(getTable(tableId));
  }

  // TODO: Cleanup with leave table...or?
};

export const tableForIdState = atomFamily({
  key: 'TableForId',
  default: null,
  effects_UNSTABLE: tableId => [
    joinTableEffect(tableId),
  ],
});

export const tableState = selector({
  key: 'Table',
  get: ({ get }) => {
    return tableForIdState(get(tableIdState));
  },
  set: ({ get, set }, newValue) => {
    set(tableForIdState(get(tableIdState)), newValue);
  },
});

