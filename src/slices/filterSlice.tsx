import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchFilter: "",
    gender: "all",
  },
  reducers: {
    changeFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
    changeGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeFilter } = filterSlice.actions;

export default filterSlice.reducer;

export const selectSearchFilter = (state: RootState) =>
  state.filter.searchFilter;
