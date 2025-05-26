import Products from "./Products";
import "../../../css/products.css";
import { ChosenProduct } from "./ChosenProduct";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function ProductsPage() {
  const { path } = useRouteMatch(); // dynamically gets the matched base route

  return (
    <div className="products-page">
      <Switch>
        <Route path={`${path}/:productId`}>
          <ChosenProduct />
        </Route>
        <Route exact path={path}>
          <Products />
        </Route>
      </Switch>
    </div>
  );
}
