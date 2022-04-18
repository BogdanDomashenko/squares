import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, status: "green", timer: null },
  { id: 2, status: "green", timer: null },
  { id: 3, status: "green", timer: null },
  { id: 4, status: "green", timer: null },
  { id: 5, status: "green", timer: null },
  { id: 6, status: "green", timer: null },
  { id: 7, status: "green", timer: null },
  { id: 8, status: "green", timer: null },
  { id: 9, status: "green", timer: null },
];

export const squaresSlice = createSlice({
  name: "squares",
  initialState,
  reducers: {
    setSquareStatus: (state, action) => {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, status: action.payload.status }
          : item
      );
    },
    setYellowSquaresStatus: (state, action) => {
      return state.map((item) =>
        item.status === "yellow"
          ? { ...item, status: action.payload.status }
          : item
      );
    },
    buy: (state) => {
      return state.map((item) =>
        item.status === "yellow" ? { ...item, status: "red" } : item
      );
    },
    setSquareTimer: (state, action) => {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, timer: action.payload.time }
          : item
      );
    },
    resetSquares: (state, action) => initialState,
  },
});

export const {
  setSquareStatus,
  setYellowSquaresStatus,
  buy,
  setSquareTimer,
  resetSquares,
} = squaresSlice.actions;

export default squaresSlice.reducer;
