import { Box, Button, Container, Stack } from "@mui/material";

export function HeroBanner() {
  return (
    <Container className="hero-banner-container">
      <Stack className="hero-banner-frame">
        <Stack className="hero-banner-left">
          <Box className="hero-banner-left-up">
            Elevate Your Spirit with Victory Scented Fragrances!
          </Box>
          <Box className="hero-banner-left-down">
            Shop now and embrace the sweet smell of victory with Local Face.
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

export default HeroBanner;
