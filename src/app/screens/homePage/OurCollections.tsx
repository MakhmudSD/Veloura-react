import { Box, Container } from "@mui/material";

export function OurCollections() {
  return (
    <Container className="collection-container homepage">
      <Box className="collection-title">
        <span>Our Collections</span>
      </Box>
      <Box className="collection-grid">
        <Box className="collection-item">
          <div className="image-wrapper">
            <img src="/img/DarkStar.png" alt="Designer Delights Collection" />
          </div>
          <p>Designer Delights Collection</p>
        </Box>
        <Box className="collection-item">
          <div className="image-wrapper">
            <img
              src="/img/TravelEssentialCollection.png"
              alt="Travel Essentials Collection"
            />
          </div>
          <p>Travel Essentials Collection</p>
        </Box>
        <Box className="collection-item">
          <div className="image-wrapper">
            <img
              src="/img/special-occasions.png"
              alt="Special Occasions Collection"
            />
          </div>
          <p>Special Occasions Collection</p>
        </Box>
        <Box className="collection-item">
          <div className="image-wrapper">
            <img src="/img/seasonal.png" alt="Seasonal Sensations Collection" />
          </div>
          <p>Seasonal Sensations Collection</p>
        </Box>
        <Box className="collection-item">
          <div className="image-wrapper">
            <img src="/img/vintage.png" alt="Vintage Treasures Collection" />
          </div>
          <p>Vintage Treasures Collection</p>
        </Box>
        <Box className="collection-item">
          <div className="image-wrapper">
            <img
              src="/img/limited-edition-collection.png"
              alt="Limited Edition Treasures"
            />
          </div>
          <p>Limited Edition Treasures</p>
        </Box>
        <Box className="collection-item">
          <div className="image-wrapper">
            <img
              src="/img/modern-classic.png"
              alt="Modern Classics Collection"
            />
          </div>
          <p>Modern Classics Collection</p>
        </Box>
      </Box>
    </Container>
  );
}

export default OurCollections;
