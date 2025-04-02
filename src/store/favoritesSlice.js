import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = () => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
};

const saveToStorage = (data) => {
  localStorage.setItem("favorites", JSON.stringify(data));
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: loadFromStorage(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      if (state.items.includes(carId)) {
        state.items = state.items.filter((id) => id !== carId);
      } else {
        state.items.push(carId);
      }
      saveToStorage(state.items);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
