import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

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
        {finishedOrders.map((order: Order) => {
          return (
            <Box key={order._id.toString()} className="order-main-box">
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id.toString()} className="orders-name-price">
                      <Box className="orders-name-price-box">
                        <img
                          src={imagePath}
                          alt="kebab"
                          className="order-dish-img"
                        />
                        <p className="title-dish">{product.productName}</p>
                        <Box className="price-box">
                          <p>${item.itemPrice}</p>
                          <img src="/icons/close.svg" alt="close-img" />
                          <p>${item.itemQuantity}</p>
                          <img src="/icons/pause.svg" alt="pause-img" />
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
                  <Box className="total-box" sx={{ marginLeft: "170px" }}>
                    <p>Product Price</p>
                    <p>${order.orderTotal - order.orderDelivery}</p>
                    <img
                      src="/icons/plus.svg"
                      alt="plus-icon"
                      style={{ marginLeft: "20px" }}
                    />
                    <p>Delivery Cost</p>
                    <p>{order.orderDelivery}</p>
                    <img
                      src="/icons/pause.svg"
                      alt="pause-icon"
                      style={{ marginLeft: "20px" }}
                    />
                    <p>Total</p>
                    <p>${order.orderTotal}</p>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}

        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              className="no-data-compl"
            >
              <img
                src="/icons/noimage-list.svg"
                alt="noimage"
                style={{ width: 500, height: 500 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
