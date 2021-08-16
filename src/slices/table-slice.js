import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clientSocketEmitter } from '../socket/client-socket-emitter';

const initialState = {
  value: null,
  isFetching: false,
  error: null,
};

export const fetchTable = createAsyncThunk('table/fetchTable', async (tableId) => {
  const response = await clientSocketEmitter.request('join', {
    id: tableId,
  });
  return response;
});

export const reserveSeat = createAsyncThunk('table/reserveSeat', async ({ tableId, seatIndex }) => {
  const response = await clientSocketEmitter.request('reserveSeat', {
    id: tableId,
    index: seatIndex,
  });
  return response;
});

export const cancelReservation = createAsyncThunk('table/cancelReservation', async({ tableId, seatIndex}) => {
  const response = await clientSocketEmitter.request('cancelReservation', {
    id: tableId,
    index: seatIndex,
  });
  return response;
})

export const sitDown = createAsyncThunk('table/sitDown', async ({ tableId, seatIndex, nickname, buyIn, avatarStyle }) => {
  const response = await clientSocketEmitter.request('sitDown', {
    id: tableId,
    index: seatIndex,
    name: nickname,
    buyIn,
    avatarStyle,
  })
  return response;
})

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.value = action.payload.table;
    }
  },
  extraReducers: {
    [fetchTable.pending]: state => {
      state.isFetching = true;
      state.error = null;
    },
    [fetchTable.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.value = action.payload.table;
    },
    [fetchTable.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = action.error;
    },

    [reserveSeat.pending]: state => {
      state.isFetching = true;
      state.error = null;
    },
    [reserveSeat.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.value = action.payload.table;
    },
    [reserveSeat.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = action.error;
    },

    [cancelReservation.pending]: state => {
      state.isFetching = true;
      state.error = null;
    },
    [cancelReservation.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.value = action.payload.table;
    },
    [cancelReservation.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = action.error;
    },

    [sitDown.pending]: state => {
      state.isFetching = true;
      state.error = null;
    },
    [sitDown.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.value = action.payload.table;
    },
    [sitDown.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = action.error;
    },
  },
});

export const { setTable } = tableSlice.actions

export default tableSlice.reducer;

