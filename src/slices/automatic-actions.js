import { createSlice } from '@reduxjs/toolkit';
import { fetchTable, setAutomaticAction } from './table-slice';

const initialState = {
  value: {
    automaticAction: null,
    canSetAutomaticActions: false,
    legalAutomaticActions: []
  },
}

const automaticActionsSlice = createSlice({
  name: 'automaticActions',
  initialState,
  reducers: {
    setAutomaticActions: (state, action) => {
      state.value = action.payload ?? initialState.value;
    }
  },
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.automaticActions ?? initialState.value
    },
    [setAutomaticAction.pending]: (state, action) => {
      state.value.automaticAction = action.meta.arg.action;
    },
    [setAutomaticAction.rejected]: (state, action) => {
      state.value = initialState.value;
    },
    [setAutomaticAction.fulfilled]: (state, action) => {
      state.value = action.payload.automaticActions;
    }
  },
})

export const { setAutomaticActions } = automaticActionsSlice.actions;

export default automaticActionsSlice.reducer;