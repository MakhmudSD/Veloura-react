import React from "react";
import { Box, Button, Stack, IconButton, Badge, Menu } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { Messages, serverApi } from "../../lib/config";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();
  const itemsPrice = cartItems.reduce((a: number, c: CartItem) => a + c.quantity * c.price, 0);
  const shippingCost = itemsPrice < 50 ? 10 : 0;
  const total = (shippingCost + itemsPrice).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();

      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      console.log("ERROR on processOrderHandler", err);
      sweetErrorHandling(err).then();
    }
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
        sx={{ color: "#f8f8ff" }}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
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
            bgcolor: "#222",
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
            {cartItems.length === 0 ? (
              <div>Cart is empty!</div>
            ) : (
              <Stack flexDirection={"row"}>
                <div>Card Products:</div>
                <DeleteForeverIcon
                  sx={{ ml: "5px", cursor: "pointer" }}
                  color="primary"
                  onClick={() => onDeleteAll()}
                />
              </Stack>
            )}
          </Box>

          <Box className="orders-main-wrapper">
            <Box className="orders-wrapper">
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`;
                return (
                  <Box
                    key={item._id.toString()}
                    className="basket-info-box"
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <img
                      src={imagePath}
                      className="product-img"
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 4,
                        marginRight: 10,
                      }}
                      alt={item.name}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <span
                        className="product-name"
                        style={{ fontWeight: "bold", color: "#f8f8ff" }}
                      >
                        {item.name}
                      </span>
                      <p
                        className="product-price"
                        style={{ margin: 0, color: "#d7b686" }}
                      >
                        ${item.price} x {item.quantity}
                      </p>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        className="remove"
                        sx={{ minWidth: 30 }}
                        onClick={() => onRemove(item)}
                      >
                        -
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        className="add"
                        sx={{ minWidth: 30 }}
                        onClick={() => onAdd(item)}
                      >
                        +
                      </Button>
                      <IconButton
                        className="cancel-btn"
                        size="small"
                        sx={{ color: "#d7b686", ml: 1 }}
                        aria-label="remove item"
                        onClick={() => onDelete(item)}
                      >
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {cartItems.length > 0 && (
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
                  Total: ${total} ({itemsPrice.toFixed(1)} + {shippingCost})
                </span>
                <Button
                  startIcon={<ShoppingCartIcon />}
                  variant="contained"
                  sx={{
                    backgroundColor: "#d7b686",
                    "&:hover": { backgroundColor: "#b3945b" },
                  }}
                  onClick={proceedOrderHandler}
                >
                  Order
                </Button>
              </Box>
            )}
          </Box>
        </Stack>
      </Menu>
    </Box>
  );
}
