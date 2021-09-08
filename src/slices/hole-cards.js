import { createSlice } from '@reduxjs/toolkit';
import { fetchTable } from './table-slice';

const initialState = {
  value: [],
}

const name = 'holeCards'

const holeCardsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setHoleCards: (state, action) => {
      state.value = action.payload ?? initialState.value;
    }
  },
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.holeCards ?? initialState.value;
    },
  }
})

export const { setHoleCards } = holeCardsSlice.actions;

export default holeCardsSlice.reducer;