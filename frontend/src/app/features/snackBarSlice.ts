import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SnackBarprops {
  isActive: boolean;
  text?: string;
  error?: boolean;
}

interface MySnackBarState {
  value: SnackBarprops;
}

const initialState: MySnackBarState = {
  value: {
    isActive: true,
    text: "Done!",
    error: false,
  },
};

const snackBarSlice = createSlice({
  name: "mySnackBar",
  initialState,
  reducers: {
    toggleSnackBar: (state, action: PayloadAction<SnackBarprops>) => {
      if (action.payload.error) {
        state.value = { ...state.value, ...action.payload };
      } else {
        state.value = { ...state.value, ...action.payload, error: false };
      }
    },
  },
});

export const { toggleSnackBar } = snackBarSlice.actions;
export const selectedValueSnackBar = (state: RootState) =>
  state.mySnackBar.value;
export default snackBarSlice.reducer;
