import { createSlice } from '@reduxjs/toolkit';
import { fetchTable } from './table-slice';

const initialState = {
  value: [],
};

const handPlayersSlice = createSlice({
  name: 'handPlayers',
  initialState,
  reducers: {
    setHandPlayers: (state, action) => {
      state.value = action.payload ?? initialState.value;
    },
  },
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.table.handPlayers ?? initialState.value;
    },
  },
});

export const { setHandPlayers } = handPlayersSlice.actions;

export default handPlayersSlice.reducer;