import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (filters, thunkAPI) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await axios.get(
        `https://car-rental-api.goit.global/cars?${params}`
      );
      return response.data.cars;
    } catch (error) {
      console.error("Ошибка при загрузке автомобилей:", error);
      return thunkAPI.rejectWithValue("Не удалось загрузить автомобили.");
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    list: [],
    filters: { brand: "", minMileage: "", maxMileage: "" },
    status: "idle",
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
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
        state.list = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilters } = carsSlice.actions;
export default carsSlice.reducer;
