import {
  Container,
  Stack,
  Box,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { Avatar } from "@mui/material";
import { CartItem } from "../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../lib/config";
import { Logout } from "@mui/icons-material";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}
export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setLoginOpen,
    setSignupOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();

  return (
    <div className="home-navbar">
      <Container
        maxWidth={false}
        style={{ maxWidth: "1236px", paddingLeft: 32, paddingRight: 32 }}
        className="navbar-container"
      >
        {/* Left Side */}
        <Stack
          direction="row"
          spacing={4}
          alignItems="center"
          className="navbar-frame-left"
        >
          <NavLink to="/" className="logo-link">
            <div className="logo-txt">Veloura</div>
          </NavLink>

          <Stack
            direction="row"
            spacing={3}
            className="links"
            alignItems="center"
          >
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
            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line">
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>
          </Stack>
        </Stack>

        {/* Right Side */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          className="navbar-frame-right"
        >
          <Basket
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
          />

          {!authMember ? (
            <>
              <Button
                variant="outlined"
                className="login-button"
                onClick={() => setLoginOpen(true)}
              >
                Login
              </Button>
              <Button
                variant="contained"
                className="signup-button"
                onClick={() => setSignupOpen(true)}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Avatar
              src={
                authMember?.memberImage
                  ? `${serverApi}/${authMember.memberImage}`
                  : undefined
              }
              aria-haspopup={"true"}
              alt=""
              onClick={handleLogoutClick}
              sx={{
                width: 40,
                height: 40,
                fontWeight: "bold",
                background: "linear-gradient(135deg, #E0B0FF, #C084FC)",
                color: "white",
                boxShadow: "0 0 8px rgba(224, 176, 255, 0.5)",
              }}
            >
              {authMember?.memberNick?.[0]}
            </Avatar>
          )}

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleCloseLogout}
            onClick={handleCloseLogout}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleLogoutRequest}>
              <ListItemIcon>
                <Logout fontSize="small" style={{ color: "blue" }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
        <Stack className="header-frame">
          <Box className="logo-frame">
            <div className="logo-img"></div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
