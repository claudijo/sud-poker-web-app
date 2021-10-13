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
  reducers: {},
  extraReducers: {
    [fetchTable.fulfilled]: (state, action) => {
      state.value = action.payload.seat ?? initialState
    },
    [setAutomaticAction.pending]: (state, action) => {
      state.value.automaticAction = action.meta.arg.action;
    },
    [setAutomaticAction.rejected]: (state, action) => {
      console.log('Rejected', action )
      state.value.automaticAction = null;
    },

  },

})

export const { setAutomaticActions } = automaticActionsSlice.actions;

export default automaticActionsSlice.reducer;