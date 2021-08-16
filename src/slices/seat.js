import { createSlice } from '@reduxjs/toolkit';
import { fetchTable, setTable } from './table-slice';

const initialState = {
  value: null,
}

const name = 'seat'

export const seatSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.seat;
    },
    [setTable]: (state, action) => {
      state.value = action.payload.seat;
    }
  }
})

export default seatSlice.reducer;