import HeroBanner from "./HeroBanner";
import WelcomeNote from "./WelcomeNote";
import BestSellingProducts from "./BestSellingProducts";
import OurCollections from "./OurCollections";
import OurValues from "./OurValues";
import LatestNews from "./LatestNews";
import SaleBanner from "./SaleBanner";
import "../../../css/homepage.css";

export default function HomePage() {
  return (
    <div className="homepage">
      <HeroBanner />
      <WelcomeNote />
      <OurValues />
      <BestSellingProducts />
      <OurCollections />
      <SaleBanner />
      <LatestNews />
    </div>
  );
}
