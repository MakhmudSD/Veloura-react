import { Container, Stack } from "@mui/material";

export function OurValues() {
  return (
    <Container className="value-container">
      <Stack className="value-left"></Stack>
      <Stack className="value-right">
        <span>Our Values</span>
        <p>
          At Veloura, our perfume retail store is built on a foundation of
          passion and authenticity. We believe in celebrating the individuality
          of every customer, providing a diverse collection of scents that
          resonate with their unique personality and style. Our dedicated team
          of fragrance enthusiasts is committed to creating a welcoming and
          inclusive environment, where connections are forged, and inspiration
          thrives. Embracing sustainability and continuous learning, Veloura
          strives to be more than just a shopping destination; we are a
          community that inspires and empowers individuals on their fragrance
          journey.
        </p>
      </Stack>
    </Container>
  );
}

export default OurValues;
