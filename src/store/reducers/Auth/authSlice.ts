import { createSlice } from '@reduxjs/toolkit';

export interface Auth {
  isLogin: boolean;
  username: string;
}

const initialState: Auth = {
  isLogin: false,
  username: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.isLogin = false;
      state.username = '';
    },
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
