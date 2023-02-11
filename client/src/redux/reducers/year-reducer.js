import { createSlice } from '@reduxjs/toolkit';

const yearSlice = createSlice({
  name: 'year',
  initialState: {
    years: [],
    currentYear: null,
  },
  reducers: {
    setYears: (state, action) => {
      state.years = action.payload.years;
      state.currentYear = action.payload.currentYear;
    },
  }
});

export const yearActions = yearSlice.actions;

export default yearSlice.reducer;
