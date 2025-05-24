import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  background: #161515;
  background-size: cover;
  padding: 60px 0;
`;

export default function Footer() {
  return (
    <Footers>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 10 } }}>
        <Stack
          className="footer-container"
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={6}
        >
          <Stack
            className="footer-frame"
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            sx={{ width: "100%" }}
            spacing={4}
          >
            <Stack className="footer-left">
              <Box
                sx={{ flex: 1, maxWidth: { md: 340 }, mb: { xs: 4, md: 0 } }}
              >
                <p className="logo-txt">Veloura</p>
                <p className="subscribe-txt">Subscribe to Our Newsletter</p>
                <p className="update-txt">
                  Get the latest updates on new arrivals and exclusive offers!
                </p>
                <Box
                  className="email-input-frame"
                  sx={{ mt: 2, display: "flex" }}
                >
                  <input
                    type="text"
                    className="email-input"
                    placeholder="Your Email Here"
                    style={{ flex: 1, marginRight: 8 }}
                  />
                  <Button variant="contained" className="submit-button">
                    Submit
                  </Button>
                </Box>
                <Box
                  className="sns-context"
                  sx={{ mt: 3, display: "flex", gap: 2 }}
                >
                  <img src={"/icons/facebook.svg"} alt="Facebook" />
                  <img src={"/icons/twitter.svg"} alt="Twitter" />
                  <img src={"/icons/instagram.svg"} alt="Instagram" />
                  <img src={"/icons/linkedin.svg"} alt="LinkedIn" />
                </Box>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={6}
              sx={{ flex: 2, justifyContent: "space-between" }}
              className="footer-right"
            >
              <Box className="footer-category">
                <h3>Categories</h3>
                <p>Fashion</p>
                <p>Jewelry</p>
                <p>Sports</p>
                <p>Electronics</p>
                <p>Indoor</p>
              </Box>
              <Box className="footer-shopping">
                <h3>Shopping</h3>
                <p>Payment</p>
                <p>Delivery Options</p>
                <p>Buyer Protection</p>
              </Box>
              <Box className="footer-customer-care">
                <h3>Customer Care</h3>
                <p>Help Center</p>
                <p>Terms & Conditions</p>
                <p>Privacy Policy</p>
                <p>Returns & Refunds</p>
                <p>Survey & Feedback</p>
              </Box>
              <Box className="footer-page">
                <h3>Pages</h3>
                <p>Home</p>
                <p>About Us</p>
                <p>Shop</p>
                <p>Help</p>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>

      {/* Full-width Divider (before copyright) */}
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

      {/* Copyright */}
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 10 }, mt: 2 }}>
        <Box sx={{ color: "#ccc", fontSize: 14, textAlign: "center" }}>
          © 2025 Veloura. All rights reserved.
        </Box>
      </Container>
    </Footers>
  );
}
