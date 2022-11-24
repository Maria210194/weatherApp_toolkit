import weatherSliceReducer from "./features/weatherSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    weather: weatherSliceReducer,
  },
});

export default store;
