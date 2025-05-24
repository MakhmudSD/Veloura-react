import { Box, Container, Stack } from "@mui/material";

export function WelcomeNote() {
  return (
    <Container className="welcome-note-container">
      <Stack className="welcome-note-background" />
      <Stack className="welcome-note-frame">
        <Box className="welcome-note-txt">
          <span>Welcome to Veloura</span>
          <p>
            Welcome to Veloura Perfumes, where the spirit of victory and triumph
            come alive through scents that empower and inspire. Our curated
            collection, aptly named "Victory Scented," is a celebration of
            success and elegance, designed to unleash your victorious essence.
            Indulge in the sweet taste of triumph with captivating fragrances
            that tell the tale of your achievements. At Local Face, we believe
            that every victory deserves a signature scent, and we are dedicated
            to providing unforgettable fragrances that elevate your spirit and
            empower your journey.
          </p>
        </Box>
      </Stack>
    </Container>
  );
}

export default WelcomeNote;
