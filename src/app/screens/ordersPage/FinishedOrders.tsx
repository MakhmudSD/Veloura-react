import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { serverApi } from "../../lib/config";
import { Product } from "../../lib/types/product";
import { Order, OrderItem } from "../../lib/types/order";

const finishOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishOrdersRetriever);

  return (
    <TabPanel value="3">
      <Stack sx={{ maxHeight: "800px", overflowY: "auto" }}>
        {finishedOrders?.length > 0 ? (
          finishedOrders.map((order: Order) => (
            <Box
              key={order._id}
              className="order-main-box"
              sx={{
                position: "relative",
                mb: 3,
              }}
            >
              <TaskAltIcon
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 6,
                  fontSize: 40,
                  color: "#F2BD57",
                }}
              />

              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product | undefined = order.productData?.find(
                    (ele: Product) => item.productId === ele._id
                  );
                  if (!product) {
                    return (
                      <Box key={item._id} className="orders-name-price">
                        <p style={{ color: "#f5f5dc" }}>Product not found.</p>
                      </Box>
                    );
                  }

                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <Box className="orders-name-price-box">
                        <img
                          src={imagePath}
                          alt="product"
                          className="order-item-img"
                        />
                        <p className="title-item">{product.productName}</p>
                        <Box className="price-box">
                          <p>${item.itemPrice}</p>
                          <img src="/icons/close.svg" alt="close-icon" />
                          <p>{item.itemQuantity}</p>
                          <img src="/icons/pause.svg" alt="pause-icon" />
                          <p style={{ marginLeft: "7px" }}>
                            ${item.itemQuantity * item.itemPrice}
                          </p>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className="total-price-box">
                <Box>
                  <Box className="total-box" sx={{ ml: "170px" }}>
                    <p>Product Price:</p>
                    <p>${order.orderTotal - order.orderDelivery}</p>
                    <img
                      src="/icons/plus.svg"
                      alt="plus-icon"
                      style={{ marginLeft: "10px", marginRight: "8px" }}
                    />
                    <p>Delivery Cost:</p>
                    <p>${order.orderDelivery}</p>
                    <img
                      src="/icons/pause.svg"
                      alt="pause-icon"
                      style={{ marginLeft: "10px" }}
                    />
                    <p>Total:</p>
                    <p>${order.orderTotal}</p>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            className="no-data-compl"
          >
            <img src="/icons/noimage-list.svg" alt="noimage" />
            <p>No finished orders found</p>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
