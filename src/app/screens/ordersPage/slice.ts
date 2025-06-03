import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../lib/types/screen";
import { Order } from "../../lib/types/order";
import { OrderStatus } from "../../lib/enums/orders.enum";

const initialState: OrdersPageState = {
  pausedOrders: [],
  processOrders: [],
  finishedOrders: [],
};

const orderPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setPausedOrders: (state, action: PayloadAction<Order[]>) => {
      state.pausedOrders = action.payload;
    },
    setProcessOrders: (state, action: PayloadAction<Order[]>) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action: PayloadAction<Order[]>) => {
      state.finishedOrders = action.payload;
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      const orderIdToDelete = action.payload;
      state.pausedOrders = state.pausedOrders.filter(
        (order) => order._id !== orderIdToDelete
      );
    },
    moveOrderToProcess: (state, action: PayloadAction<string>) => {
      const orderIdToMove = action.payload;
      const orderIndex = state.pausedOrders.findIndex(
        (order) => order._id === orderIdToMove
      );

      if (orderIndex !== -1) {
        const [movedOrder] = state.pausedOrders.splice(orderIndex, 1);
        if (movedOrder) {
          const updatedOrder = {
            ...movedOrder,
            orderStatus: OrderStatus.PROCESS,
          };
          state.processOrders.push(updatedOrder);
        }
      }
    },
    moveOrderToFinish: (state, action: PayloadAction<string>) => {
      const orderIdToMove = action.payload;
      const orderIndex = state.processOrders.findIndex(
        (order) => order._id === orderIdToMove
      );

      if (orderIndex !== -1) {
        const [movedOrder] = state.processOrders.splice(orderIndex, 1);
        if (movedOrder) {
          const updatedOrder = {
            ...movedOrder,
            orderStatus: OrderStatus.FINISH,
          };
          state.finishedOrders.push(updatedOrder);
        }
      }
    },
  },
});

export const {
  setPausedOrders,
  setProcessOrders,
  setFinishedOrders,
  deleteOrder,
  moveOrderToProcess,
  moveOrderToFinish,
} = orderPageSlice.actions;

const OrderPageReducer = orderPageSlice.reducer;
export default OrderPageReducer;
