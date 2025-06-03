import { useState, SyntheticEvent, useEffect } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../lib/types/order";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../lib/enums/orders.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../lib/config";
import { MemberType } from "../../lib/enums/members.enum";
import "../../../css/orders.css";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});
export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });
  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /** HANDLERS */

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  if (!authMember) history.push("/");
  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="table_list"
                >
                  <Tab label="PAUSED ORDERS" value={"1"} className="muiTab" />
                  <Tab label="PROCESS ORDERS" value={"2"} className="muiTab" />
                  <Tab label="FINISHED ORDERS" value={"3"} className="muiTab" />
                </Tabs>
              </Box>
            </Box>
            <Stack className="order-main-content">
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="order-right">
          <Box className="order-info-box">
            <Box className="member-box">
              <div className="order-user-img">
                <img
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/user-badge.png"
                  }
                  className="order-user-avatar"
                  alt="user-avatar"
                />
                <div className="order-user-icon-box">
                  <img
                    src={
                      authMember?.memberType === MemberType.ADMIN
                        ? "/icons/admin.svg"
                        : "/icons/user-badge.svg"
                    }
                    className="order-user-prof-img"
                    alt="user-prof-img"
                  />
                </div>
              </div>
              <span className="order-user-name">{authMember?.memberNick}</span>
              <span className="order-user-prof">{authMember?.memberType}</span>
            </Box>
            <Box className="liner">
              <Box className="order-user-address">
                <div style={{ display: "flex", marginTop: "6px" }}>
                  <LocationOnIcon />
                </div>
                <div
                  className="spec-address-text"
                  style={{ marginLeft: "10px", marginTop: "6px" }}
                >
                  {" "}
                  {authMember?.memberAddress
                    ? authMember.memberAddress
                    : "No address"}
                </div>
              </Box>
            </Box>
          </Box>
          <Box className="order-payment-box">
            <Box className="order-payment-info-box">
              <Box className="order-card-box-1">
                <div className="order-card-number">
                  Card number: 1234 5678 9012 3456
                </div>
              </Box>
              <Box className="order-card-group">
                <Box className="order-card-box-2">
                  <div className="order-card-validity">07/24</div>
                </Box>
                <Box className="order-card-box-3">
                  <div className="order-card-cvv"> CVV: 123</div>
                </Box>
              </Box>
              <Box className="order-card-box-4">
                <div className="order-card-owner">{authMember?.memberNick}</div>
              </Box>
              <Box className="order-payment-cards">
                <div className="western-union">
                  <img src="/icons/western-card.svg" alt="western-card" />
                </div>
                <div className="visa-card">
                  <img src="/icons/visa-card.svg" alt="visa-card" />
                </div>
                <div className="paypal-card">
                  <img src="/icons/paypal-card.svg" alt="paypal-card" />
                </div>
                <div className="master-card">
                  <img src="/icons/master-card.svg" alt="master-card" />
                </div>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
