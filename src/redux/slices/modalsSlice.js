import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: { visible: false },
  signup: { visible: false },
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModalVisible: (state, action) => {
      state[action.payload.modal].visible = action.payload.visible;
    },
  },
});

export const { setModalVisible } = modalsSlice.actions;

export default modalsSlice.reducer;
