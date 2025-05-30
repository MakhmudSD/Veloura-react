import { Box, Button, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";

export function SaleBanner() {
    const history = useHistory();
  
    const chooseProductDetail = (id: string) => {
      history.push(`/products/${id}`);
    };
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
        <Button variant="contained" className="sale-banner-know-more" onClick={() => chooseProductDetail("6839144b315bebb028ea1fb2")}
        >
          <p>Know More</p>
        </Button>
      </Stack>
    </Container>
  );
}

export default SaleBanner;
