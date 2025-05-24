import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export function BestSellingProducts() {
  const products = [
    {
      title: "Luxurious Elixir Rough",
      price: "$220.00",
      volume: "100ml",
      img: "/img/Old_fashion_balck_and_gold_color_perfume__3_-removebg-preview 1.png",
    },
    {
      title: "The Golden Legacy",
      price: "$160.00",
      volume: "100ml",
      img: "/img/Old_fashion_balck_and_gold_color_perfume-removebg-preview 1.png",
    },
    {
      title: "Luxurious Elixir",
      price: "$250.00",
      volume: "100ml",
      img: "/img/Old_fashion_gold_color_perfume__1_-removebg-preview 1.png",
    },
    {
      title: "Luxurious Essence",
      price: "$260.00",
      volume: "100ml",
      img: "/img/Old_fashion_balck_and_gold_color_perfume__3_-removebg-preview 1.png",
    },
  ];

  return (
    <Container className="best-seller-container homepage">
      <Box className="best-seller-title">
        <span>Best Selling Products</span>
      </Box>
      <Stack className="best-seller-frame">
        <Swiper
          className="best-seller-products"
          slidesPerView={4}
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          {products.map((item, index) => (
            <SwiperSlide className="best-seller-img" key={index}>
              <img src={item.img} alt={item.title} />
              <Box className="best-seller-desc">
                <span>{item.title}</span>
                <p>
                  {item.price} <span>{item.volume}</span>
                </p>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation buttons */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Stack>
    </Container>
  );
}

export default BestSellingProducts;
