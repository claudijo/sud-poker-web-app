import { createSlice } from '@reduxjs/toolkit';
import { fetchTable } from './table-slice';

const initialState = {
  value: {
    actions: [],
    chipRange: { min: 0, max: 0}
  }
}

const legalActionsSlice = createSlice({
  name: 'legalActions',
  initialState,
  reducers: {
    setLegalActions: (state, action) => {
      state.value = action.payload ?? initialState.value;
    }
  },
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.table.legalActions ?? initialState.value;
    },
  },
})

export const { setLegalActions } = legalActionsSlice.actions;

export default legalActionsSlice.reducer;