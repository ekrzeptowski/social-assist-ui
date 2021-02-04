import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "nav",
  initialState: {
    isExpanded:
      typeof window != "undefined" && window.innerWidth > 768 ? true : false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
  },
});

export const { toggleSidebar } = navSlice.actions;

export default navSlice.reducer;
