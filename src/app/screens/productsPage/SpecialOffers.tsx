import React from "react";
import { Container, Stack, Box, Button } from "@mui/material";

export function SpecialOffers() {
  return (
    <Container>
      <Stack className="special-offers-section" spacing={4}>
        <div className="special-title">
          <h1>Special Offers</h1>
        </div>

        {/* Row 1: TEXT LEFT, IMAGE RIGHT */}
        <Box className="special-content dark-teal" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" gap={6} padding="60px 80px" borderRadius="20px">
          <Box className="special-text-box" flex={1}>
            <Box className="special-headline" mb={3}>
              <h1>Limited Time Offer: 20% OFF on Aqua Serenity Perfume!</h1>
            </Box>

            <Box className="special-description" mb={3}>
              <h3>
                Aqua Serenity <br />
                <span>Embrace the Tranquil Tides</span>
              </h3>
              <p>
                Immerse yourself in the calming embrace of Aqua Serenity, a captivating fragrance that evokes the essence of water.
              </p>
            </Box>

            <Button variant="contained" className="special-button">
              Know More
            </Button>
          </Box>

          <Box className="special-image-box" flex={1} textAlign="center">
            <img src="/img/kuroswan.png" alt="Aqua Serenity Perfume" style={{ maxWidth: "100%", borderRadius: "20px" }} />
          </Box>
        </Box>

        {/* Row 2: IMAGE LEFT, TEXT RIGHT */}
        <Box className="special-content deep-brown" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" gap={6} padding="60px 80px" borderRadius="20px">
          <Box className="special-image-box" flex={1} textAlign="center">
            <img src="/img/thong_nguyen.png" alt="Golden Angel Perfume" style={{ maxWidth: "100%", borderRadius: "20px" }} />
          </Box>

          <Box className="special-text-box" flex={1}>
            <Box className="special-headline" mb={3}>
              <h1>Limited Time Offer: 25% OFF on Golden Angel Perfume!</h1>
            </Box>

            <Box className="special-description" mb={3}>
              <h3>
                Golden Angel <br />
                <span className="highlight-text">Unleash Your Divine Glow</span>
              </h3>
              <p>
                Indulge in the divine allure of Golden Angel, a fragrance that embodies celestial elegance and radiance.
              </p>
            </Box>

            <Button variant="contained" className="special-button">
              Know More
            </Button>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}

export default SpecialOffers;
