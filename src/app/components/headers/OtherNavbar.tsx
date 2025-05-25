/* eslint-disable jsx-a11y/alt-text */
import { Container, Stack, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { Avatar } from "@mui/material";

const authMember = false;

export default function OtherNavbar() {
  return (
    <div className="home-navbar">
      <Container
        maxWidth={false}
        style={{ maxWidth: "1236px", paddingLeft: 32, paddingRight: 32 }}
        className="navbar-container"
      >
        {/* Left Side */}
        <Stack direction="row" spacing={4} alignItems="center" className="navbar-frame-left">
            <NavLink to="/" className="logo-link">
              <div className="logo-txt">Veloura</div>
            </NavLink>

          <Stack direction="row" spacing={3} className="links" alignItems="center">
            <Box className="hover-line">
              <NavLink to="/" exact activeClassName="underline">
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
              <>
                <Box className="hover-line">
                  <NavLink to="/orders" activeClassName="underline">
                    Orders
                  </NavLink>
                </Box>
                <Box className="hover-line">
                  <NavLink to="/member-page" activeClassName="underline">
                    My Page
                  </NavLink>
                </Box>
              </>
            )}
            <Box className="hover-line">
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>
          </Stack>
        </Stack>

        {/* Right Side */}
        <Stack direction="row" spacing={2} alignItems="center" className="navbar-frame-right">
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
            <Avatar
              className="user-avatar"
              sx={{
                width: 40,
                height: 40,
                fontWeight: "bold",
                background: "linear-gradient(135deg, #E0B0FF, #C084FC)",
                color: "white",
                boxShadow: "0 0 8px rgba(224, 176, 255, 0.5)",
              }}
            >
            </Avatar>
          )}
        </Stack>
      </Container>
    </div>
  );
}
