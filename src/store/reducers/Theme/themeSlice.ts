import { createSlice } from '@reduxjs/toolkit';

export interface Darktheme {
  isDark: boolean;
}

const initialState: Darktheme = {
  isDark: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setdark: (state) => {
      state.isDark = true;
      document.documentElement.setAttribute('data-theme', 'dark');

      document.cookie =
        'isDark=true; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT';
    },
    setlight: (state) => {
      state.isDark = false;
      document.documentElement.setAttribute('data-theme', 'light');
      document.cookie =
        'isDark=false; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT';
    },
  },
});
export const { setdark, setlight } = themeSlice.actions;

export default themeSlice.reducer;
