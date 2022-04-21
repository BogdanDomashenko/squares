import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import { resetSquares } from "./squaresSlice";
import { resetUserData, setUserData } from "./userSlice";

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email }, thunkAPI) => {
    try {
      const data = await AuthService.signup(email);
      const { id, username, role } = data;
      thunkAPI.dispatch(setUserData({ data: { id, email, username, role } }));
      return data;
    } catch (error) {
      if (error.response) {
        switch (error.response.data.message) {
          case "This email is already registered":
            throw thunkAPI.rejectWithValue({
              email: error.response.data.message,
            });
          default:
            break;
        }
        throw error;
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
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
    const data = await AuthService.logout();
    thunkAPI.dispatch(resetUserData({}));
    //thunkAPI.dispatch(resetSquares({}));
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
    [signup.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
    [signup.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
