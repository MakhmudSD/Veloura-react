import React, { useEffect } from "react";
import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useHistory } from "react-router-dom";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { retrieveProducts } from "../productsPage/selector";
import { setProducts } from "../productsPage/slice";
import { Product } from "../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCategory } from "../../lib/enums/products.enum";
import { serverApi } from "../../lib/config";

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface BestSellingProductsProps {
  product: { _id: string };
}

export function BestSellingProducts(props: BestSellingProductsProps) {
  const history = useHistory();
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  useEffect(() => {
    const productService = new ProductService();
    productService
      .getProducts({
        page: 1,
        limit: 10,
        order: "soldCount", // 👈 sort by best-selling
        productCategory: ProductCategory.PERFUME, // or set to your default category
        search: "",
        gender: "",
        volume: "",
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error fetching best-selling products", err));
  }, []);

  const chooseProductDetail = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <Container className="best-seller-container homepage">
      <Box className="best-seller-title">
        <span>Best Selling Products</span>
      </Box>
      <Stack className="best-seller-frame">
        <Swiper
          className="best-seller-products"
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 1300, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          slidesPerView={4}
          spaceBetween={20}
          speed={2600} // Add speed for transition duration (600ms is smooth)
          watchOverflow={true}
        >
          {products.map((item, index) => (
            <SwiperSlide className="best-seller-img" key={index}>
              <img
                src={`${serverApi}/${item.productImages[0]}`} // 👈 Add server path if needed
                alt={item.productName}
                onClick={() => chooseProductDetail(item._id)} // 👈 Call the function!
                style={{ cursor: "pointer" }} // 👈 Make it clickable
              />
              <Box className="best-seller-desc">
                <span>{item.productName}</span>
                <p>
                  <span className="product-price">{item.productPrice}$</span>
                  <span>
                    {item.productCategory === "ACCESSORY" ||
                    item.productCategory === "GIFT_SET"
                      ? `${item.productQuantity} pcs`
                      : `${item.productVolumeMl} ml`}
                  </span>
                </p>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Stack>
    </Container>
  );
}

export default BestSellingProducts;
