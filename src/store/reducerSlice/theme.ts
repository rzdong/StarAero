import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BucketState {
  currentTheme: any,
}

const initialState: BucketState = {
  currentTheme: null,
};


export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateThemes: (state, action: PayloadAction<any>) => {
      state.currentTheme = action.payload;
    },
  },
});


export const { updateThemes } = themeSlice.actions;

export default themeSlice.reducer;
