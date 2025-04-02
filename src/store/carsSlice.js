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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Не вдалося завантажити авто");
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    list: [],
    filters: { brand: "", minMileage: "", maxMileage: "" },
    page: 1,
    status: "idle",
    error: null,
    hasMore: true,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
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

        if (state.page === 1) {
          state.list = action.payload.cars;
        } else {
          state.list = [...state.list, ...action.payload.cars];
        }

        if (action.payload.cars.length < 12) {
          state.hasMore = false;
        }
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilters, nextPage } = carsSlice.actions;
export default carsSlice.reducer;
