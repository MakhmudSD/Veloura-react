/* eslint-disable jsx-a11y/alt-text */
import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";

const authMember = false;

export default function HomeNavbar() {
  return (
    <div className="home-navbar">
      <Container
        maxWidth={false}
        style={{ maxWidth: "1236px", paddingLeft: 32, paddingRight: 32 }}
        className="navbar-container"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: 41 }}
        >
          {/* Left Side: Logo + Navigation Links */}
          <Stack direction="row" spacing={4} alignItems="center" className="navbar-frame-left">
            <Box>
            <Box className="hover-line">
              <NavLink to="/">
                <div className="logo-txt">Veloura</div>
              </NavLink>
              </Box>
            </Box>

            <Stack direction="row" spacing={3} className="links" alignItems="center">
              <Box className="hover-line">
                <NavLink to="/" activeClassName="underline">
                  Home
                </NavLink>
              </Box>
              <Box className="hover-line">
                <NavLink to="/products" activeClassName="underline">
                  Shop
                </NavLink>
              </Box>

              <Box className="hover-line">
                <NavLink to="/aboutUs" activeClassName="underline">
                  About Us
                </NavLink>
              </Box>
              {authMember && (
                <Box className="hover-line">
                  <NavLink to="/orders" activeClassName="underline">
                    Orders
                  </NavLink>
                </Box>
              )}
              {authMember && (
                <Box className="hover-line">
                  <NavLink to="/member-page" activeClassName="underline">
                    My Page
                  </NavLink>
                </Box>
              )}
              <Box className="hover-line">
                <NavLink to="/help" activeClassName="underline">
                  Help
                </NavLink>
              </Box>
            </Stack>
          </Stack>

          {/* Right Side: Cart + Auth Buttons or Avatar */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            className="navbar-frame-right"
          >
            <Basket />

            {!authMember ? (
              <>
                <Button variant="outlined" className="login-button">
                  Login
                </Button>
                <Button variant="contained" className="signup-button">
                  Sign Up
                </Button>
              </>
            ) : (
              <img
                className="user-avatar"
                src="/icons/default-user.svg"
                alt="User"
              />
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
