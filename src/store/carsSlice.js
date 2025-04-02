import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (_, { getState, rejectWithValue }) => {
    const { filters, page } = getState().cars;
    try {
      const params = new URLSearchParams({
        ...filters,
        page,
        limit: 8,
      });
      const response = await axios.get(
        `https://car-rental-api.goit.global/cars?${params}`
      );
      return response.data.cars; // Повертаємо лише масив машин
    } catch (error) {
      return rejectWithValue("Не вдалося завантажити авто.");
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    list: [],
    filters: { brand: "", price: "", minMileage: "", maxMileage: "" },
    page: 1,
    status: "idle",
    error: null,
    hasMore: true,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...action.payload };
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

        if (Array.isArray(action.payload)) {
          const existingIds = new Set(state.list.map((car) => car.id));
          const newCars = action.payload.filter(
            (car) => !existingIds.has(car.id)
          );

          state.list = [...state.list, ...newCars];

          if (newCars.length < 8) {
            state.hasMore = false;
          }
        } else {
          console.error("Expected array in payload, got:", action.payload);
          state.error = "Invalid data format";
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
