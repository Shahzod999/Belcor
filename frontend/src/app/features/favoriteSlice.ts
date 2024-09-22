import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "../types/ProductTypes";

interface favoriteState {
  favorite: Product[]
}

const initialState: favoriteState = {
  favorite: localStorage.getItem("favorite") ? JSON.parse(localStorage.getItem("favorite") as string) : []
}

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addProductToFavorite: (state, action) => {
      const isFavorite = state.favorite.some((product) => product.id === action.payload.id);
      if (!isFavorite) {
        state.favorite.push(action.payload)
      }
      localStorage.setItem("favorite", JSON.stringify(state.favorite))
    },
    removeProductFromFavorite: (state, action) => {
      state.favorite = state.favorite.filter((product) => product.id !== action.payload)
      localStorage.setItem("favorite", JSON.stringify(state.favorite))
    }
  }
})

export const { addProductToFavorite, removeProductFromFavorite } = favoriteSlice.actions
export const selectedFavorite = (state: RootState) => state.favorite.favorite
export default favoriteSlice.reducer