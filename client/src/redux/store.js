import { configureStore } from "@reduxjs/toolkit";
import customizationReducer from "./reducers/customizationReducer";
import facultiesSlice from "./reducers/facultiesSlide";

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    faculties: facultiesSlice.reducer,
  }
});

export default store;