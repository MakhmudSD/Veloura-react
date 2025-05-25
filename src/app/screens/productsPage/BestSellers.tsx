import { Box, Container, Stack } from "@mui/material";

export function BestSellers() {
    return <Container className="product-container">
        <Stack className="product-category">
                <div className="product-title">Best Selling Products</div>
                  <Box sx={{ width: "100vw", mt: 6 }}>
                    <hr
                      style={{
                        border: "1px solid #C5C8C9",
                        opacity: 0.2,
                        margin: 0,
                        marginBottom: "20px",
                      }}
                    />
                  </Box>
                  <Stack className="product-filter">
                    <Box className="product-filter-left"></Box>
                    <Box className="product-filter-right"></Box>
                  </Stack>
        </Stack>
        <Stack className="product-list"></Stack>
        <Stack className="product-page"></Stack>
    </Container>
}

export default BestSellers