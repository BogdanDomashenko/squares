import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import { logout } from "./authSlice";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async ({}, thunkAPI) => {
    try {
      const data = await userService.getUserData();
      return { data };
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logout({}));
      }
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: {
    [fetchUserData.fulfilled]: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export const { setAccessToken, setUserData } = userSlice.actions;

export default userSlice.reducer;
