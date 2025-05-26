import React from "react";
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
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";

export function Products() {
  const products = Array(12).fill({
    imgSrc:
      "/img/Old_fashion_balck_and_gold_color_perfume__3_-removebg-preview 1.png",
    name: "Luxurious Elixir Rough",
    price: 220,
    volume: "100ml",
  });

  return (
    <>
      <Box className="background-circles" aria-hidden="true">
        <Box className="circle circle1" />
        <Box className="circle circle2" />
        <Box className="circle circle3" />
      </Box>
      <Container className="product-container">
        <Stack className="product-category">
          <div className="product-title">Best Selling Products</div>
          <Box className="product-divider">
            <img src="/img/line.png" alt="" />
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
                <Select label="Category" defaultValue="" MenuProps={menuProps}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="perfume">Perfume</MenuItem>
                  <MenuItem value="eau-de-toilette">Eau De Toilette</MenuItem>
                  <MenuItem value="gift-set">Gift Set</MenuItem>
                  <MenuItem value="accessory">Accessory</MenuItem>
                  <MenuItem value="body-product">Body Product</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                className="filter-control"
                sx={formStyle}
              >
                <InputLabel>Gender</InputLabel>
                <Select label="Gender" defaultValue="" MenuProps={menuProps}>
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
                <Select label="Volume" defaultValue="" MenuProps={menuProps}>
                  <MenuItem value="30ml">30ml</MenuItem>
                  <MenuItem value="50ml">50ml</MenuItem>
                  <MenuItem value="75ml">75ml</MenuItem>
                  <MenuItem value="100ml">100ml</MenuItem>
                  <MenuItem value="150ml">150ml</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                className="filter-control"
                sx={formStyle}
              >
                <InputLabel>Price</InputLabel>
                <Select label="Price" defaultValue="" MenuProps={menuProps}>
                  <MenuItem value="low-high">Low to High</MenuItem>
                  <MenuItem value="high-low">High to Low</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box className="product-filter-right">
              <FormControl
                variant="outlined"
                className="sort-control"
                sx={formStyle}
              >
                <InputLabel>Sort By</InputLabel>
                <Select label="Sort By" defaultValue="" MenuProps={menuProps}>
                  <MenuItem value="popularity">Popularity</MenuItem>
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Stack>

        {/* Product List */}
        <Stack className="product-list">
          <Stack className="product-frame">
            {products.map((product, index) => (
              <Box className="product-box" key={index}>
                <Box className="product-image-wrapper">
                  <img src={product.imgSrc} alt={product.name} />
                  <IconButton
                    className="view-icon"
                    size="small"
                    aria-label="view"
                    sx={{ zIndex: 10 }}
                  >
                    <VisibilityIcon sx={{ color: "#fff" }} />
                  </IconButton>
                  <IconButton
                    className="cart-icon"
                    size="small"
                    aria-label="add to cart"
                    sx={{ zIndex: 10 }}
                  >
                    <ShoppingCartIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Box>
                <Box className="product-desc">
                  <Typography component="span">{product.name}</Typography>
                  <Typography component="p" sx={{ mt: 0 }}>
                    $ {product.price}.00{" "}
                    <Box
                      component="span"
                      sx={{ color: "#AB572D", fontWeight: "700" }}
                    >
                      {product.volume}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Stack>
        <Stack spacing={2} className="product-pagination">
          <Pagination
            count={10}
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
                color: "#fff", // default text color
                backgroundColor: "#1c1c1c", // subtle background for contrast
                "&:hover": {
                  backgroundColor: "#333", // slightly brighter on hover
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#ab572d !important", // active page
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

          <Button variant="contained" className="special-button">
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
              <span className="highlight-text">Unleash Your Divine Glow</span>
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
    </>
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
    textAlign: "center", // fixed typo here
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
