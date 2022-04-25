import { createSlice } from '@reduxjs/toolkit';

export interface Auth {
  isRegistered: boolean;
  username: string;
}

const initialState: Auth = {
  isRegistered: false,
  username: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      state.isRegistered = action.payload.isRegistered;
      state.username = action.payload.username;
    },
  },
});
export const register = authSlice.actions.register;

export default authSlice.reducer;
