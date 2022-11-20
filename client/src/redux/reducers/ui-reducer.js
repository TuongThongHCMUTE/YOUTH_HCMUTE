import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
    alert: null,
  },
  reducers: {
    showLoading(state) {
      state.loading = true;
    },
    hideLoading(state) {
      state.loading = false;
    },
    showAlert(state, action) {
      state.alert = action.payload;
    },
    hideAlert(state) {
      state.alert = null;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;