import { createSlice } from '@reduxjs/toolkit';
import { fetchTable } from './table-slice';

const initialState = {
  value: [],
}

const hasHoleCardsSlice = createSlice({
  name: 'hasHoleCards',
  initialState,
  reducers: {
    setHasHoleCards: (state, action) => {
      state.value = action.payload ?? initialState.value
    }
  },
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.table.hasHoleCards ?? initialState.value;
    }
  }
})

export const { setHasHoleCards } = hasHoleCardsSlice.actions

export default hasHoleCardsSlice.reducer;