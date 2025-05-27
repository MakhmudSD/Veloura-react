import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../lib/types/screen";

const initialState: ProductsPageState = {
    products: [],
  admin: null,
  chosenProduct: null,
};

const productPageSlice = createSlice({
  name: "productPage",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setAdmin, setChosenProduct, setProducts } =
  productPageSlice.actions;

const ProductPageReducer = productPageSlice.reducer;
export default ProductPageReducer;
