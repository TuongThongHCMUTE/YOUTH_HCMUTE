import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './reducers/customization-reducer';
import uiReducer from './reducers/ui-reducer';
import facultyReducer from './reducers/faculty-reducer';

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    faculties: facultyReducer,
    ui: uiReducer,
  }
});

export default store;
