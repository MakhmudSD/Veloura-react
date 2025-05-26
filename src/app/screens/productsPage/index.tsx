import BestSellers from "./BestSellers";
import SpecialOffers from "./SpecialOffers";
import "../../../css/products.css";

export default function ProductsPage() {
<<<<<<< HEAD
=======
  const { path } = useRouteMatch(); 
>>>>>>> 2ad18b3 (feat: product detail page developed)
  return (
    <div className="products">
      <BestSellers />
      <SpecialOffers />
    </div>
  );
}
