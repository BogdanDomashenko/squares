import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../services/UserService";
import UsersService from "../../services/UsersService";
import { ROLES } from "../../utils/constants";
import { logout } from "./authSlice";

export const fetchUsersWhoBooked = createAsyncThunk(
  "users/fetchUsersWhoBooked",
  async ({ ids }, thunkAPI) => {
    try {
      const whoBooked = await UsersService.listByIds(ids);
      /*       const whoBokedObj = {};
      whoBooked.forEach(user => whoBokedObj[user.]) */
      return { whoBooked };
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logout({}));
      }
      throw error;
    }
  }
);

const initialState = {
  whoBooked: null,
};

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsersWhoBooked.fulfilled]: (state, action) => {
      state.whoBooked = action.payload.whoBooked;
    },
  },
});

export const {} = users.actions;

export default users.reducer;
