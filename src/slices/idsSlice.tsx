import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const idSlice = createSlice({
  name: "ids",
  initialState: {
    filter: "",
  },
  reducers: {
    changeFilterId(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
  },
});

export const { changeFilterId } = idSlice.actions;

export default idSlice.reducer;
