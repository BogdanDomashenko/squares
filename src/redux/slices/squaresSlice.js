import { createSlice } from "@reduxjs/toolkit";
import { SQUARE_STATUS } from "../../utils/constants";

const initialState = [
  { id: 1, status: SQUARE_STATUS.default, timer: null, userId: null },
  { id: 2, status: SQUARE_STATUS.default, timer: null, userId: null },
  { id: 3, status: SQUARE_STATUS.default, timer: null, userId: null },
  { id: 4, status: SQUARE_STATUS.default, timer: null, userId: null },
  { id: 5, status: SQUARE_STATUS.default, timer: null, userId: null },
  { id: 6, status: SQUARE_STATUS.default, timer: null, userId: null },
  { id: 7, status: SQUARE_STATUS.default, timer: null, userId: null },
  { id: 8, status: SQUARE_STATUS.default, timer: null, userId: null },
  { id: 9, status: SQUARE_STATUS.default, timer: null, userId: null },
];

export const squaresSlice = createSlice({
  name: "squares",
  initialState,
  reducers: {
    setSquareStatus: (state, action) => {
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              status: action.payload.status,
              userId: action.payload.userId,
            }
          : item
      );
    },
    setYellowSquaresStatus: (state, action) => {
      return state.map((item) =>
        item.status === SQUARE_STATUS.booked
          ? { ...item, status: action.payload.status }
          : item
      );
    },
    buy: (state, action) => {
      return state.map((item) =>
        item.status === SQUARE_STATUS.booked &&
        action.payload.userId === item.userId
          ? { ...item, status: SQUARE_STATUS.sold }
          : item
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
    resetBookedSquaresByUserId: (state, action) => {
      return state.map((item) =>
        item.status === SQUARE_STATUS.booked &&
        item.userId === action.payload.userId
          ? {
              ...item,
              status: SQUARE_STATUS.default,
              timer: null,
              userId: null,
            }
          : item
      );
    },
  },
});

export const {
  setSquareStatus,
  setYellowSquaresStatus,
  buy,
  setSquareTimer,
  resetSquares,
  resetBookedSquaresByUserId,
} = squaresSlice.actions;

export default squaresSlice.reducer;
