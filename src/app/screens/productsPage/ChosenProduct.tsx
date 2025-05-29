import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { setAdmin, setChosenProduct } from "./slice";
import { retrieveChosenProduct } from "./selector";
import { Member } from "../../lib/types/member";
import { Product } from "../../lib/types/product";
import { CartItem } from "../../lib/types/search";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const actionDispatch = (dispatch: any) => ({
  setAdmin: (data: Member) => dispatch(setAdmin(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct })
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export function ChosenProduct({ onAdd }: ChosenProductProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productId } = useParams<{ productId: string }>();
  const { setAdmin, setChosenProduct } = actionDispatch(dispatch);
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const serverApi = process.env.REACT_APP_API_URL || "";

  useEffect(() => {
    const productService = new ProductService();
    const memberService = new MemberService();

    productService
      .getProduct(productId)
      .then(setChosenProduct)
      .catch(console.error);

    memberService.getAdmin().then(setAdmin).catch(console.error);
  }, [productId, setAdmin, setChosenProduct]);

  if (!chosenProduct) return null;

  const handleChangeQuantity = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const isGiftOrAccessory =
    chosenProduct.productCategory === "GIFT_SET" ||
    chosenProduct.productCategory === "ACCESSORY";

  return (
    <Container className="chosen-product-container">
      <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "-12px",
                  marginBottom: "20px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                <IconButton
                  onClick={() => history.push("/products")}
                  sx={{
                    color: '#AB572D',
                    backgroundColor: 'rgba(255, 0, 0, 0.15)',
                    borderRadius: '50%',
                    padding: '6px',
                    boxShadow: '0 0 10px rgba(171, 87, 45, 0.7)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: 'rgba(171, 87, 45, 0.2)',
                      boxShadow: '0 0 15px rgba(171, 87, 45, 1)',
                    },
                  }}
                  aria-label="Back to product list"
                >
                  <ArrowBackIosNewIcon fontSize="large" />
                </IconButton>
                <Box
                component="span"
                sx={{
                  marginLeft: '6px',
                  color: '#AB572D',
                  fontWeight: '600',
                  fontSize: '16px',
                  fontFamily: '"Satoshi", sans-serif',
                  userSelect: 'none',
                  textShadow: '0 0 5px rgba(171, 87, 45, 0.7)',
                  }}
                >
                  Back to Products
                </Box>
              </Box>
      <Stack direction="row" spacing={4} className="chosen-product-wrapper">
        
        {/* Left Images */}
        <Box className="chosen-product-left">
          
          <Swiper
            loop
            navigation
            thumbs={
              thumbsSwiper && !thumbsSwiper.destroyed
                ? { swiper: thumbsSwiper }
                : undefined
            }
            modules={[Navigation, Thumbs]}
            className="main-product-image-swiper"
          >
            {chosenProduct.productImages?.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={`${serverApi}/${img}`}
                  alt={`Product ${idx}`}
                  className="main-product-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          </Box>
        {/* Right Info */}
        <Stack className="chosen-product-right" spacing={3}>
          <Box className="chosen-product-title">
            <h1>{chosenProduct.productName}</h1>
          </Box>

          <Box className="chosen-product-description">
            <p>{chosenProduct.productDesc || "No description"}</p>
          </Box>

          <Stack direction="row" spacing={4} alignItems="center">
            <Box className="chosen-product-meta">
              <Box className="chosen-product-meta-item">
                Level: <span>{chosenProduct.productTier || "Standard"}</span>
              </Box>
              <Box className="chosen-product-meta-item">
                Audience:{" "}
                <span>{chosenProduct.productTargetAudience || "Unisex"}</span>
              </Box>
              {isGiftOrAccessory && (
                <Box className="chosen-product-meta-item">
                  Quantity: <span>{chosenProduct.productQuantity}</span>
                </Box>
              )}
            </Box>
            <Stack direction="row" alignItems="center" spacing={1}>
  <Box
    className="product-view"
    sx={{
      marginTop: '6px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(221, 193, 179, 0.05)', // soft highlight background
      padding: '4px 8px',
      borderRadius: '8px',
      boxShadow: '0 0 5px rgba(171, 87, 45, 0.2)',
    }}
  >
    <RemoveRedEyeIcon
      sx={{
        fontSize: 25,
        color: '#AB572D',
        mr: 1,
      }}
    />
    <span
      style={{
        fontSize: '35px',
        fontWeight: '600',
        color: '#fff',
        fontFamily: '"Satoshi", sans-serif',
      }}
    >
      {chosenProduct.productViews}
    </span>
  </Box>
</Stack>

          </Stack>

          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Box sx={{ position: "relative" }}>
              

              <img
                src={`${serverApi}/${chosenProduct.productImages?.[0]}`}
                alt="Perfume preview"
                style={{ width: 150, borderRadius: 8 }}
              />

              {!isGiftOrAccessory && (
                <p
                  style={{
                    color: "#e79d1e",
                    fontFamily: "Satoshi",
                    fontSize: 18,
                    fontWeight: 500,
                    marginTop: 8,
                    textAlign: "center",
                  }}
                >
                  {chosenProduct.productVolumeMl} ml
                </p>
              )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{
                  color: "#e55208",
                  fontFamily: "Satoshi",
                  fontSize: 34,
                  fontWeight: 700,
                  marginLeft: 2,
                }}
              >
                ${chosenProduct.productPrice}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  marginLeft: 2,
                }}
              >
                <span
                  style={{
                    color: "#FFF",
                    fontFamily: "Satoshi",
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  Qty
                </span>

                <button
                  onClick={() => handleChangeQuantity(-1)}
                  style={buttonStyle}
                >
                  -
                </button>

                <span style={buttonStyle}>{quantity}</span>

                <button
                  onClick={() => handleChangeQuantity(1)}
                  style={buttonStyle}
                >
                  +
                </button>
              </Box>
            </Box>
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
    </Container>
  );
}

const buttonStyle = {
  fontFamily: "Inter",
  fontSize: 20,
  fontWeight: 700,
  color: "#AB572D",
  background: "none",
  border: "none",
  cursor: "pointer",
};

export default ChosenProduct;
