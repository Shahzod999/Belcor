import { UserState } from "./UserTypes";

export interface OrderState {
  _id?: string;
  basket: BasketState[];
  totalprice: number;
  cardNumber: string;
  userInfo: UserState;
  createdAt?: string | number | Date;
  updatedAt?: string;
  __v?: number;
  orderStatus: OrderStatusState;
}

export interface OrderStatusState {
  delivered: boolean;
  shipped: boolean;
  received: boolean;
}
export interface BasketState {
  title: string;
  quantity: number | undefined;
  price: number;
  brand: string;
  category: string;
  stock: number;
  availabilityStatus: string;
  _id?: string;
}

export interface WaitingOrdersProps {
  data: OrderState[] | undefined;
  isError: boolean;
  isLoading: boolean;
}
