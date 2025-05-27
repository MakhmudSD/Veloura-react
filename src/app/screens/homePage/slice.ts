import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../lib/types/screen";

const initialState: HomePageState = {
    BestSellingProducts: []
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setBestSellingProducts: (state, action) => {
      // data comes in payload of action
      state.BestSellingProducts = action.payload;
    },
  },
});

export const { setBestSellingProducts } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
