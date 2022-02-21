import { configureStore } from "@reduxjs/toolkit";
import squaresReducer from "./slices/squaresSlice";

const store = configureStore({
  reducer: {
    squares: squaresReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
