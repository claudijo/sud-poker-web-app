import { createSlice } from '@reduxjs/toolkit';
import { fetchTable, tableSlice } from './table-slice';

const initialState = {
  value: [],
}

const name = 'holeCards'

export const holeCardsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setHoleCards: (state, action) => {
      state.value = action.payload.holeCards;
    }
  },
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.holeCards ?? [];
    },
  }
})

export const { setHoleCards } = holeCardsSlice.actions;

export default holeCardsSlice.reducer;