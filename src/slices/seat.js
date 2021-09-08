import { createSlice } from '@reduxjs/toolkit';
import { fetchTable } from './table-slice';

const initialState = {
  value: null,
}

const name = 'seat'

const seatSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.seat;
    }
  }
})

export default seatSlice.reducer;