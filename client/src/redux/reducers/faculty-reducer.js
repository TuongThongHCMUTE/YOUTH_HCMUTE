import { createSlice } from '@reduxjs/toolkit';

const facultySlice = createSlice({
  name: 'faculty',
  initialState: { 
    faculties: [],
  },
  reducers: {
    setFaculties: (state, action) => {
      state.faculties = action.payload.faculties;
    }
  }
});

export const facultyActions = facultySlice.actions;

export default facultySlice.reducer;