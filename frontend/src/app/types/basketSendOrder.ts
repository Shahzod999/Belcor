import { UserState } from "./UserTypes";


export interface SendOrderState {
  basket: Basket[]
  totalprice: number
  cardNumber: string
  userInfo: UserState
  _id?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}





export interface Order {
  _id: string
  basket: Basket[]
  totalprice: number
  cardNumber: string
  userInfo: UserState
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Basket {
  title: string
  quantity: number | undefined
  price: number
  brand: string
  category: string
  stock: number
  availabilityStatus: string
  _id?: string
}