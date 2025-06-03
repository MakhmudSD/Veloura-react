import React from "react";
import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector, useDispatch } from "react-redux";
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
import { deleteOrder, moveOrderToProcess } from "./slice";

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrderProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrderProps) {
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  const { setValue } = props;
  const dispatch = useDispatch();

  /** HANDLERS */
  const deleteOrderHandler = async (e: T) => {
    if (!authMember) {
      sweetErrorHandling(Messages.error2).then();
      return;
    }
    if (!authMember) {
      sweetErrorHandling(Messages.error2).then();
      return;
    }
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
        const orderService = new OrderService();
        await orderService.updateOrder(input);
        dispatch(deleteOrder(orderId));
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    if (!authMember) {
      sweetErrorHandling(Messages.error2).then();
      return;
    }
    if (!authMember) {
      sweetErrorHandling(Messages.error2).then();
      return;
    }
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
        const orderService = new OrderService();
        await orderService.updateOrder(input);
        dispatch(moveOrderToProcess(orderId));
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
      {!pausedOrders || pausedOrders.length === 0 ? (
        <Box className="no-data-compl">
          <img src="/icons/noimage-list.svg" alt="no-data" />
          <p>No paused orders found.</p>
        </Box>
      ) : (
        <Stack sx={{ maxHeight: "800px", overflowY: "auto" }}>
          {pausedOrders.map((order: Order) => (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product = order.productData?.find((ele: Product) => {
                    return item.productId?.toString() === ele._id?.toString();
                  });

                  if (!product) {
                    return (
                      <p key={item._id} style={{ color: "#f5f5dc" }}>
                        Product not found
                      </p>
                    );
                  }
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <Box className="orders-name-price-box">
                        <img
                          src={imagePath}
                          className="order-item-img"
                          alt=""
                        />
                        <p className="title-item">{product.productName}</p>
                        <Box className="price-box">
                          <p>${item.itemPrice}</p>
                          <img src="/icons/close.svg" alt="close-img" />
                          <p>{item.itemQuantity}</p>
                          <p>{item.itemQuantity}</p>
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

                  <Button
                    value={order._id}
                    variant="contained"
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
