import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface favoriteState {
  item: string,
}

const initialState: favoriteState = {
  item: ""
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchParams: (state, action) => {
      state.item = action.payload
    }
  }
})

export const { searchParams } = searchSlice.actions
export const selectedSearchParam = (state: RootState) => state.search.item
export default searchSlice.reducer