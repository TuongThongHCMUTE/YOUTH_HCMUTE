import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './reducers/customization-reducer';
import uiReducer from './reducers/ui-reducer';
import authReducer from './reducers/auth-reducer';
import facultyReducer from './reducers/faculty-reducer';

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    ui: uiReducer,
    auth: authReducer,
    faculty: facultyReducer,
  }
});

export default store;
