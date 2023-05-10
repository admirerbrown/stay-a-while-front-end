import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginRequest = createAsyncThunk(
  'login/loginRequest', async (data) => {
    const response = await axios.post('http://localhost:3000/login', data);
    return response.data;
  },

);

const initialState = {
  login: false,
  token: null,
  error: false,
  loading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    errorReset: (state) => {
      const newState = { ...state, error: false };
      return newState;
    },
    loginset: (state, action) => {
      const newState = { ...state, login: true, token: action.payload };
      return newState;
    },
    loginreset: (state) => {
      const newState = { ...state, login: false, token: null };
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.pending, (state) => {
      const newState = { ...state, loading: true };
      return newState;
    });
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      const newState = {
        ...state, loading: false, login: true, token: action.payload.token,
      };
      return newState;
    });
    builder.addCase(loginRequest.rejected, (state) => {
      const newState = { ...state, loading: false, error: true };
      return newState;
    });
  },
});

export default loginSlice.reducer;
export const { errorReset, loginset, loginreset } = loginSlice.actions;