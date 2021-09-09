import { createSlice } from '@reduxjs/toolkit';
import { fetchTable } from './table-slice';

const initialState = {
  value: [],
}

const name = 'pots'

const potsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setPots: (state, action) => {
      state.value = action.payload ?? initialState.value;
    }
  },
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.table.pots ?? initialState.value;
    },
  }
})

export const { setPots } = potsSlice.actions;

export default potsSlice.reducer;