import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import ROLES from "../../utils/constants/userRoleConstants";
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

const initialState = {
  data: {
    username: null,
    email: null,
    role: ROLES.fantom,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload.data;
    },
    resetUserData: (state, action) => initialState,
  },
  extraReducers: {
    [fetchUserData.fulfilled]: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export const { resetUserData, setUserData } = userSlice.actions;

export default userSlice.reducer;
