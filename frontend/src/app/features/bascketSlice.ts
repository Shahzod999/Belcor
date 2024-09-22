import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "../types/ProductTypes";

interface favoriteState {
  basket: Product[]
}

const initialState: favoriteState = {
  basket: localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket") as string) : []
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
      state.basket = state.basket.filter((product) => product.id !== action.payload)
      localStorage.setItem("basket", JSON.stringify(state.basket))
    }
  }
})

export const { addProductToBasket, removeProductFromBasket } = basketSlice.actions
export const selectedBasket = (state: RootState) => state.basket.basket
export default basketSlice.reducer