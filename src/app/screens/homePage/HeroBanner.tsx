import { Box, Button, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";

interface HeroBannerProps {
  product: { _id: string };
}

export function HeroBanner({ product }: HeroBannerProps) {
  const history = useHistory();

  const chooseProductDetail = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <Container className="hero-banner-container">
      <Stack className="hero-banner-frame">
        <Stack className="hero-banner-left">
          <Box className="hero-banner-left-up">
            Elevate Your Spirit with Victory Scented Fragrances!
          </Box>
          <Box className="hero-banner-left-down">
            Shop now and embrace the sweet smell of victory with Veloura.
          </Box>
          <Button
            variant="contained"
            sx={{
              color: "#FFF",
              fontFamily: "Satoshi Variable",
              fontSize: 16,
              fontStyle: "normal",
              fontWeight: 900,
              lineHeight: "normal",
            }}
            className="hero-banner-left-shop"
            onClick={() => chooseProductDetail(product._id)}
          >
            Shop Now
          </Button>
        </Stack>
        <Stack className="hero-banner-right">
          <Box className="hero-banner-right-img" />
        </Stack>
      </Stack>
    </Container>
  );
}
export default HeroBanner