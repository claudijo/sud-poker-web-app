import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    action: '',
    seatIndex: -1,
  }
}

const actionTakenSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    setAction: (state, action) => {
      state.value = action.payload ?? initialState;
    }
  },
})

export const { setAction } = actionTakenSlice.actions;

export default actionTakenSlice.reducer;