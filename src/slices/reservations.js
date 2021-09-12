import { createSlice } from '@reduxjs/toolkit';
import { cancelReservation, fetchTable, reserveSeat, sitDown } from './table-slice';

const initialState = {
  value: [],
}

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setReservations: (state, action) => {
      state.value = action.payload ?? initialState.value
    }
  },
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.table.reservations ?? initialState.value;
    },
    [sitDown.fulfilled]: (state, action) => {
      state.value = action.payload.table.reservations ?? initialState.value;
    },
    [reserveSeat.fulfilled]: (state, action) => {
      state.value = action.payload.table.reservations ?? initialState.value;
    },
    [cancelReservation.fulfilled]: (state, action) => {
      state.value = action.payload.table.reservations ?? initialState.value;
    }
  },
});

export const { setReservations } = reservationsSlice.actions;

export default reservationsSlice.reducer;