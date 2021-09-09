import { createSlice } from '@reduxjs/toolkit';
import { fetchTable } from './table-slice';

const initialState = {
  value: [],
}

const name = 'seats'

const seatsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSeats: (state, action) => {
      state.value = action.payload ?? initialState.value;
    }
  },
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.table.seats ?? initialState.value;
    },
  }
})

export const { setSeats } = seatsSlice.actions;

export default seatsSlice.reducer;