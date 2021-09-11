import { createSlice } from '@reduxjs/toolkit';
import { fetchTable } from './table-slice';

const initialState = {
  value: -1,
}

const buttonSlice = createSlice({
  name: 'button',
  initialState,
  reducers: {
    setButton: (state, action) => {
      state.value = action.payload ?? initialState.value;
    }
  },
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.table.button ?? initialState.value;
    },
  }
})

export const { setButton } = buttonSlice.actions;

export default buttonSlice.reducer;

