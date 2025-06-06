import HeroBanner from "./HeroBanner";
import WelcomeNote from "./WelcomeNote";
import BestSellingProducts from "./BestSellingProducts";
import OurValues from "./OurValues";
import LatestNews from "./LatestNews";
import SaleBanner from "./SaleBanner";
import OurLatestProducts from "./OurCollections";
import "../../../css/homepage.css";

export default function HomePage() {
  return (
    <div className="homepage">
      <HeroBanner product={{ _id: "6836bf44e1481ec7b6bd918d" }}  />
      <WelcomeNote />
      <OurValues />
      <BestSellingProducts product={{
        _id: ""
      }}/>
      <OurLatestProducts />
      <SaleBanner />
      <LatestNews />
    </div>
  );
}
