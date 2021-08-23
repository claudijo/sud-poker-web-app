import { createSlice } from '@reduxjs/toolkit';
import { fetchTable } from './table-slice';
import { setTable } from './table-slice';

const initialState = {
  value: [],
}

const name = 'holeCards'

export const holeCardsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.holeCards ?? [];
    },
    [setTable]: (state, action) => {
      state.value = action.payload.holeCards ?? [];
    }
  }
})

export default holeCardsSlice.reducer;