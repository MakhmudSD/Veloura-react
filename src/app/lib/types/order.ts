import { ObjectId } from "mongoose";
import { OrderStatus } from "./../enums/orders.enum";
import { Product } from "./product";

export interface OrderItem {
  _id: ObjectId | string;
  itemQuantity: number;
  itemPrice: number;
  orderId: ObjectId | string;
  productId: ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: ObjectId | string;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: OrderStatus;
  memberId: ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
  productData: Product[];
}

export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  productId: string | ObjectId;     // Sent from frontend – correct as string
  orderId?: string;      // Optional on input
}

export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
  orderId: string;
  orderStatus: OrderStatus;
}

