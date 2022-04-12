import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import { resetSquares } from "./squaresSlice";
import { setUserData } from "./userSlice";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login(email, password);
      thunkAPI.dispatch(setUserData({ data }));
    } catch (error) {
      if (error.response) {
        switch (error.response.data.message) {
          case "User with this email does not exist":
            throw thunkAPI.rejectWithValue({
              email: error.response.data.message,
            });
          case "Incorrect password":
            throw thunkAPI.rejectWithValue({
              password: error.response.data.message,
            });
          default:
            break;
        }
        throw error;
      }
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async ({}, thunkAPI) => {
  try {
    const data = await authService.logout();
    thunkAPI.dispatch(setUserData({ data: null }));
    thunkAPI.dispatch(resetSquares({}));
  } catch (error) {
    throw error;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    error: null,
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.error = null;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
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
