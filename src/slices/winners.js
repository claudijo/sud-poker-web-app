import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
}

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setWinners: (state, action) => {
      state.value = action.payload ?? initialState.value;
    }
  }
})

export const { setWinners } = winnersSlice.actions;

export default winnersSlice.reducer