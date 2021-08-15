import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clientSocketEmitter } from '../socket/client-socket-emitter';

const initialState = {
  value: null,
  apa: 'hallå',
  isFetching: false,
  error: null,
};

export const fetchTable = createAsyncThunk('table/fetchTable', async (tableId) => {
  const response = await clientSocketEmitter.request('join', {
    id: tableId,
  });
  return response.table;
});

export const reserveSeat = createAsyncThunk('table/reserveSeat', async ({ tableId, seatIndex }) => {
  const response = await clientSocketEmitter.request('reserveSeat', {
    id: tableId,
    index: seatIndex,
  });
  return response.table;
});

export const cancelReservation = createAsyncThunk('table/cancelReservation', async({ tableId, seatIndex}) => {
  const response = await clientSocketEmitter.request('cancelReservation', {
    id: tableId,
    index: seatIndex,
  });
  return response.table;
})

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTable.pending]: state => {
      state.isFetching = true;
      state.error = null;
    },
    [fetchTable.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.value = action.payload;
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
      state.value = action.payload;
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
      state.value = action.payload;
    },
    [cancelReservation.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = action.error;
    },
  },
});

export default tableSlice.reducer;

