import { createSlice } from '@reduxjs/toolkit';

const classSlice = createSlice({
  name: 'class',
  initialState: {
    classes: [],
  },
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload.classes;
    }
  }
});

export const classActions = classSlice.actions;

export default classSlice.reducer;