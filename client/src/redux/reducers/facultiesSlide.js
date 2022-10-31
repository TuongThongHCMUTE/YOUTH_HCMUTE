import { createSlice } from '@reduxjs/toolkit';

const facultiesSlice = createSlice({
  name: 'faculties',
  initialState: { status: 'idle', faculties: [] },
  reducers: {
    addFaculty: (state, action) => {
      state.push(action.payload)
    }
  }
});

export default facultiesSlice;