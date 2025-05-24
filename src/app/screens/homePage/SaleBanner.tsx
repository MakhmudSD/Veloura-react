import { Box, Button, Container, Stack } from "@mui/material";

export function SaleBanner() {
  return (
    <Container className="sale-banner-container">
      <Box className="sale-banner-img" />

      <Stack className="sale-banner-left">
        <Box className="sale-banner-title">
          Perfume Year-End Sale! Up to 50% OFF
        </Box>
        <Box className="sale-banner-txt">
          Discover an exquisite collection of premium perfumes at unbelievable
          prices during our exclusive Perfume Sale!
        </Box>
        <Button variant="contained" className="sale-banner-know-more">
          <p>Know More</p>
        </Button>
      </Stack>
    </Container>
  );
}

export default SaleBanner;
