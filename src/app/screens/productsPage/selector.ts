import { createSelector } from "reselect";
import { AppRootState } from "../../lib/types/screen";

const selectProductPage = (state: AppRootState) => state.productsPage;
export const retrieveAdmin = createSelector(
  selectProductPage,
  (ProductsPage) => ProductsPage.admin ?? null
);

export const retrieveChosenProduct = createSelector(
  selectProductPage,
  (ProductsPage) => ProductsPage.chosenProduct ?? null
);

export const retrieveProducts = createSelector(
  selectProductPage,
  (ProductsPage) => ProductsPage.products ?? null
);
