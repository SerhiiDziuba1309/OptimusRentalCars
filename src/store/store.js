import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "../store/carsSlice.js";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});
