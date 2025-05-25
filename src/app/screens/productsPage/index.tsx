import BestSellers from "./BestSellers";
import SpecialOffers from "./SpecialOffers";
import "../../../css/products.css";

export default function ProductsPage() {
  return (
    <div className="products">
      <BestSellers />
      <SpecialOffers />
    </div>
  );
}
