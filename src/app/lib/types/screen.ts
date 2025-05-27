import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}

/** HomePage Screen Component related */
export interface HomePageState {
  BestSellingProducts: any;
}

/** Products Screen Component related */
export interface ProductsPageState {
  admin: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/** Orders Screen Component related */

export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
