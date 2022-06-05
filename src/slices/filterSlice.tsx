import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  search: "",
  gender: "all",
  type: "",
  color: "",
  numberOfVisiblePokemons: 20,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.numberOfVisiblePokemons = 20;
    },
    changeGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
      state.numberOfVisiblePokemons = 20;
    },
    changeType(state, action: PayloadAction<string>) {
      if (state.type === action.payload) {
        state.type = "";
      } else {
        state.type = action.payload;
      }
      state.numberOfVisiblePokemons = 20;
    },
    incrementNumberOfVisiblePokemons(state) {
      state.numberOfVisiblePokemons += 20;
    },
    resetFilters: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  changeFilter,
  changeGender,
  changeType,
  incrementNumberOfVisiblePokemons,
} = filterSlice.actions;

export default filterSlice.reducer;

export const selectSearchFilter = (state: RootState) => state.filter.search;

export const selectGenderFilter = (state: RootState) => state.filter.gender;

export const selectTypeFilter = (state: RootState) => state.filter.type;

export const selectNumberOfVisiblePokemons = (state: RootState) =>
  state.filter.numberOfVisiblePokemons;
