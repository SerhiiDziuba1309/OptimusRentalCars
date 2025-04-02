import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "../store/carsSlice.js";
import favoritesReducer from "./favoritesSlice.js";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    favorites: favoritesReducer,
  },
});
