import { Box, Button, Container, Stack } from "@mui/material";

export function ChosenProduct() {
  return (
    <Container className="chosen-product-container">
      <Stack direction="row" spacing={4} className="chosen-product-wrapper">
        <Box className="chosen-product-left">
          <img
            src="/img/Old_fashion_balck_and_gold_color_perfume-removebg-preview 1.png"
            alt="Black and gold luxury perfume bottle"
            className="main-product-image"
          />
        </Box>

        <Stack className="chosen-product-right" spacing={2}>
          <Box className="chosen-product-title">
            <h1>Luxurious Elixir</h1>
          </Box>

          <Box className="chosen-product-description">
            <p>
              Step into a world of unparalleled opulence with Luxurious Elixir,
              an exquisite fragrance that weaves an enchanting symphony of gold
              and luxury. This gilded elixir is a celebration of sophistication,
              crafted with the finest essences and imbued with the allure of
              precious golden hues.
            </p>
          </Box>
          <Box className="chosen-product-img-preview">
            <img
              src="/img/Old_fashion_balck_and_gold_color_perfume-removebg-preview 1.png"
              alt="Perfume preview"
            />
            <p>150 ml</p>
          </Box>

          <Box className="chosen-product-price">$250.00</Box>

          <Box className="chosen-product-calculate-form">
            <span className="chosen-product-quantity-label">Qty</span>
            <button
              className="chosen-product-remove"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="chosen-product-number">1</span>
            <button
              className="chosen-product-add"
              aria-label="Increase quantity"
            >
              +
            </button>
          </Box>

          <Button className="chosen-product-calculate-add-button">
            <span>Add to Bag</span>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default ChosenProduct;
