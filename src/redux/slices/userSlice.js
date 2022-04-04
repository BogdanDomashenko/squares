import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      return { ...state, accessToken: action.payload.token };
    },
  },
});

export const { setAccessToken } = userSlice.actions;

export default userSlice.reducer;
