import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clientSocketEmitter } from '../socket/client-socket-emitter';

const initialState = {
  value: null,
  isFetching: false,
  error: null
}

export const fetchMe = createAsyncThunk('me/fetchMe', async() => {
  const response = await fetch('/api/me', { credentials: 'same-origin' });
  if (!response.ok) {
    throw new Error(response.status)
  }
  // Need to re-connect after we have fetched me so the session cookie is
  // attached properly the first time we visit the site
  clientSocketEmitter.connect();

  const me = await response.json()
  return me;
})

const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMe.pending]: state => {
      state.isFetching = true;
      state.error = null;
    },
    [fetchMe.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.value = action.payload;
    },
    [fetchMe.rejected]: (state, action) => {
      state.isFetching = false;
      state.error = action.error;
    }
  }
})

export default meSlice.reducer;
