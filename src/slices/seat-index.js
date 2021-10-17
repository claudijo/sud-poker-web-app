import { createSlice } from '@reduxjs/toolkit';
import { cancelReservation, fetchTable, reserveSeat } from './table-slice';

const initialState = {
  value: -1,
};

const seatIndexSlice = createSlice({
  name: 'seatIndex',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.seatIndex;
    },
    [reserveSeat.fulfilled]: (state, action) => {
      state.value = action.payload.seatIndex;
    },
    [cancelReservation.fulfilled]: (state, action) => {
      state.value = -1;
    },
  },
});

export default seatIndexSlice.reducer