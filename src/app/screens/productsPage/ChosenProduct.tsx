import { Box, Button, Container, Stack } from "@mui/material";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setAdmin, setChosenProduct } from "./slice";
import { Member } from "../../lib/types/member";
import { Product } from "../../lib/types/product";
import { retrieveAdmin, retrieveChosenProduct } from "./selector";
import { CartItem } from "../../lib/types/search";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import MemberService from "../../services/MemberService";

const actionDispatch = (dispatch: Dispatch) => ({
  setAdmin: (data: Member) => dispatch(setAdmin(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct })
);

const adminRetriever = createSelector(retrieveAdmin, (admin) => ({ admin }));

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams<{ productId: string }>();
  const { setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const serverApi = process.env.REACT_APP_SERVER_API || "";

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getAdmin()
      .then((data) => setAdmin(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chosenProduct) return null;

  const handleChangeQuantity = (change: number) => {
    const newQty = quantity + change;
    if (newQty < 1) return;
    setQuantity(newQty);
  };

  return (
    <Container className="chosen-product-container">
      <Stack direction="row" spacing={4} className="chosen-product-wrapper">
        <Box className="chosen-product-left">
          <Swiper
            loop={true}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="main-product-image-swiper"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              const imagePath = "/img/ariekoprasethio_perfume.png";
              return (
                <SwiperSlide key={index}>
                  <img
                    src={imagePath}
                    alt="Black and gold luxury perfume bottle"
                    className="main-product-image"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>

        <Stack className="chosen-product-right" spacing={2}>
          <Box className="chosen-product-title">
            <h1>{chosenProduct.productName}</h1>
          </Box>

          <Box className="chosen-product-description">
            <p>{chosenProduct.productDesc || "No description"}</p>
          </Box>

          <Box className="chosen-product-img-preview">
            <img
              src={"/img/ariekoprasethio_perfume.png"}
              alt="Perfume preview"
            />
            <p>{chosenProduct.productVolumeMl} ml</p>
          </Box>

          <Box className="chosen-product-price">
            ${chosenProduct.productPrice}
          </Box>

          <Box className="chosen-product-calculate-form">
            <span className="chosen-product-quantity-label">Qty</span>
            <button
              className="chosen-product-remove"
              aria-label="Decrease quantity"
              onClick={() => handleChangeQuantity(-1)}
            >
              -
            </button>
            <span className="chosen-product-number">{quantity}</span>
            <button
              className="chosen-product-add"
              aria-label="Increase quantity"
              onClick={() => handleChangeQuantity(1)}
            >
              +
            </button>
          </Box>

          <Button
            className="chosen-product-calculate-add-button"
            onClick={(e) => {
              e.stopPropagation();
              onAdd({
                _id: chosenProduct._id,
                quantity,
                name: chosenProduct.productName,
                price: chosenProduct.productPrice,
                image: chosenProduct.productImages?.[0] || "",
              });
            }}
          >
            <span>Add to Bag</span>
          </Button>
        </Stack>
      </Stack>

      <Stack className="chosen-product-slider">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="swiper-area"
        >
          {(chosenProduct.productImages || []).map((ele, index) => {
            const imagePath = `${serverApi}/${ele}`;
            return (
              <SwiperSlide key={index}>
                <img className="slider-image" src={imagePath} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Stack>
    </Container>
  );
}

export default ChosenProduct;
