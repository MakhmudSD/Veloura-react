/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Box, Button, Stack, IconButton, Badge, Menu } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";

export default function Basket() {
  const authMember = null;
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="hover-line">
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "#f8f8ff" }} // matches nav text color
      >
        <Badge badgeContent={3} color="secondary">
          <img
            src={"/icons/shopping-cart.png"}
            style={{ width: 28, height: 28 }}
            alt="shopping cart"
          />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            bgcolor: "#222", // darker background to match Veloura style
            color: "#f8f8ff",
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
              bgcolor: "#222",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className="basket-frame" sx={{ padding: 2, width: 380 }}>
          <Box className="all-check-box" sx={{ mb: 2, textAlign: "center" }}>
            <div>Cart is empty!</div>
          </Box>

          <Box className="orders-main-wrapper">
            <Box className="orders-wrapper">
              <Box
                className="basket-info-box"
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <img
                  src={"/img/fresh.webp"}
                  className="product-img"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 4,
                    marginRight: 10,
                  }}
                  alt="Kebab"
                />
                <Box sx={{ flexGrow: 1 }}>
                  <span
                    className="product-name"
                    style={{ fontWeight: "bold", color: "#f8f8ff" }}
                  >
                    Kebab
                  </span>
                  <p
                    className="product-price"
                    style={{ margin: 0, color: "#d7b686" }}
                  >
                    $10 x 1
                  </p>
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    className="remove"
                    sx={{ minWidth: 30 }}
                  >
                    -
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    className="add"
                    sx={{ minWidth: 30 }}
                  >
                    +
                  </Button>
                  <IconButton
                    className="cancel-btn"
                    size="small"
                    sx={{ color: "#d7b686", ml: 1 }}
                    aria-label="remove item"
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            className="basket-order"
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              className="price"
              style={{ color: "#d7b686", fontWeight: "bold" }}
            >
              Total: $100 (98 + 2)
            </span>
            <Button
              startIcon={<ShoppingCartIcon />}
              variant="contained"
              sx={{
                backgroundColor: "#d7b686",
                "&:hover": { backgroundColor: "#b3945b" },
              }}
            >
              Order
            </Button>
          </Box>
        </Stack>
      </Menu>
    </Box>
  );
}
