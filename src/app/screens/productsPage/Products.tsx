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
  Button,
  SelectChangeEvent,
  PaginationItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Close"; // import this if you're using MUI icons
import Pagination from "@mui/material/Pagination";
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



export function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 12,
    order: "createdAt",
    productCategory: ProductCategory.PERFUME,
    search: "",
    gender: "",
    volume: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log("ERROR on useEffect of getProducts"));
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

  /** HANDLERS  */
  const chooseProductDetail = (id: string) => {
    history.push(`/products/${id}`);
  };
 
  const handleCategoryChange = (collection: ProductCategory) => {
    productSearch.page = 1;
    productSearch.productCategory = collection;
    setProductSearch({ ...productSearch });
  };

  const handleVolumeChange = (event: SelectChangeEvent<string>) => {
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      volume: event.target.value,
    }));
  };

  const handleGenderChange = (gender: string) => {
    setProductSearch((prev) => ({ ...prev, page: 1, gender }));
  };

  const handleSearch = () => {
    setProductSearch((prev) => ({ ...prev, search: searchText }));
  };

  const handlePaginationChange = (e: ChangeEvent<unknown>, value: number) => {
    setProductSearch((prev) => ({ ...prev, page: value }));
  };

  const handleKnowMore = (productId: string) => {
    history.push(`/products/${productId}`);
  };

  const goToProductDetail = (id: string) => {
    history.push(`/products/${id}`);
  };
  return (
    <div className="product-container">
      <Container>
        <Stack className="product-category">
          <div className="product-title">Best Selling Products</div>
          <Box className="product-divider">
            <img src="/img/line.png" alt="" />
          </Box>

          <Box className="search-bar-wrapper">
            <input
              className="veloura-search-input"
              type="text"
              placeholder="Search for perfumes..."
              name="singleResearch"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {searchText && (
              <ClearIcon
                className="veloura-clear-icon"
                onClick={() => setSearchText("")}
              />
            )}
            <Button
              variant="contained"
              onClick={handleSearch}
              endIcon={<SearchIcon className="icon" />}
              className="veloura-search-button"
            >
              Search
            </Button>
          </Box>

          <Box className="product-filter-row">
            <Box className="product-filter-left">
              <Typography className="filter-label">Filter By</Typography>

              <FormControl
                variant="outlined"
                className="filter-control"
                sx={formStyle}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  defaultValue=""
                  MenuProps={menuProps}
                  value={productSearch.productCategory || ""}
                  onChange={(e) =>
                    handleCategoryChange(e.target.value as ProductCategory)
                  }
                >
                  <MenuItem value={ProductCategory.ALL}>All</MenuItem>
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

              <FormControl
                variant="outlined"
                className="filter-control"
                sx={formStyle}
              >
                <InputLabel>Gender</InputLabel>
                <Select
                  label="Gender"
                  defaultValue=""
                  value={productSearch.gender || ""}
                  onChange={(e) => handleGenderChange(e.target.value)}
                  MenuProps={menuProps}
                >
                  <MenuItem value="unisex">Unisex</MenuItem>
                  <MenuItem value="men">Men</MenuItem>
                  <MenuItem value="women">Women</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                className="filter-control"
                sx={formStyle}
              >
                <InputLabel>Volume</InputLabel>
                <Select
                  label="Volume"
                  defaultValue=""
                  value={productSearch.volume || ""}
                  onChange={handleVolumeChange}
                  MenuProps={menuProps}
                >
                  <MenuItem value="30ml">30ml</MenuItem>
                  <MenuItem value="50ml">50ml</MenuItem>
                  <MenuItem value="75ml">75ml</MenuItem>
                  <MenuItem value="100ml">100ml</MenuItem>
                  <MenuItem value="150ml">150ml</MenuItem>
                </Select>
              </FormControl>
            </Box>
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
                    <Box className="product-image-wrapper"   onClick={() => goToProductDetail(product._id)}
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
                        onClick={(e) => {
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

              <Button variant="contained" className="special-button" onClick={() => chooseProductDetail("")}>
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

              <Button variant="contained" className="special-button">
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

const menuProps = {
  PaperProps: {
    sx: {
      bgcolor: "#2b2b2b",
      color: "#fff",
      fontFamily: "Satoshi",
      fontSize: 16,
    },
  },
};

export default Products;
