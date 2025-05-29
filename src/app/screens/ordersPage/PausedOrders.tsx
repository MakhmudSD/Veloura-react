import React from "react";
import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Messages, serverApi } from "../../lib/config";
import { Product } from "../../lib/types/product";
import { Order, OrderItem, OrderUpdateInput } from "../../lib/types/order";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { T } from "../../lib/types/common";
import { OrderStatus } from "../../lib/enums/orders.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrderProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrderProps) {
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders = [] } = useSelector(pausedOrdersRetriever);
  const { setValue } = props;

  /** HANDLERS */
  const deleteOrderHandler = async (e: T) => {
    if (!authMember) throw new Error(Messages.error2);
    try {
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm(
        "Do you really want to delete your order?"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    if (!authMember) throw new Error(Messages.error2);
    // PAYMENT PROCESS

    try {
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm(
        "Do you really want to proceed with payment?"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value="1">
      {(!pausedOrders || pausedOrders.length === 0) ? (
        <Box display="flex" justifyContent="center">
          <img
            src="/icons/noimage-list.svg"
            alt="no-data"
            style={{ width: 300, height: 300 }}
          />
        </Box>
      ) : (
        <Stack sx={{ maxHeight: "800px", overflowY: "auto" }}>
          {pausedOrders.map((order: Order) => (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product | undefined = order.productData?.find(
                    (ele: Product) => item.productId === ele._id
                  );
                  if (!product) return null;
  
                  const imagePath = `${serverApi}/uploads/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <Box className="orders-name-price-box">
                        <img
                          src={imagePath}
                          alt={product.productName}
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
                  <Box className="total-box">
                    <p>Product Price</p>
                    <p>${order.orderTotal - order.orderDelivery}</p>
                    <img src="/icons/plus.svg" alt="plus-icon" style={{ marginLeft: "20px" }} />
                    <p>Delivery Cost</p>
                    <p>${order.orderDelivery}</p>
                    <img src="/icons/pause.svg" alt="pause-icon" style={{ marginLeft: "20px" }} />
                    <p>Total</p>
                    <p>${order.orderTotal}</p>
                  </Box>
  
                  <Button
                    value={order._id}
                    variant="contained"
                    color="secondary"
                    className="cancel-btn"
                    onClick={deleteOrderHandler}
                  >
                    Cancel
                  </Button>
                  <Button
                    value={order._id}
                    variant="contained"
                    className="pay-btn"
                    onClick={processOrderHandler}
                  >
                    Payment
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      )}
    </TabPanel>
  );
  
}
