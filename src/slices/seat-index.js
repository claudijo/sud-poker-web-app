import { createSlice } from '@reduxjs/toolkit';
import { cancelReservation, fetchTable, reserveSeat, standUp } from './table-slice';

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
    [cancelReservation.fulfilled]: state => {
      state.value = initialState.value;
    },
    [standUp.fulfilled]: state => {
      state.value = initialState.value;
    }
  },
});

export default seatIndexSlice.reducer