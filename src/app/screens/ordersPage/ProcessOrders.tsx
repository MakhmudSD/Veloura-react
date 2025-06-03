import React from "react";
import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Messages, serverApi } from "../../lib/config";
import { Product } from "../../lib/types/product";
import { Order, OrderItem, OrderUpdateInput } from "../../lib/types/order";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../lib/enums/orders.enum";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { T } from "../../lib/types/common";
import OrderService from "../../services/OrderService";
import { moveOrderToFinish } from "./slice";

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrderProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrderProps) {
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);
  const { setValue } = props;
  const dispatch = useDispatch(); // Initialize useDispatch

  /** HANDLERS */
  const finishOrderHandler = async (e: T) => {
    if (!authMember) {
      sweetErrorHandling(Messages.error2).then();
      return;
    }

    try {
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const orderService = new OrderService();
        await orderService.updateOrder(input);
        dispatch(moveOrderToFinish(orderId));
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="2">
      <Stack sx={{ maxHeight: "800px", overflowY: "auto" }}>
        {processOrders && processOrders.length > 0 ? (
          processOrders.map((order: Order) => (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product | undefined = (
                    order.productData ?? []
                  ).find(
                    (ele: Product) =>
                      item.productId.toString() === ele._id.toString()
                  );

                  if (
                    !product ||
                    !product.productImages ||
                    product.productImages.length === 0
                  ) {
                    return (
                      <Box key={item._id} className="orders-name-price">
                        <p style={{ color: "#f5f5dc" }}>
                          Product or product images not found.
                        </p>
                      </Box>
                    );
                  }

                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <Box key={item._id} className="orders-name-price">
                      <Box className="orders-name-price-box">
                        <img
                          src={imagePath}
                          alt=""
                          className="order-item-img"
                        />
                        <p className="title-item">{product.productName}</p>
                        <Box className="price-box">
                          <p>${item.itemPrice}</p>
                          <img src="/icons/close.svg" alt="close-img" />
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
                    <p className="data-compl">
                      {moment().format("YY-MM-DD HH-mm")}
                    </p>
                    <Button
                      value={order._id}
                      variant="contained"
                      className="verify-btn"
                      onClick={finishOrderHandler}
                    >
                      Verify to fulfill
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-end"}
            className="no-data-compl"
          >
            <img src="/icons/noimage-list.svg" alt="noimage" />
            <p>No process orders found</p>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
