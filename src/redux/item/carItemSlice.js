import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currItemLocation: {
    lat: 37.7749, // Defaulting to San Francisco's latitude
    lng: -122.4194, // Defaulting to San Francisco's longitude
  },
};

const carItemSlice = createSlice({
  name: "item_mod",
  initialState,
  reducers: {
    setItemLocation: (state, action) => {
      state.currItemLocation = action.payload;
    },
  },
});

export const { setItemLocation } =
  carItemSlice.actions;

export default carItemSlice.reducer;
