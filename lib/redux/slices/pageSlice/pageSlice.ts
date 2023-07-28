import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PageSliceState {
  theme: string;
}

const initialState: PageSliceState = {
  theme: 'light'
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload === 'light' ? 'dark' : 'light';
    },
  },
});
