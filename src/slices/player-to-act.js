import { createSlice } from '@reduxjs/toolkit';
import { fetchTable } from './table-slice';

const initialState = {
  value: -1,
};

const playerToActSlice = createSlice({
  name: 'playerToAct',
  initialState,
  reducers: {
    setPlayerToAct: (state, action) => {
      state.value = action.payload ?? -1;
    },
  },
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.table.playerToAct ?? -1;
    },
  },
});

export const { setPlayerToAct } = playerToActSlice.actions;

export default playerToActSlice.reducer;