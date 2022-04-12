import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import { setUserData } from "./userSlice";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login(email, password);
      thunkAPI.dispatch(setUserData({ data }));
    } catch (error) {
      throw error;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async ({}, thunkAPI) => {
  try {
    const data = await authService.logout();
    thunkAPI.dispatch(setUserData({ data: null }));
  } catch (error) {
    throw error;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [logout.rejected]: (state, action) => {
      state.isLoggedIn = true;
    },
  },
});

//export const { setAccessToken } = authSlice.actions;

export default authSlice.reducer;
