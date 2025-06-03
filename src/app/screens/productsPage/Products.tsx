import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  PaginationItem,
  Pagination,
} from "@mui/material";
import Button from "@mui/material/Button";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../lib/types/product";
import { retrieveProducts } from "./selector";
import { setProducts } from "./slice";
import { CartItem } from "../../lib/types/search";
import { useDispatch, useSelector } from "react-redux";
import { ProductCategory } from "../../lib/enums/products.enum";
import { useHistory } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../lib/config";

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
      backgroundColor: "#1c1c1c",
      color: "#fff",
    },
  },
};

export function Products({ onAdd }: ProductsProps) {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const history = useHistory();

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCategory: ProductCategory.PERFUME,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const productService = new ProductService();
      productService
        .getProducts(productSearch)
        .then((data) => setProducts(data))
        .catch(() => console.log("ERROR on useEffect of getProducts"));
    }, 500);
    return () => clearTimeout(timer);
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      setProductSearch((prev) => ({
        ...prev,
        search: "",
        page: 1,
      }));
    }
  }, [searchText]);

  const handleCategoryChange = (value: string) => {
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      productCategory: value as ProductCategory,
    }));
  };

  const handleSearch = () => {
    setProductSearch((prev) => ({ ...prev, search: searchText, page: 1 }));
  };

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    setProductSearch((prev) => ({ ...prev, page: value }));
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const goToProductDetail = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="product-container">
      <Container>
        <Stack className="product-category">
          <Typography variant="h4" className="product-title" gutterBottom>
            Best Selling Products
          </Typography>
          <Box className="product-divider" mb={2}>
            <img src="/img/line.png" alt="divider line" />
          </Box>
          <Box
            className="search-bar-wrapper"
            display="flex"
            alignItems="center"
            mb={3}
          >
            <input
              className="veloura-search-input"
              type="text"
              placeholder="Search for perfumes..."
              name="singleResearch"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{
                flexGrow: 1,
                padding: "10px 14px",
                borderRadius: "12px",
                color: "#000",
                fontFamily: "Satoshi",
                fontSize: "16px",
                width: "100%",
              }}
            />
            {searchText && (
              <ClearIcon
                className="veloura-clear-icon"
                onClick={() => setSearchText("")}
                sx={{
                  cursor: "pointer",
                  color: "#ab572d",
                  marginLeft: "-32px",
                  zIndex: 10,
                }}
              />
            )}
            <SearchIcon
              className="veloura-search-button"
              onClick={handleSearch}
            />
          </Box>

          <Box className="product-filter-row" mb={4}>
            <Box
              className="product-filter-left"
              display="flex"
              gap={2}
              flexWrap="wrap"
              marginTop="20px"
            >
              <Typography
                className="filter-label"
                sx={{ color: "#fff", fontWeight: 600 }}
              >
                Filter By
              </Typography>

              <FormControl variant="outlined" sx={formStyle}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  label="Category"
                  value={productSearch.productCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  MenuProps={menuProps}
                >
                  <MenuItem value={ProductCategory.PERFUME}>Perfume</MenuItem>
                  <MenuItem value={ProductCategory.EAU_DE_TOILETTE}>
                    Eau De Toilette
                  </MenuItem>
                  <MenuItem value={ProductCategory.GIFT_SET}>Gift Set</MenuItem>
                  <MenuItem value={ProductCategory.ACCESSORY}>
                    Accessory
                  </MenuItem>
                  <MenuItem value={ProductCategory.BODY_PRODUCT}>
                    Body Product
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Stack className="perfume-filter-section">
              <Stack className="product-category">
                <div className="category-main">
                  <Button
                    variant="contained"
                    color={
                      productSearch.order === "createdAt"
                        ? "primary"
                        : "secondary"
                    }
                    className="order"
                    onClick={() => searchOrderHandler("createdAt")}
                  >
                    New
                  </Button>
                  <Button
                    variant="contained"
                    color={
                      productSearch.order === "productPrice"
                        ? "primary"
                        : "secondary"
                    }
                    className="order"
                    onClick={() => searchOrderHandler("productPrice")}
                  >
                    Price
                  </Button>
                  <Button
                    variant="contained"
                    color={
                      productSearch.order === "productViews"
                        ? "primary"
                        : "secondary"
                    }
                    className="order"
                    onClick={() => searchOrderHandler("productViews")}
                  >
                    Views
                  </Button>
                </div>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        {/* Product List */}
        <Stack className="product-list">
          <Stack className="product-frame">
            {products.length > 0 ? (
              products.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Box className="product-box" key={product._id.toString()}>
                    <Box
                      className="product-image-wrapper"
                      onClick={() => goToProductDetail(product._id)}
                    >
                      <img src={imagePath} alt={product.productName} />
                      <IconButton
                        className="view-icon"
                        size="small"
                        aria-label="view"
                        sx={{ zIndex: 10 }}
                      >
                        {product.productViews}
                        <VisibilityIcon
                          sx={{
                            color: product.productViews > 0 ? "gold" : "white",
                          }}
                        />
                      </IconButton>
                      <IconButton
                        className="cart-icon"
                        size="small"
                        aria-label="add to cart"
                        sx={{ zIndex: 10 }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          onAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.productName,
                            price: product.productPrice,
                            image: product.productImages[0],
                          });
                          e.stopPropagation();
                        }}
                      >
                        <ShoppingCartIcon sx={{ color: "gold" }} />
                      </IconButton>
                    </Box>
                    <Box className="product-desc">
                      <Typography component="span">
                        {product.productName}
                      </Typography>
                      <Typography component="p" sx={{ mt: 0 }}>
                        $ {product.productPrice}.00{" "}
                      </Typography>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box className="no-data-container">
                <SentimentDissatisfiedIcon className="no-data-icon" />
                <p className="no-data-text">Products are not available!</p>
              </Box>
            )}
          </Stack>
        </Stack>

        <Stack spacing={2} className="product-pagination">
          <Pagination
            count={
              products.length !== 0
                ? productSearch.page + 1
                : productSearch.page
            }
            page={productSearch.page}
            onChange={handlePaginationChange}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBackIcon,
                  next: ArrowForwardIcon,
                }}
                {...item}
                color="secondary"
              />
            )}
            variant="outlined"
            color="secondary"
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "20px",
                width: "48px",
                height: "48px",
                fontFamily: "Satoshi",
                borderRadius: "12px",
                borderColor: "#ab572d",
                color: "#fff",
                backgroundColor: "#1c1c1c",
                "&:hover": {
                  backgroundColor: "#333",
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#ab572d !important",
                color: "#fff !important",
                borderColor: "#ab572d",
              },
            }}
          />
        </Stack>

        <Stack className="special-offers-section" spacing={0}>
          <div className="special-title">
            <h1>Special Offers</h1>
          </div>

          {/* Row 1: TEXT LEFT, IMAGE RIGHT */}
          <Box className="special-content dark-teal">
            <Box className="special-text-box">
              <Box className="special-headline">
                <h1>Limited Time Offer: 20% OFF on Aqua Serenity Perfume!</h1>
              </Box>

              <Box className="special-description">
                <h3>
                  Aqua Serenity <br />
                  <span>Embrace the Tranquil Tides</span>
                </h3>
                <p>
                  Immerse yourself in the calming embrace of Aqua Serenity, a
                  captivating fragrance that evokes the essence of water.
                </p>
              </Box>

              <Button
                variant="contained"
                className="special-button"
                onClick={() => goToProductDetail("6837b8f0b7febcf9fa347265")}
              >
                <p>Know More</p>
              </Button>
            </Box>

            <Box className="special-image-box">
              <img src="/img/kuroswan.png" alt="Aqua Serenity Perfume" />
            </Box>
          </Box>

          {/* Row 2: IMAGE LEFT, TEXT RIGHT */}
          <Box className="special-content deep-brown">
            <Box className="special-image-box">
              <img src="/img/thong_nguyen.png" alt="Golden Angel Perfume" />
            </Box>

            <Box className="special-text-box">
              <Box className="special-headline">
                <h1>Limited Time Offer: 25% OFF on Golden Angel Perfume!</h1>
              </Box>

              <Box className="special-description">
                <h3>
                  Golden Angel <br />
                  <span className="highlight-text">
                    Unleash Your Divine Glow
                  </span>
                </h3>
                <p>
                  Indulge in the divine allure of Golden Angel, a fragrance that
                  embodies celestial elegance and radiance.
                </p>
              </Box>

              <Button
                variant="contained"
                className="special-button"
                onClick={() => goToProductDetail("683c070fa00db9689b2fdf15")}
              >
                <p>Know More</p>
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}

const formStyle = {
  minWidth: 180,
  backgroundColor: "transparent",
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    borderColor: "#ab572d",
    "& fieldset": {
      borderColor: "#ab572d",
      borderRadius: "12px",
    },
    "&:hover fieldset": {
      borderColor: "#d17e4f",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ab572d",
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    fontSize: "16px",
    letterSpacing: "1px",
    textAlign: "center",
    transition: "color 0.3s ease",
    "&.Mui-focused": {
      color: "#e8b14a",
    },
  },
  "& .MuiSelect-select": {
    fontFamily: "Satoshi",
    fontSize: "18px",
    paddingLeft: "8px",
    whiteSpace: "nowrap",
    overflow: "visible",
    color: "#fff",
  },
};

export default Products;
