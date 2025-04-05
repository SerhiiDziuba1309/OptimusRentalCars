import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ filters, page }, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://car-rental-api.goit.global/cars"
      );
      const allCars = Array.isArray(response.data.cars)
        ? response.data.cars
        : [];

      const filtered = allCars.filter((car) => {
        const matchBrand = !filters.brand || car.brand === filters.brand;

        const cleanedCarPrice = String(car.rentalPrice).replace(/\D/g, "");
        const cleanedFilterPrice = String(filters.price).replace(/\D/g, "");

        const matchPrice =
          !filters.price || cleanedCarPrice === cleanedFilterPrice;

        const matchMin =
          !filters.minMileage || car.mileage >= Number(filters.minMileage);
        const matchMax =
          !filters.maxMileage || car.mileage <= Number(filters.maxMileage);

        return matchBrand && matchPrice && matchMin && matchMax;
      });

      const pageSize = 8;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginated = filtered.slice(start, end);

      return { cars: paginated, total: filtered.length, filters };
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
    noMatchReason: "",
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 1;
      state.list = [];
      state.hasMore = true;
      state.noMatchReason = "";
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
        state.noMatchReason = "";
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { cars, total, filters } = action.payload;

        if (state.page === 1) {
          state.list = cars;
        } else {
          state.list = [...state.list, ...cars];
        }

        state.hasMore = state.list.length < total;

        if (cars.length === 0) {
          const { brand, price, minMileage, maxMileage } = filters;

          if (brand && !price && !minMileage && !maxMileage) {
            state.noMatchReason = `No cars found for brand "${brand}".`;
          } else if (price && !brand && !minMileage && !maxMileage) {
            state.noMatchReason = `No cars found with price $${price} per hour.`;
          } else if ((minMileage || maxMileage) && !brand && !price) {
            state.noMatchReason = `No cars found within the specified mileage range.`;
          } else {
            state.noMatchReason = `No cars match the selected filters. Try adjusting brand, price or mileage range.`;
          }
        } else {
          state.noMatchReason = "";
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
