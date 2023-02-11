import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './reducers/customization-reducer';
import uiReducer from './reducers/ui-reducer';
import authReducer from './reducers/auth-reducer';
import facultyReducer from './reducers/faculty-reducer';
import yearReducer from './reducers/year-reducer';
import classReducer from './reducers/class-reducer';

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    ui: uiReducer,
    auth: authReducer,
    faculty: facultyReducer,
    class: classReducer,
    year: yearReducer,
  }
});

export default store;
