import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ filters, page }, thunkAPI) => {
    try {
      const params = new URLSearchParams({ ...filters, page });
      const response = await axios.get(
        `https://car-rental-api.goit.global/cars?${params}`
      );
      return response.data.cars;
    } catch (error) {
      console.error("Error loading cars:", error);
      return thunkAPI.rejectWithValue("Failed to load cars.");
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    list: [],
    filters: {},
    page: 1,
    hasMore: true,
    status: "idle",
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 1;
      state.list = [];
      state.hasMore = true;
    },
    nextPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newCars = Array.isArray(action.payload) ? action.payload : [];

        if (state.page === 1) {
          state.list = newCars;
        } else {
          state.list = [...state.list, ...newCars];
        }

        state.hasMore = newCars.length >= 8;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilters, nextPage } = carsSlice.actions;
export default carsSlice.reducer;
