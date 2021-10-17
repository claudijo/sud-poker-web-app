import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const unfoldingActionsSlice = createSlice({
  name: 'unfoldingActions',
  initialState,
  reducers: {
    setUnfoldingAction: (state, action) => {
      state.value[action.payload.seatIndex] = action.payload.action;
    },
  },
});

export const { setUnfoldingAction } = unfoldingActionsSlice.actions;

export default unfoldingActionsSlice.reducer;