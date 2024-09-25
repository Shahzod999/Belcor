import { UserState } from "./UserTypes";

export interface BasketItem {
  title: string;
  quantity?: number;
  price: number;
  brand: string;
  category: string;
  stock: number;
  availabilityStatus: string;
  _id: string;
}

export interface Order {
  basket: BasketItem[];
  totalprice: number;
  cardNumber: string;
  userInfo: UserState;
  _id: string;
  createdAt: string;
  updatedAt: string;
}