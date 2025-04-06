import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  isDarkMode: boolean;
}

const initialState: UIState = {
  isDarkMode: false,
};

export const uiSlices = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setInitialState: () => ({ ...initialState }), // Ensuring immutability
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setInitialState, toggleDarkMode } = uiSlices.actions;

export default uiSlices.reducer;
