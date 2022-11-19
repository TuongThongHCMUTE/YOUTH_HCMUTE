import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './reducers/customization-reducer';
import facultyReducer from './reducers/faculty-reducer';

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    faculties: facultyReducer
  }
});

export default store;
