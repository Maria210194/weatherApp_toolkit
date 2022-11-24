import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// action
export const fetchWeatherAction = createAsyncThunk(
  "weather/fetch",
  async (payload, { rejectWithValue }) => {
    const url = `${BASE_URL}/weather?q=${payload}&appid=${API_KEY}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      const { lon, lat } = data.coord;
      const dailyForecast = await getDailyForecast(lat, lon);
      const weather = { dailyForecast, ...data };

      return weather;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const getDailyForecast = async (lat, lon) => {
  const dailyUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const response = await fetch(dailyUrl);
  const data = await response.json();

  const dailyForecast = await data.list
    .map((d) => {
      return {
        title: formatToLocalTime(d.dt, "ccc"),
        weather: d.weather[0].description,
        temp: d.main.temp,
        icon: d.weather[0].icon,
      };
    })
    .filter(
      (value, i, self) =>
        i === self.findIndex((day) => day.title === value.title)
    )
    .slice(1, 6);

  return dailyForecast;
};

export const formatToLocalTime = (secs, format = "ccc") =>
  DateTime.fromSeconds(secs).toFormat(format);

// const initialState = {
//   data: [],
//   isSuccess: false,
//   loading: false,
// };

const weatherSlice = createSlice({
  name: "weather",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherAction.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
        state.weather = action?.payload;
        state.loading = false;
        state.error = false;
      }),
      builder.addCase(fetchWeatherAction.rejected, (state, action) => {
        state.weather = undefined;
        state.loading = false;
        state.error = true;
      });
  },
});

export default weatherSlice.reducer;
