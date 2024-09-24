import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "../types/ProductTypes";

interface favoriteState {
  basket: Product[]
  waitingOrderList: any;
}

const initialState: favoriteState = {
  basket: localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket") as string) : [],
  waitingOrderList: {
    basket: [],
    totalprice: 0,
    cardNumber: "",
    userInfo: {}
  }
}

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProductToBasket: (state, action) => {
      const productInBasket = state.basket.find((product) => product.id === action.payload.id);
      if (!productInBasket) {
        state.basket.push({ ...action.payload, quantity: 1 })
      } else {
        productInBasket.quantity = action.payload.quantity
      }
      localStorage.setItem("basket", JSON.stringify(state.basket))
    },
    removeProductFromBasket: (state, action) => {
      state.basket = state.basket.filter((product) => product.id !== action.payload.id)
      localStorage.setItem("basket", JSON.stringify(state.basket))
    },
    addToTotalOrderForWaiting: (state, action) => {
      const { basket, totalprice, cardNumber, userInfo } = action.payload

      basket.forEach((element: any) => {
        const { title, quantity, price, brand, category, stock, availabilityStatus } = element
        state.waitingOrderList.basket.push({ title, quantity, price, brand, category, stock, availabilityStatus })
      });
      state.waitingOrderList.totalprice = totalprice
      state.waitingOrderList.cardNumber = cardNumber
      state.waitingOrderList.userInfo = userInfo
    }
  }
})
// title
// quantity price  brand category stock  availabilityStatus

export const { addProductToBasket, removeProductFromBasket, addToTotalOrderForWaiting } = basketSlice.actions
export const selectedBasket = (state: RootState) => state.basket.basket
export const selectedWaitingOrderList = (state: RootState) => state.basket.waitingOrderList
export default basketSlice.reducer