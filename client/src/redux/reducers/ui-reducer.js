import { createSlice } from '@reduxjs/toolkit';
import { ROUTE } from 'helpers/route';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
    alert: null,
    defaultPath: ROUTE.home,
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
    changeDefaultPath(state, action) {
      state.defaultPath = action.payload;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;