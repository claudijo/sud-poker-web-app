import { createSlice } from '@reduxjs/toolkit';
import { fetchTable } from './table-slice';

const initialState = {
  value: [],
};

const communityCardsSlice = createSlice({
  name: 'communityCards',
  initialState,
  reducers: {
    setCommunityCards: (state, action) => {
      state.value = action.payload ?? initialState.value;
    },
  },
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.table.communityCards ?? initialState.value;
    },
  },
});

export const { setCommunityCards } = communityCardsSlice.actions;

export default communityCardsSlice.reducer;