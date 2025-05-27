import { ObjectId } from "mongoose";

export interface CartItem {
    _id: string | ObjectId;
    quantity: number;
    name: string;
    price: number;
    image: string
    gender?: string
    volume?: string
    sortBy?: string
}