import { createSlice } from "@reduxjs/toolkit";

export const squaresSlice = createSlice({
  name: "squares",
  initialState: [
    { id: 1, status: "green" },
    { id: 2, status: "green" },
    { id: 3, status: "green" },
    { id: 4, status: "green" },
    { id: 5, status: "green" },
    { id: 6, status: "green" },
    { id: 7, status: "green" },
    { id: 8, status: "green" },
    { id: 9, status: "green" },
  ],
  reducers: {
    setStatus: (state, action) => {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, status: action.payload.status }
          : item
      );
    },
  },
});

export const { setStatus } = squaresSlice.actions;

export default squaresSlice.reducer;
